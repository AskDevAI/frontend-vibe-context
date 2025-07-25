'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Card, CardBody, Button, Input, Textarea, Select, SelectItem } from '@heroui/react';
import { Mail, MessageCircle, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
  {
    title: 'Email',
    description: 'Send us an email and we&apos;ll respond within 24 hours',
    icon: Mail,
    value: 'founders@askbudi.com',
    href: 'mailto:founders@askbudi.com',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    icon: MessageCircle,
    value: 'Available 9 AM - 5 PM PST',
    href: '#chat',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Phone',
    description: 'Call us for urgent enterprise inquiries',
    icon: Phone,
    value: '+1 (437) 254-2317',
    href: 'tel:+14372542317',
    color: 'bg-purple-100 text-purple-600',
  },
];

const offices = [
  {
    location: 'Toronto, ON',
    address: '98 Lillian Street\nToronto, ON M5A 0J5\nCanada',
    timezone: 'EST (UTC-5)',
  },
  {
    location: 'Remote Team',
    address: 'We have team members\nacross multiple timezones\nto provide global support',
    timezone: 'Various',
  },
];

const inquiryTypes = [
  { key: 'general', label: 'General Question' },
  { key: 'technical', label: 'Technical Support' },
  { key: 'billing', label: 'Billing & Pricing' },
  { key: 'enterprise', label: 'Enterprise Sales' },
  { key: 'partnership', label: 'Partnership' },
  { key: 'media', label: 'Media & Press' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <main>
      <Navbar />
      
      <div className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about AskBudi? Want to discuss enterprise solutions? 
              We&apos;d love to hear from you and help you get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg">
                <CardBody className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button
                        color="primary"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            company: '',
                            inquiryType: '',
                            subject: '',
                            message: '',
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            variant="bordered"
                          />
                          <Input
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            variant="bordered"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <Input
                            label="Company (Optional)"
                            placeholder="Enter your company name"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            variant="bordered"
                          />
                          <Select
                            label="Inquiry Type"
                            placeholder="Select inquiry type"
                            selectedKeys={formData.inquiryType ? [formData.inquiryType] : []}
                            onSelectionChange={(keys) => {
                              const selected = Array.from(keys)[0] as string;
                              handleInputChange('inquiryType', selected);
                            }}
                            required
                            variant="bordered"
                          >
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type.key}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        <Input
                          label="Subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          required
                          variant="bordered"
                        />

                        <Textarea
                          label="Message"
                          placeholder="Tell us more about your inquiry..."
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          variant="bordered"
                          minRows={5}
                        />

                        <Button
                          type="submit"
                          color="primary"
                          size="lg"
                          className="w-full font-semibold"
                          isLoading={isSubmitting}
                        >
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                      </form>
                    </>
                  )}
                </CardBody>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Methods</h3>
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <CardBody className="p-6">
                        <div className="flex items-start">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${method.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{method.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                            <a
                              href={method.href}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              {method.value}
                            </a>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>

              {/* Office Locations */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Locations</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <Card key={index} className="bg-white shadow-lg">
                      <CardBody className="p-6">
                        <div className="flex items-start">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                            <MapPin className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">{office.location}</h4>
                            <p className="text-sm text-gray-600 whitespace-pre-line mb-2">
                              {office.address}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              {office.timezone}
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <Card className="bg-white shadow-lg">
                <CardBody className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Business Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900">10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-900">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    Enterprise customers receive 24/7 support
                  </p>
                </CardBody>
              </Card>
            </div>
          </div>

          {/* FAQ CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl mt-16">
            <CardBody className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Looking for quick answers?</h2>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Check out our comprehensive documentation and frequently asked questions 
                before reaching out. You might find your answer right away!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as="a"
                  href="/docs"
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  View Documentation
                </Button>
                <Button
                  as="a"
                  href="/support"
                  variant="bordered"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold"
                >
                  Browse FAQ
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