'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfoCard } from '@/components/ui/InfoCard';
import { Header } from '@/components/layout/Header';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="w-full pt-2 pb-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto bg-[#587A9C] text-white rounded-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-xl relative">
        
        {/* Header embedded inside hero blue container as shown in reference */}
        <Header />

        <div className="px-5 sm:px-10 lg:px-14 pt-8 sm:pt-12 pb-8 sm:pb-12">
          
          {/* Top Row: Headline & Practice Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 sm:mb-14">
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <h1 className="text-[3.2rem] sm:text-7xl lg:text-[5.5rem] font-light leading-[0.95] tracking-tight text-white font-sans max-w-2xl">
                Your smile<br />
                <span className="font-normal">comes first</span>
              </h1>
            </motion.div>

            {/* Right side Practice Hours widget */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-4 text-xs sm:text-sm text-white/90"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 w-full max-w-xs space-y-2">
                <p className="font-semibold text-white uppercase text-[11px] tracking-wider mb-2">Practice Hours</p>
                <div className="flex justify-between text-white/80">
                  <span>Monday – Tuesday:</span>
                  <span className="font-medium text-white">09:00 – 21:00</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Friday:</span>
                  <span className="font-medium text-white">09:00 – 15:00</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Saturday:</span>
                  <span className="font-medium text-white">11:00 – 16:00</span>
                </div>
              </div>

              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-medium text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Today is Monday &nbsp; 3:21 pm</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Main Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden bg-slate-200 aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] shadow-lg mb-4 sm:mb-6"
          >
            <Image
              src="/images/hero-patient.jpg"
              alt="Smiling patient at Dentty dental clinic"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1300px"
              className="object-cover object-center"
            />
            {/* Soft gradient overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Bottom 3 Feature Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-nowrap sm:grid sm:grid-cols-3 gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-2 px-2 sm:mx-0 sm:px-0"
          >
            <InfoCard
              title="Discount 5%"
              description="For therapeutic treatment when registering via the website"
              href="#appointment"
            />
            <InfoCard
              title="Free consultation"
              description="For all types of dental services"
              href="#appointment"
            />
            <InfoCard
              title="Installments 0%"
              description="We will examine, make a treatment plan, and name the exact cost."
              href="#appointment"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
