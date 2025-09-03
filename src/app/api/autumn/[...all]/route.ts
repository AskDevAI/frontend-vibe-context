import { autumnHandler } from "autumn-js/next";
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const { GET, POST } = autumnHandler({
  identify: async (_request) => {
    try {
      console.log('Autumn identify function called');
      
      // Create server-side Supabase client
      const cookieStore = await cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      );
      
      // Get user from session
      const { data: { user }, error } = await supabase.auth.getUser();
      
      console.log('Supabase auth result:', { user: user?.id, error });
      
      if (!user || error) {
        console.log('No authenticated user found');
        return null; // No authenticated user
      }

      console.log('Returning customer data for user:', user.id);

      return {
        customerId: user.id,
        customerData: {
          name: user.email?.split('@')[0] || 'User',
          email: user.email || '',
          metadata: {
            created_at: user.created_at,
            last_sign_in: user.last_sign_in_at,
          }
        },
      };
    } catch (error) {
      console.error('Error identifying user for Autumn:', error);
      return null;
    }
  },
});