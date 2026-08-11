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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-8 sm:mb-12">
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <h1 className="text-[3.2rem] sm:text-7xl lg:text-[6.5rem] font-light leading-[0.92] tracking-tight text-white font-sans max-w-3xl">
                Your smile<br />
                <span className="font-normal">comes first</span>
              </h1>
            </motion.div>

            {/* Right side Practice Hours widget (Plain text on blue as in reference) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between h-full gap-5 text-xs sm:text-sm text-white/90"
            >
              <div className="space-y-1.5 text-left lg:text-right">
                <p className="font-normal text-white text-xs mb-2">Practice Hours</p>
                <p className="text-white/80 text-xs sm:text-sm">Monday–Tuesday: 09:00–21:00</p>
                <p className="text-white/80 text-xs sm:text-sm">Friday: 09:00–19:00</p>
                <p className="text-white/80 text-xs sm:text-sm">Saturday: 11:00–16:00</p>
              </div>

              {/* Status Pill Badge (Matching reference glass pill with exact spacing) */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-normal text-white shadow-xs">
                <span>Today is Monday</span>
                <span className="font-medium">3:21 pm</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Main Image Container with OVERLAID Info Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden bg-slate-200 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1] shadow-lg"
          >
            {/* Natural smiling patient lifestyle photo */}
            <Image
              src="/images/hero-patient.jpg"
              alt="Smiling patient at Dentty dental clinic"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1350px"
              className="object-cover object-[center_35%]"
            />

            {/* Subtle bottom shadow gradient to elevate card contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10" />

            {/* 3 Info Cards OVERLAID at the bottom of the photo container as in reference */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
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
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
