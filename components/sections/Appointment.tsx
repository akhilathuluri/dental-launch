'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export const Appointment: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '3D Scans & X-Rays',
    date: '',
    time: '10:00 AM',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate future API submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="appointment" className="w-full py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto bg-[#141C28] text-white rounded-3xl sm:rounded-[36px] lg:rounded-[44px] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        
        {/* Subtle background ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#587A9C]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Eyebrow & Full Page Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between h-full space-y-6"
          >
            <div>
              <SectionLabel dark>Make an appointment</SectionLabel>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-4">
                Book an<br />
                <span className="font-normal text-white/90">appointment</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
                Select your preferred service, date, and time. Our team will contact you to confirm your schedule within 15 minutes.
              </p>
            </div>

            {/* Direct Link to Dedicated Full Booking Page */}
            <div className="p-5 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Instant Confirmation & Flexible Slots</span>
              </div>
              <p className="text-xs text-slate-300">
                Prefer a full-screen guided booking process? Open our dedicated booking page.
              </p>
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 bg-white text-[#111827] font-semibold text-xs sm:text-sm rounded-full hover:bg-slate-100 transition-all hover:scale-[1.01]"
              >
                <span>Book Appointment in New Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Responsive Inline Appointment Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-[#1D2736] p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-white/10 shadow-lg"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-light text-white">Appointment Request Received</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Our team will contact you shortly to confirm your booking for <span className="text-white">{formData.service}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-colors"
                >
                  Book another appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Service *
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1D2736] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    >
                      <option value="3D Scans & X-Rays">3D scans and X-rays</option>
                      <option value="Surgery">Surgery & Extractions</option>
                      <option value="Dental cleaning">Dental Cleaning & Hygiene</option>
                      <option value="Pediatric Care">Pediatric General Practitioner</option>
                      <option value="Free Consultation">Free Initial Consultation</option>
                    </select>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    />
                  </div>

                  {/* Time Slot */}
                  <div>
                    <label htmlFor="time" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Time Slot
                    </label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1D2736] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all min-h-[44px]"
                    >
                      <option value="09:00 AM">09:00 AM – 11:00 AM</option>
                      <option value="11:00 AM">11:00 AM – 01:00 PM</option>
                      <option value="02:00 PM">02:00 PM – 04:00 PM</option>
                      <option value="04:00 PM">04:00 PM – 06:00 PM</option>
                    </select>
                  </div>

                </div>

                {/* Optional Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Optional Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Describe any symptoms or specific requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] transition-all"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 bg-white text-[#111827] font-semibold text-xs sm:text-sm rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 min-h-[48px]"
                  >
                    {loading ? 'Processing...' : 'Request Appointment'}
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    Our team will contact you to confirm your appointment.
                  </p>
                </div>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
