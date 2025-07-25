'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Card, CardBody, Button } from '@heroui/react';
import { MessageCircle, Book, Mail, ExternalLink, Clock, HelpCircle, Zap, Users } from 'lucide-react';
import Link from 'next/link';

const supportOptions = [
  {
    title: 'Documentation',
    description: 'Find answers in our comprehensive guides and API reference',
    icon: Book,
    href: '/docs',
    color: 'bg-blue-100 text-blue-600',
    buttonText: 'View Docs',
    buttonVariant: 'bordered' as const,
  },
  {
    title: 'Community Support',
    description: 'Get help from our community of developers',
    icon: Users,
    href: 'https://github.com/askbudi/discussions',
    color: 'bg-green-100 text-green-600',
    buttonText: 'Join Community',
    buttonVariant: 'bordered' as const,
  },
  {
    title: 'Email Support',
    description: 'Contact our support team directly',
    icon: Mail,
    href: 'mailto:founders@askbudi.com',
    color: 'bg-purple-100 text-purple-600',
    buttonText: 'Send Email',
    buttonVariant: 'bordered' as const,
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    href: '#',
    color: 'bg-orange-100 text-orange-600',
    buttonText: 'Start Chat',
    buttonVariant: 'solid' as const,
    isPrimary: true,
  },
];

const faqs = [
  {
    question: 'How do I get started with AskBudi?',
    answer: 'Sign up for a free account, get your API key, and start making requests to our documentation API. Check out our quickstart guide for detailed instructions.',
  },
  {
    question: 'What is the MCP Server and how do I use it?',
    answer: 'Our MCP (Model Context Protocol) Server allows AI tools like Claude Code, Cursor, and Windsurf to access our documentation directly. Install it following our MCP integration guide.',
  },
  {
    question: 'How are API requests counted?',
    answer: 'Each search for library documentation counts as one API request. The size of the response doesn&apos;t affect the count. You can monitor your usage in the dashboard.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time from your dashboard. Changes take effect immediately and billing is prorated.',
  },
  {
    question: 'What libraries and frameworks are supported?',
    answer: 'We support thousands of libraries from npm, PyPI, GitHub, and other major package registries. New libraries are added regularly based on popularity and user requests.',
  },
  {
    question: 'Is there a rate limit on API requests?',
    answer: 'Yes, we implement reasonable rate limits to ensure service quality. Free accounts have lower limits than paid plans. Contact us if you need higher limits.',
  },
  {
    question: 'How often is the documentation updated?',
    answer: 'We continuously monitor libraries for updates and refresh documentation regularly. Popular libraries are updated within hours of new releases.',
  },
  {
    question: 'Do you offer enterprise support?',
    answer: 'Yes, our Enterprise plan includes dedicated support, custom SLA, priority response times, and direct access to our engineering team.',
  },
];

const responseTime = {
  Free: '24-48 hours',
  Pro: '12-24 hours',
  Enterprise: '2-4 hours',
};

export default function SupportPage() {
  return (
    <main>
      <Navbar />
      
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How can we help?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the support you need to make the most of AskBudi. We&apos;re here to help you succeed with AI-powered documentation.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card 
                  key={index} 
                  className={`bg-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                    option.isPrimary ? 'ring-2 ring-blue-500 ring-offset-2 transform scale-[1.02]' : ''
                  }`}
                >
                  <CardBody className="text-center p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${option.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{option.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <Button
                      as={option.href.startsWith('http') || option.href.startsWith('mailto') ? 'a' : Link}
                      href={option.href}
                      variant={option.buttonVariant}
                      color={option.isPrimary ? 'primary' : 'default'}
                      size="sm"
                      className="w-full font-semibold"
                      {...(option.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {option.buttonText}
                    </Button>
                  </CardBody>
                </Card>
              );
            })}
          </div>

          {/* Response Times */}
          <Card className="bg-white shadow-lg mb-20">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Support Response Times</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {Object.entries(responseTime).map(([plan, time]) => (
                  <div key={plan} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5 text-blue-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-900">{plan} Plan</h3>
                    </div>
                    <p className="text-gray-600">{time}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                  Response times are based on business days. Enterprise customers get priority support.
                </p>
              </div>
            </CardBody>
          </Card>

          {/* FAQ Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid gap-6 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardBody className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          {/* Status and Resources */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <Card className="bg-white shadow-lg">
              <CardBody className="p-8 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Status</h3>
                <p className="text-gray-600 mb-4">
                  Check the current status of our API and services
                </p>
                <Button
                  as="a"
                  href="https://status.askbudi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="bordered"
                  className="font-semibold"
                >
                  View Status Page
                </Button>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-6 h-6 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">GitHub Issues</h3>
                <p className="text-gray-600 mb-4">
                  Report bugs or request features on GitHub
                </p>
                <Button
                  as="a"
                  href="https://github.com/askbudi/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="bordered"
                  className="font-semibold"
                >
                  Open Issue
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl">
            <CardBody className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Our support team is ready to assist you with any questions about AskBudi, 
                from integration help to billing questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  Contact Support
                </Button>
                <Button
                  as="a"
                  href="mailto:founders@askbudi.com"
                  variant="bordered"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                >
                  Email Us
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  );
}