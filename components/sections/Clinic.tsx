'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';

export const Clinic: React.FC = () => {
  return (
    <section id="clinic" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <SectionLabel>Wide range of services</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#111827] tracking-tight">
              Our clinic
            </h2>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Since 2021
          </div>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch mb-10 sm:mb-16">
          
          {/* Left Tall Secondary Image (Operating Room) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[3/4] bg-slate-200 shadow-sm"
          >
            <Image
              src="/images/clinic-operating.jpg"
              alt="Dental clinic operating suite"
              fill
              sizes="(max-width: 1024px) 100vw, 350px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Central Main Dominant Architectural Image (Reception) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] bg-slate-200 shadow-md"
          >
            <Image
              src="/images/clinic-main.jpg"
              alt="Main reception of Dentty clinic"
              fill
              sizes="(max-width: 1024px) 100vw, 700px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </motion.div>

          {/* Right Column: Office Image & View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col justify-between gap-5"
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/3] lg:aspect-[4/3] bg-slate-200 shadow-sm flex-1">
              <Image
                src="/images/clinic-office.jpg"
                alt="Consultation office"
                fill
                sizes="(max-width: 1024px) 100vw, 350px"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* View More Button */}
            <div className="flex justify-end lg:justify-start">
              <Button variant="dark" icon="arrow-right" asAnchor href="#services" className="w-full sm:w-auto">
                View more
              </Button>
            </div>
          </motion.div>

        </div>

        {/* Bottom Editorial Content Columns: Expertise & Care */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-12 pt-6 border-t border-black/5">
          <div className="lg:col-[4/8] space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Expertise
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              Our clinic employs experienced and highly qualified specialists who are always ready to help you with your oral problems.
            </p>
          </div>

          <div className="lg:col-[8/12] space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#111827]">
              Care
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
              We care about your health and strive to do everything possible to make your smile healthy and beautiful.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
