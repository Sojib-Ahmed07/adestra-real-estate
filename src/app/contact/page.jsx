'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import LuxuryNavbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

const PROPERTIES_LIST = [
  { id: 'lume-penthouse', name: 'Aurelia Sky Residence (Penthouse)' },
  { id: 'vanguard-penthouse', name: 'The Crown Penthouse' },
  { id: 'nera-estate', name: 'The Obsidian Pavilion (Private Estate)' },
  { id: 'solara-estate', name: 'Solara Meadows (Private Estate)' },
  { id: 'arco-waterfront', name: 'Maison du Lac (Waterfront)' }
];

function ContactContent() {
  const searchParams = useSearchParams();
  const selectedPropertyId = searchParams.get('property') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: selectedPropertyId,
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Sync selected property from search parameters during render
  const [prevSelectedPropertyId, setPrevSelectedPropertyId] = useState(selectedPropertyId);

  if (selectedPropertyId !== prevSelectedPropertyId) {
    setPrevSelectedPropertyId(selectedPropertyId);
    setFormData(prev => ({ ...prev, property: selectedPropertyId }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  return (
    <main className="bg-[#0B0D12] min-h-screen text-[#F4F1EA] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Information Section (Left 5 Columns) */}
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C5A880]" />
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
                Private Consultation
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-tight mb-8">
              Begin a <span className="italic text-[#C5A880]">conversation.</span>
            </h1>

            <p className="text-sm font-light leading-relaxed text-white/50 mb-12 max-w-md">
              Whether you are interested in acquiring a penthouse, scheduling a private 3D virtual tour of our plots, or discussing custom developments, our concierge team is standing by to assist.
            </p>

            <div className="space-y-8 border-t border-white/5 pt-8">
              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/10 text-[#C5A880]">
                  <Phone size={16} />
                </span>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Direct Hotline</span>
                  <a href="tel:+18002758839" className="text-md hover:text-[#C5A880] transition-colors duration-300 font-light">
                    +1 (800) 275-8839
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/10 text-[#C5A880]">
                  <Mail size={16} />
                </span>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Inquiries Email</span>
                  <a href="mailto:concierge@valoisestates.com" className="text-md hover:text-[#C5A880] transition-colors duration-300 font-light">
                    concierge@valoisestates.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/10 text-[#C5A880]">
                  <MapPin size={16} />
                </span>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Main Atelier</span>
                  <p className="text-md font-light text-white/70 leading-relaxed">
                    Gulshan Avenue, Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-2.5 rounded-full bg-white/[0.02] border border-white/10 text-[#C5A880]">
                  <Clock size={16} />
                </span>
                <div>
                  <span className="block text-[8px] uppercase tracking-widest text-white/30 mb-1">Consultation Hours</span>
                  <p className="text-md font-light text-white/70">
                    Sun — Thu: 9:00 AM — 6:00 PM (GMT+6)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section (Right 7 Columns) */}
          <div className="lg:col-span-7 bg-[#141620] border border-white/5 rounded-2xl p-8 sm:p-10 relative">
            {submitted ? (
              <div className="py-16 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
                <div className="text-[#C5A880] mb-6">
                  <CheckCircle2 size={64} strokeWidth={1.2} />
                </div>
                <h3 className="text-2xl font-serif font-light tracking-tight mb-3">Request Received Successfully</h3>
                <p className="text-sm font-light text-white/50 leading-relaxed max-w-sm mx-auto mb-8">
                  Thank you for your interest in VALOIS. A private client adviser has been assigned to your inquiry and will contact you within the next 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 border border-white/10 hover:border-[#C5A880] hover:text-[#C5A880] text-xs uppercase tracking-widest rounded-xl transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-serif font-light tracking-tight mb-6">Submit Consultation Request</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Full Name *</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sojib Ahmed"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Email Address *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. contact@domain.com"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-white/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +880 1711-XXXXXX"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Property of Interest</label>
                    <select
                      name="property"
                      value={formData.property}
                      onChange={handleChange}
                      className="w-full bg-[#141620] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#C5A880] transition-colors duration-300"
                    >
                      <option value="">-- General Inquiry --</option>
                      {PROPERTIES_LIST.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-white/40 mb-2">Custom Requirements & Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your spatial, pricing, or material specifications..."
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-light focus:outline-none focus:border-[#C5A880] transition-colors duration-300 placeholder-white/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#C5A880] text-[#0B0D12] text-xs font-semibold uppercase tracking-[0.25em] py-4.5 rounded-xl transition-all duration-300 hover:bg-[#F4F1EA] shadow-xl"
                >
                  Request Consultation
                  <ArrowUpRight size={15} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <>
      <LuxuryNavbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center text-white/50">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-t-2 border-[#C5A880] rounded-full animate-spin mx-auto" />
            <span className="text-xs uppercase tracking-widest">Loading Form...</span>
          </div>
        </div>
      }>
        <ContactContent />
      </Suspense>
      <Footer />
    </>
  );
}
