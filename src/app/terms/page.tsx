'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Card, CardBody } from '@heroui/react';

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      
      <div className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of AskBudi services and outline our mutual responsibilities.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    By accessing or using AskBudi services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                  </p>
                  <p className="text-gray-600">
                    These terms apply to all users of AskBudi, including but not limited to developers, organizations, and AI tool integrations.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description of Service</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    AskBudi provides AI-powered documentation services that deliver up-to-date library documentation and code APIs. Our services include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>API access to library documentation</li>
                    <li>MCP (Model Context Protocol) server integration</li>
                    <li>Documentation search and retrieval</li>
                    <li>Code examples and usage patterns</li>
                    <li>Analytics and usage tracking</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">User Accounts and Registration</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    To access certain features, you must create an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Update your information to keep it current</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptable Use Policy</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    You may use our services only for lawful purposes. You agree not to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Violate any applicable laws or regulations</li>
                    <li>Attempt to gain unauthorized access to our systems</li>
                    <li>Use our services to harm, harass, or impersonate others</li>
                    <li>Distribute malware, spam, or other malicious content</li>
                    <li>Exceed rate limits or attempt to circumvent usage restrictions</li>
                    <li>Reverse engineer or attempt to extract our algorithms</li>
                    <li>Use our services to compete directly with AskBudi</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">API Usage and Limits</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    API usage is subject to the limits of your chosen plan:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li><strong>Free Plan:</strong> 100 requests per month</li>
                    <li><strong>Pro Plan:</strong> 10,000 requests per month</li>
                    <li><strong>Enterprise Plan:</strong> Unlimited requests with custom SLA</li>
                  </ul>
                  <p className="text-gray-600 mb-4">
                    Exceeding your plan limits may result in temporary service restrictions. We reserve the right to enforce reasonable rate limits to ensure service quality for all users.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment and Billing</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    For paid plans:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Billing occurs monthly in advance</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We offer a 30-day money-back guarantee for new subscriptions</li>
                    <li>Price changes will be communicated 30 days in advance</li>
                    <li>Accounts may be suspended for non-payment</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    AskBudi and its content are protected by intellectual property laws. We grant you a limited, non-exclusive license to use our services. You retain ownership of any content you provide.
                  </p>
                  <p className="text-gray-600 mb-4">
                    The documentation we provide is sourced from publicly available libraries and repositories. We respect the intellectual property rights of library authors and maintainers.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data and Privacy</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We process your data in accordance with our Privacy Policy. By using our services, you consent to such processing and warrant that all data provided is accurate.
                  </p>
                  <p className="text-gray-600">
                    We implement industry-standard security measures to protect your data, but cannot guarantee absolute security.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Availability</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We strive to maintain high service availability but do not guarantee uninterrupted service. We may:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Perform scheduled maintenance with advance notice</li>
                    <li>Temporarily suspend services for security or technical reasons</li>
                    <li>Modify or discontinue features with reasonable notice</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    To the maximum extent permitted by law, AskBudi shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                  </p>
                  <p className="text-gray-600">
                    Our total liability shall not exceed the amount paid by you for our services in the twelve months preceding the claim.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    Either party may terminate this agreement at any time. Upon termination:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Your access to our services will cease</li>
                    <li>We may delete your account and data after a reasonable period</li>
                    <li>Provisions regarding liability and intellectual property will survive</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We may modify these terms at any time. We will notify you of material changes via email or through our service. Continued use after changes constitutes acceptance of the new terms.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Disputes</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    These terms are governed by the laws of the jurisdiction where Juno AI INC is incorporated. Any disputes will be resolved through binding arbitration or in courts of competent jurisdiction.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    For questions about these terms, please contact us:
                  </p>
                  <ul className="list-none space-y-2 text-gray-600">
                    <li><strong>Email:</strong> legal@askbudi.com</li>
                    <li><strong>Company:</strong> Juno AI INC</li>
                    <li><strong>Website:</strong> https://askbudi.com</li>
                  </ul>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}