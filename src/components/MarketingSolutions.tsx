import React, { useState } from 'react';
import { TrendingUp, Users, Megaphone, Code, Globe, Mail, Target, Star, X } from 'lucide-react';

const MarketingSolutions = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    services: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const services = [
    { icon: <TrendingUp size={24} />, title: "CMC & CG Listing Services" },
    { icon: <Globe size={24} />, title: "CEX Listing" },
    { icon: <Megaphone size={24} />, title: "Press release and sponsored articles" },
    { icon: <Target size={24} />, title: "Billboard Marketing" },
    { icon: <Mail size={24} />, title: "Email Marketing" },
    { icon: <Code size={24} />, title: "Smart Contract Development" },
    { icon: <Star size={24} />, title: "Advertising campaigns" },
    { icon: <Users size={24} />, title: "Key Opinion Leader (KOL)" },
    { icon: <Users size={24} />, title: "Influencer Marketing" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const emailBody = `
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company}
Services of Interest: ${formData.services.join(', ')}

Message:
${formData.message}
      `;

      const mailtoLink = `mailto:info@labswapecosystem.com?subject=Marketing Solutions Inquiry from ${formData.name}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      
      setSubmitStatus('success');
      setTimeout(() => {
        setIsFormOpen(false);
        setFormData({ name: '', email: '', company: '', message: '', services: [] });
        setSubmitStatus('');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="marketing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Web3 Marketing Solutions
          </h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed">
            <p>
              Accelerate your Web3 project's growth with our comprehensive marketing ecosystem. 
              We specialize in data-driven strategies that deliver measurable results in the decentralized landscape. 
              From token launches to community building, our expert team provides end-to-end marketing solutions 
              tailored specifically for blockchain and DeFi projects.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="flex items-center gap-4">
                <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 border border-blue-500">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Scale Your Web3 Project?
            </h3>
            <p className="text-blue-100 mb-6">
              Contact our marketing experts to discuss your project's unique needs and growth strategy.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Get Started Today
            </button>
          </div>
        </div>

        {/* Contact Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company/Project
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Services of Interest
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((service, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service.title)}
                          onChange={() => handleServiceToggle(service.title)}
                          className="rounded border-gray-600 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">{service.title}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Tell us about your project and marketing needs..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="text-green-400 text-center">
                    Email client opened successfully! Please send the email to complete your inquiry.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-400 text-center">
                    There was an error. Please try again or contact us directly at info@labswapecosystem.com
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketingSolutions;