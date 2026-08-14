'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfoCard } from '@/components/ui/InfoCard';
import { Header } from '@/components/layout/Header';

import { getClinicDayInfo } from '@/lib/clinicSchedule';

export const Hero: React.FC = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [todayStatus, setTodayStatus] = useState('Clinic Open');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
      const formattedTime = now
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase();

      const dayInfo = getClinicDayInfo(now);

      setCurrentDay(`Today is ${dayName}`);
      setCurrentTime(formattedTime);
      setTodayStatus(dayInfo.isHoliday ? `Closed (${dayInfo.badgeLabel})` : 'Clinic Open (10:00–19:30)');
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Live real-time update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="w-full pt-0 sm:pt-2 pb-6 px-0 sm:px-4 lg:px-6">
      <div className="w-full max-w-[1440px] mx-auto bg-[#587A9C] text-white rounded-b-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-xl relative">
        
        {/* Header embedded inside hero blue container */}
        <Header />

        <div className="px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-6 sm:pb-10">
          
          {/* Top Row: Headline & Practice Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-6 sm:mb-10">
            
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <h1 className="text-[3rem] sm:text-7xl lg:text-[6.5rem] font-light leading-[0.92] tracking-tight text-white font-sans max-w-3xl">
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
              <div className="space-y-1 text-left lg:text-right">
                <p className="font-semibold text-white text-xs mb-1 uppercase tracking-wider">Practice Hours</p>
                <p className="text-white/90 text-xs sm:text-sm font-medium">Daily: 10:00 AM – 07:30 PM</p>
                <p className="text-white/70 text-[11px]">30-minute interval slots</p>
                <p className="text-amber-200 text-[11px] font-normal pt-1">
                  Closed: Tuesdays (except 3rd Tue) &amp; 2nd Sunday
                </p>
              </div>

              {/* Real-time Status Pill Badge with Device Time */}
              <div
                suppressHydrationWarning
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-normal text-white shadow-xs"
              >
                <span>{todayStatus}</span>
                <span className="font-medium font-mono">{currentTime || '--:--'}</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Main Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[36px] overflow-hidden bg-slate-200 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.2/1] shadow-lg mb-4 sm:mb-0"
          >
            {/* Natural smiling patient lifestyle photo */}
            <Image
              src="/images/hero-patient.jpg"
              alt="Smiling patient at Gahan Dental clinic"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1400px"
              className="object-cover object-[center_25%]"
            />

            {/* Subtle bottom shadow gradient for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10 hidden sm:block" />

            {/* DESKTOP OVERLAY CARDS (Visible on sm: and up) */}
            <div className="hidden sm:block absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20">
              <div className="grid grid-cols-3 gap-4">
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

          {/* MOBILE HORIZONTAL SCROLL CARDS (Visible only on mobile < sm breakpoint) */}
          <div className="block sm:hidden mt-3">
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 py-1 -mx-4 px-4">
              <InfoCard
                title="Discount 5%"
                description="For therapeutic treatment when registering via the website"
                href="#appointment"
                className="snap-start min-w-[82vw] shrink-0"
              />
              <InfoCard
                title="Free consultation"
                description="For all types of dental services"
                href="#appointment"
                className="snap-start min-w-[82vw] shrink-0"
              />
              <InfoCard
                title="Installments 0%"
                description="We will examine, make a treatment plan, and name the exact cost."
                href="#appointment"
                className="snap-start min-w-[82vw] shrink-0"
              />
            </div>
            <div className="flex justify-center gap-1.5 mt-2">
              <span className="w-6 h-1 rounded-full bg-white/60" />
              <span className="w-2 h-1 rounded-full bg-white/30" />
              <span className="w-2 h-1 rounded-full bg-white/30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
