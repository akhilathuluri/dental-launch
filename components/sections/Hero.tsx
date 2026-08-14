'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { InfoCard } from '@/components/ui/InfoCard';
import { Header } from '@/components/layout/Header';
import { supabase } from '@/lib/supabase';
import { getClinicDayInfo, ScheduleOverrideItem } from '@/lib/clinicSchedule';

export const Hero: React.FC = () => {
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [todayStatus, setTodayStatus] = useState('Clinic Open');
  const [overrides, setOverrides] = useState<Record<string, ScheduleOverrideItem>>({});

  useEffect(() => {
    async function loadOverrides() {
      const { data } = await supabase.from('clinic_schedule_overrides').select('*');
      if (data) {
        const map: Record<string, ScheduleOverrideItem> = {};
        data.forEach((item: any) => {
          map[item.date] = item;
        });
        setOverrides(map);
      }
    }
    loadOverrides();
  }, []);

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

      const dayInfo = getClinicDayInfo(now, overrides);

      setCurrentDay(`Today is ${dayName}`);
      setCurrentTime(formattedTime);
      setTodayStatus(dayInfo.isHoliday ? `Closed (${dayInfo.badgeLabel})` : 'Clinic Open (10:00–19:30)');
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Live real-time update every second
    return () => clearInterval(interval);
  }, [overrides]);

  return (
    <section id="home" className="w-full pt-0 sm:pt-2 pb-6 px-0 sm:px-4 lg:px-6">
      <div className="w-full max-w-[1440px] mx-auto bg-[#165634] bg-gradient-to-br from-[#1A623D] via-[#165634] to-[#114227] text-white rounded-b-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden shadow-2xl relative">

        {/* Header embedded inside hero container */}
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
                Smile with<br />
                <span className="font-normal">Confidence</span>
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
                <p className="text-amber-200 text-[11px] font-normal pt-1">
                  Closed: Tuesdays (except 3rd Tue) &amp; 2nd Sunday
                </p>
              </div>

              {/* Real-time Status Pill Badge without live clock */}
              <div
                suppressHydrationWarning
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-normal text-white shadow-xs"
              >
                <span className={`w-2 h-2 rounded-full ${todayStatus.startsWith('Closed') ? 'bg-amber-300' : 'bg-emerald-300 animate-pulse'}`} />
                <span>{todayStatus}</span>
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
            {/* Mobile Screen Image (< sm) */}
            <div className="block sm:hidden absolute inset-0">
              <Image
                src="/images/hero-patient-mobile.png"
                alt="Smiling patient at Gahan Dental clinic"
                fill
                priority
                unoptimized
                className="object-cover object-center"
              />
            </div>

            {/* Larger Screens Image (sm+) */}
            <div className="hidden sm:block absolute inset-0">
              <Image
                src="/images/hero-patient.png"
                alt="Smiling patient at Gahan Dental clinic"
                fill
                priority
                unoptimized
                className="object-cover object-[center_25%]"
              />
            </div>

            {/* Subtle bottom shadow gradient for contrast on all screens */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none z-10" />

            {/* FLOATING OVERLAY CARDS (Hovering inside the image on ALL screens: Mobile & Desktop) */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 z-20">
              {/* Mobile: 100% full-width swipe snapping (Zero cut off edges) | Desktop: 3-column grid */}
              <div className="flex sm:grid sm:grid-cols-3 gap-2.5 sm:gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:overflow-visible pb-0.5 sm:pb-0">
                <InfoCard
                  title="Special Discount 5%"
                  description="Applicable on treatments when booking online via website"
                  href="#appointment"
                  className="snap-center w-full min-w-full sm:min-w-0 shrink-0 sm:shrink"
                />
                <InfoCard
                  title="Free Consultation"
                  description="Initial oral examination & specialist dental checkup"
                  href="#appointment"
                  className="snap-center w-full min-w-full sm:min-w-0 shrink-0 sm:shrink"
                />
                <InfoCard
                  title="0% Interest EMI"
                  description="Transparent treatment plans with flexible payment options"
                  href="#appointment"
                  className="snap-center w-full min-w-full sm:min-w-0 shrink-0 sm:shrink"
                />
              </div>

              {/* Mobile Swipe Indicators */}
              <div className="flex sm:hidden justify-center items-center gap-1.5 mt-2">
                <span className="w-5 h-1 rounded-full bg-white shadow-xs" />
                <span className="w-1.5 h-1 rounded-full bg-white/40 shadow-xs" />
                <span className="w-1.5 h-1 rounded-full bg-white/40 shadow-xs" />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
