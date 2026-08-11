'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Calendar, Clock, ShieldCheck, PhoneCall } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export default function AppointmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: '3D Scans & X-Rays',
    date: '',
    time: '10:00 AM',
    doctor: 'Tony Ware',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#141C28] text-white py-4 px-4 sm:px-8 border-b border-white/10 shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="px-4 py-1.5 bg-white text-[#111827] font-semibold text-sm rounded-full">
            Dentty
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl sm:rounded-[36px] shadow-xl border border-black/5 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Sidebar Info Banner */}
            <div className="lg:col-span-5 bg-[#587A9C] text-white p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div>
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-white/80 mb-2">
                  Online Reservation
                </span>
                <h1 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
                  Schedule your visit with <span className="font-normal">Dentty</span>
                </h1>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Experience comfortable, precision dental care with zero waiting time. Select your service and preferred specialist.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/20">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold">100% Guaranteed Privacy</h4>
                    <p className="text-[11px] text-white/70">Your data is strictly encrypted and protected.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold">Direct Confirmation</h4>
                    <p className="text-[11px] text-white/70">Our administrator confirms via SMS / Call in 15 mins.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-xs text-white/70">
                <p>Need urgent assistance? Call us directly:</p>
                <p className="font-semibold text-white text-sm mt-1">+1 (800) 456-7890</p>
              </div>
            </div>

            {/* Right Form Area */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-[#111827]">
                    Appointment Scheduled!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#111827]">{formData.fullName}</span>. We have reserved your appointment for <span className="font-semibold text-[#111827]">{formData.service}</span> with <span className="font-semibold text-[#111827]">{formData.doctor}</span>.
                  </p>
                  <div className="pt-6 flex justify-center gap-4">
                    <Link
                      href="/"
                      className="px-6 py-3 bg-[#141C28] text-white text-xs font-semibold rounded-full hover:bg-[#1E293B] transition-colors"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111827] tracking-tight mb-1">
                      Patient Details
                    </h2>
                    <p className="text-xs text-slate-500 mb-6">
                      Please enter your contact information to reserve a time slot.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          placeholder="eleanor@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="service" className="block text-xs font-medium text-slate-700 mb-1">
                          Select Service *
                        </label>
                        <select
                          id="service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        >
                          <option value="3D Scans & X-Rays">3D Scans and X-Rays</option>
                          <option value="Surgery">Surgery & Implantology</option>
                          <option value="Dental cleaning">Dental Cleaning & Hygiene</option>
                          <option value="Pediatric Care">Pediatric Practitioner</option>
                          <option value="Free Consultation">Free Initial Consultation</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="doctor" className="block text-xs font-medium text-slate-700 mb-1">
                          Preferred Specialist
                        </label>
                        <select
                          id="doctor"
                          value={formData.doctor}
                          onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        >
                          <option value="Tony Ware">Tony Ware (6 yrs exp)</option>
                          <option value="Dr. Elena Rossi">Dr. Elena Rossi (9 yrs exp)</option>
                          <option value="Any Available Expert">First Available Specialist</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="date" className="block text-xs font-medium text-slate-700 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          id="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        />
                      </div>

                      <div>
                        <label htmlFor="time" className="block text-xs font-medium text-slate-700 mb-1">
                          Time Slot
                        </label>
                        <select
                          id="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[44px]"
                        >
                          <option value="09:00 AM">09:00 AM – 11:00 AM</option>
                          <option value="11:00 AM">11:00 AM – 01:00 PM</option>
                          <option value="02:00 PM">02:00 PM – 04:00 PM</option>
                          <option value="04:00 PM">04:00 PM – 06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">
                        Notes or Symptoms
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        placeholder="Tell us about any specific concerns..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 px-6 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-all min-h-[48px] shadow-md"
                    >
                      {loading ? 'Confirming Reservation...' : 'Complete Reservation'}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
