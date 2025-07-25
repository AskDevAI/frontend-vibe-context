'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Card, CardBody } from '@heroui/react';

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      
      <div className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-8">
            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We collect information you provide directly to us, such as when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Create an account or sign up for our services</li>
                    <li>Use our API or MCP server</li>
                    <li>Contact us for support</li>
                    <li>Subscribe to our newsletters or communications</li>
                  </ul>
                  <p className="text-gray-600">
                    This may include your name, email address, API usage data, and communication preferences.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Monitor and analyze usage patterns to improve our AI documentation service</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or respond to legal requests</li>
                    <li>To protect our rights, privacy, safety, or property</li>
                    <li>With service providers who assist us in operating our platform (under strict confidentiality agreements)</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                    <li>Access, update, or delete your personal information</li>
                    <li>Object to the processing of your personal information</li>
                    <li>Request data portability</li>
                    <li>Withdraw consent at any time</li>
                    <li>Opt out of marketing communications</li>
                  </ul>
                  <p className="text-gray-600">
                    To exercise these rights, please contact us at privacy@askbudi.com.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We use cookies and similar tracking technologies to enhance your experience and analyze usage patterns. You can control cookies through your browser settings.
                  </p>
                  <p className="text-gray-600">
                    We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device until deleted) for authentication, preferences, and analytics.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                  <p className="text-gray-600">
                    We encourage you to review this policy periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardBody className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this privacy policy or our data practices, please contact us:
                  </p>
                  <ul className="list-none space-y-2 text-gray-600">
                    <li><strong>Email:</strong> privacy@askbudi.com</li>
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