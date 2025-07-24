'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Check, X } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for trying out AskBudi',
    features: [
      '100 API requests/month',
      'Access to all libraries',
      'Basic support',
      'Community access',
    ],
    limitations: [
      'Limited to 100 requests',
      'No priority support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For individual developers and small teams',
    features: [
      '10,000 API requests/month',
      'Access to all libraries',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'API key management',
    ],
    limitations: [],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams and organizations',
    features: [
      'Unlimited API requests',
      'Dedicated support',
      'Custom SLA',
      'On-premise deployment',
      'Advanced security',
      'Team management',
      'Custom billing',
    ],
    limitations: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

const faqs = [
  {
    question: 'What counts as an API request?',
    answer: 'Each search for library documentation or repository lookup counts as one API request. The response size doesn\'t affect the count.',
  },
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. No questions asked.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    question: 'What libraries are supported?',
    answer: 'We support thousands of libraries across npm, PyPI, GitHub, and more. New libraries are added regularly.',
  },
  {
    question: 'Do I need to install anything?',
    answer: 'You can use our API directly or install our MCP server for seamless integration with AI tools like Claude Code, Cursor, and Windsurf.',
  },
];

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your needs. All plans include access to our 
              comprehensive library documentation API.
            </p>
            
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              🎉 Free 14-day trial on all paid plans
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 ring-offset-2 shadow-2xl transform scale-[1.02] bg-gradient-to-b from-blue-50 to-white border-blue-200' 
                    : 'shadow-lg hover:shadow-xl transition-shadow border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className={`text-center pb-2 ${plan.popular ? 'pt-6' : ''}`}>
                  <div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      plan.popular ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className={`text-4xl font-bold ${
                        plan.popular ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {plan.price}
                      </span>
                      {plan.name !== 'Enterprise' && <span className="text-gray-500">/month</span>}
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardBody className="pt-4">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                    {plan.limitations.map((limitation, limitationIndex) => (
                      <li key={limitationIndex} className="flex items-center opacity-60">
                        <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={`w-full font-semibold ${
                      plan.popular 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg border-0' 
                        : 'border border-gray-300 hover:border-blue-500 hover:text-blue-600 bg-white text-gray-700'
                    }`}
                    as="a"
                    href={
                      plan.name === 'Enterprise' 
                        ? '/contact' 
                        : plan.name === 'Free'
                        ? '/auth/signup'
                        : '/dashboard/billing'
                    }
                  >
                    {plan.cta}
                  </Button>

                  {plan.name !== 'Free' && plan.name !== 'Enterprise' && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      14-day free trial, then {plan.price}/month
                    </p>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Compare Plans
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 text-gray-900 font-semibold">Features</th>
                    <th className="text-center py-4 text-gray-900 font-semibold">Free</th>
                    <th className="text-center py-4 text-gray-900 font-semibold">Pro</th>
                    <th className="text-center py-4 text-gray-900 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 text-gray-700">API Requests/month</td>
                    <td className="py-4 text-center">100</td>
                    <td className="py-4 text-center">10,000</td>
                    <td className="py-4 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700">Library Access</td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700">MCP Server</td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700">Priority Support</td>
                    <td className="py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700">Analytics Dashboard</td>
                    <td className="py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-700">Custom SLA</td>
                    <td className="py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="grid gap-8">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white">
                  <CardBody className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of developers already using AskBudi
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                color="primary"
                size="lg"
                as="a"
                href="/auth/signup"
                className="font-semibold"
              >
                Start Free Trial
              </Button>
              <Button
                variant="bordered"
                size="lg"
                as="a"
                href="/contact"
                className="font-semibold"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}