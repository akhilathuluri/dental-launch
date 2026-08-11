'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const Clinic: React.FC = () => {
  return (
    <section id="clinic" className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F7F8FA] text-[#111827]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Top Header Row */}
        <div className="flex items-start justify-between mb-8 sm:mb-12">
          <div>
            <SectionLabel>Wide range of services</SectionLabel>
            <h2 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-light text-[#111827] tracking-tight leading-tight">
              Our clinic
            </h2>
          </div>
          <div className="text-xs sm:text-sm font-normal text-slate-500 pt-1">
            Since 2021
          </div>
        </div>

        {/* Asymmetric Reference Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-14 lg:mb-20">
          
          {/* Column 1 (Left): Positioned below title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col justify-end lg:pt-24"
          >
            <div className="rounded-3xl sm:rounded-[32px] overflow-hidden relative aspect-[3/3.8] bg-slate-200 shadow-sm border border-black/5">
              <Image
                src="/images/clinic-operating.jpg"
                alt="Operating suite at Dentty clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Column 2 (Center): Dominant tall architectural reception image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl sm:rounded-[36px] overflow-hidden relative aspect-[3/3.9] bg-slate-200 shadow-md border border-black/5">
              <Image
                src="/images/clinic-main.jpg"
                alt="Main reception at Dentty clinic"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Column 3 (Right): Secondary office image + View More button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col items-end space-y-6 lg:pt-16"
          >
            <div className="w-full rounded-2xl sm:rounded-[28px] overflow-hidden relative aspect-[4/3] bg-slate-200 shadow-sm border border-black/5">
              <Image
                src="/images/clinic-office.jpg"
                alt="Consultation room at Dentty clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* View More Pill Button */}
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1D2736] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#111827] transition-all hover:scale-[1.02] shadow-sm group"
            >
              <span>View more</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>

        {/* Bottom Content Columns: Expertise (aligned with Center) & Care (aligned with Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-8 pt-4">
          
          <div className="hidden lg:block lg:col-span-4" />

          {/* Expertise */}
          <div className="md:col-span-6 lg:col-span-5 space-y-3">
            <h3 className="text-sm font-semibold text-[#111827] tracking-tight">
              Expertise
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-sm">
              Our clinic employs experienced and highly qualified specialists who are always ready to help you cope with any oral problems
            </p>
          </div>

          {/* Care */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#111827] tracking-tight">
              Care
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-xs">
              We care about your health and strive to do everything possible to make your smile healthy and beautiful
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
