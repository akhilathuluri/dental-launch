'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Calendar, Phone, ShieldCheck, Clock } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const Appointment: React.FC = () => {
  return (
    <section id="appointment" className="w-full py-6 sm:py-10 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="w-full max-w-[1400px] mx-auto bg-[#0F3521] bg-gradient-to-br from-[#14482C] via-[#0F3521] to-[#0A2617] text-white rounded-3xl sm:rounded-[36px] lg:rounded-[44px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl">
        
        {/* Subtle background ambient glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-5 sm:space-y-7">
          
          {/* Header Title & Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2.5 sm:space-y-3"
          >
            <SectionLabel dark>Make an appointment</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight">
              Book an <span className="font-normal text-white/90">appointment</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed max-w-lg mx-auto font-normal">
              Schedule your visit with our expert dental specialists or call our front desk directly for immediate assistance.
            </p>
          </motion.div>

          {/* Balanced Premium Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-xl lg:max-w-2xl p-5 sm:p-7 lg:p-8 bg-[#165131]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl text-left space-y-4 sm:space-y-5"
          >
            {/* Value Proposition */}
            <div className="flex items-center gap-2.5 text-emerald-300 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Instant Confirmation &amp; Flexible 30-Min Slots</span>
            </div>

            <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-normal">
              Choose your preferred treatment, calendar date, and time slot with automatic WhatsApp confirmation tickets.
            </p>

            {/* Action Buttons: Call Us & Book Appointment */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* 1. Call Us Button (Triggers native mobile phone dialer) */}
              <a
                href="tel:+919876543210"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-emerald-800/80 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-full border border-emerald-400/30 backdrop-blur-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-300" />
                <span>Call Us</span>
              </a>

              {/* 2. Book Appointment Button */}
              <Link
                href="/appointment"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-white hover:bg-emerald-50 text-[#0F3521] font-semibold text-xs sm:text-sm rounded-full shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#0F3521]" />
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0F3521]" />
              </Link>
            </div>

            {/* Bottom Meta Badges */}
            <div className="pt-3 border-t border-white/15 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1.5 text-[11px] text-emerald-200/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>Zero waiting time guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span>10:00 AM – 07:30 PM (30-min slots)</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
