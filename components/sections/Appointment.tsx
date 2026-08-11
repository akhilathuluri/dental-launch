'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const Appointment: React.FC = () => {
  return (
    <section id="appointment" className="w-full py-8 sm:py-16 px-0 sm:px-4 lg:px-6">
      <div className="w-full max-w-[1440px] mx-auto bg-[#141C28] text-white rounded-2xl sm:rounded-[36px] lg:rounded-[44px] p-8 sm:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
        
        {/* Subtle background ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#587A9C]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <SectionLabel dark>Make an appointment</SectionLabel>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight">
              Book an <span className="font-normal text-white/90">appointment</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mx-auto font-normal">
              Schedule your visit with our expert dental specialists using our guided, step-by-step reservation system.
            </p>
          </motion.div>

          {/* Premium Centered Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full max-w-xl p-6 sm:p-10 bg-[#1D2736] rounded-3xl border border-white/15 shadow-xl text-left space-y-6"
          >
            <div className="flex items-center gap-3 text-emerald-400 text-xs sm:text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span>Instant Confirmation & Flexible Slots</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Prefer a full-screen guided booking process? Open our dedicated booking page.
            </p>

            {/* Button that opens the appointment page in a new window/tab */}
            <div className="pt-2">
              <a
                href="/appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full py-4 px-8 bg-white text-[#111827] font-semibold text-sm sm:text-base rounded-full hover:bg-slate-100 transition-all duration-300 hover:scale-[1.01] shadow-lg group cursor-pointer"
              >
                <span>Book Appointment in New Page</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-300" />
                <span>Zero waiting time guaranteed</span>
              </div>
              <span>Open 6 days / week</span>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
