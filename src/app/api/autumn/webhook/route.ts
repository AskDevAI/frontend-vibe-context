import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/server-auth';

interface AutumnWebhookData {
  customer_id?: string;
  stripe_customer_id?: string;
  product_id?: string;
  plan_id?: string;
  monthly_quota?: number;
  [key: string]: unknown;
}

// Autumn webhook handler for billing events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify webhook signature if needed
    // const signature = request.headers.get('autumn-signature');
    // Implement signature verification here
    
    console.log('Autumn webhook received:', body);
    
    const { event_type, customer_id, data } = body;
    
    switch (event_type) {
      case 'subscription.created':
      case 'subscription.updated':
        await handleSubscriptionUpdate(customer_id, data);
        break;
        
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(customer_id, data);
        break;
        
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(customer_id, data);
        break;
        
      case 'invoice.payment_failed':
        await handlePaymentFailed(customer_id, data);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(customer_id, data);
        break;
        
      default:
        console.log(`Unhandled webhook event: ${event_type}`);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionUpdate(customerId: string, data: AutumnWebhookData) {
  try {
    // Update user profile with new subscription info
    const { plan_type, monthly_quota } = determinePlanFromData(data);
    
    const { error } = await supabaseAdmin
      .from('user_profiles')
      .upsert({
        id: customerId,
        plan_type,
        monthly_quota,
        billing_customer_id: data.customer_id || data.stripe_customer_id,
        updated_at: new Date().toISOString(),
      });
    
    if (error) {
      console.error('Error updating user profile:', error);
    } else {
      console.log(`Updated subscription for customer ${customerId} to ${plan_type}`);
    }
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

async function handleSubscriptionCancelled(customerId: string) {
  try {
    // Downgrade to free plan
    const { error } = await supabaseAdmin
      .from('user_profiles')
      .update({
        plan_type: 'free',
        monthly_quota: 100,
        updated_at: new Date().toISOString(),
      })
      .eq('id', customerId);
    
    if (error) {
      console.error('Error handling subscription cancellation:', error);
    } else {
      console.log(`Downgraded customer ${customerId} to free plan`);
    }
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

async function handlePaymentSucceeded(customerId: string) {
  try {
    // Reset usage credits or handle payment success
    // const now = new Date(); // Unused for now but may be needed for payment processing logic
    
    // Get current profile to maintain plan type
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('plan_type, monthly_quota')
      .eq('id', customerId)
      .single();
    
    if (profile) {
      // Reset credits for the new billing period
      const { error } = await supabaseAdmin
        .from('user_profiles')
        .update({
          credits_remaining: profile.monthly_quota,
          credits_used_this_month: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', customerId);
      
      if (error) {
        console.error('Error resetting credits:', error);
      } else {
        console.log(`Reset credits for customer ${customerId}`);
      }
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

async function handlePaymentFailed(customerId: string, data: AutumnWebhookData) {
  try {
    // Handle payment failure - maybe send notification or limit access
    console.log(`Payment failed for customer ${customerId}:`, data);
    
    // Optionally update a payment_status field or send notifications
    // For now, just log the event
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

async function handleSubscriptionDeleted(customerId: string, data: AutumnWebhookData) {
  try {
    // Same as cancellation - downgrade to free
    await handleSubscriptionCancelled(customerId, data);
  } catch (error) {
    console.error('Error handling subscription deletion:', error);
  }
}

function determinePlanFromData(data: AutumnWebhookData): { plan_type: string; monthly_quota: number } {
  // Extract plan information from Autumn webhook data
  const productId = data.product_id || data.plan_id || '';
  
  if (productId.includes('enterprise') || (data.monthly_quota && data.monthly_quota >= 100000)) {
    return { plan_type: 'enterprise', monthly_quota: 100000 };
  } else if (productId.includes('pro') || (data.monthly_quota && data.monthly_quota >= 10000)) {
    return { plan_type: 'pro', monthly_quota: 10000 };
  } else {
    return { plan_type: 'free', monthly_quota: 100 };
  }
}