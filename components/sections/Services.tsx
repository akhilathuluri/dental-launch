'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { servicesData } from '@/data/services';

export const Services: React.FC = () => {
  return (
    <section id="services" className="w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 bg-[#F7F8FA] text-[#111827]">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <SectionLabel>Our clinic offers</SectionLabel>
            <h2 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-light text-[#111827] tracking-tight leading-tight">
              Services
            </h2>
          </div>
          <a
            href="#appointment"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D2736] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#111827] transition-all hover:scale-[1.02] shadow-sm group"
          >
            <span>View more</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Asymmetric Reference Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: 3D Scans and X-rays (Top Left, Large) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-8 group relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.9/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src="/images/service-xray.jpg"
              alt="3D scans and X-rays"
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-xs font-mono font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                [1]
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-3xl font-light text-white tracking-tight mb-1">
                3d scans and x-rays
              </h3>
            </div>
          </motion.a>

          {/* Card 2: Surgery (Top Right) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src="/images/service-surgery.jpg"
              alt="Surgery"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-xs font-mono font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                [2]
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Surgery
              </h3>
            </div>
          </motion.a>

          {/* Card 3: Dental cleaning (Bottom Left) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-4 group relative rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[1.3/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src="/images/service-cleaning.jpg"
              alt="Dental cleaning"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-xs font-mono font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                [3]
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Dental cleaning
              </h3>
            </div>
          </motion.a>

          {/* Card 4: Soft Neutral Text Card "We care about you" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-3 rounded-3xl bg-[#EBEFE6] text-[#111827] p-6 sm:p-7 flex flex-col justify-between border border-black/5"
          >
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              We care about you
            </span>
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-tight text-[#111827]">
                Your smile<br />is our priority
              </h3>
            </div>
          </motion.div>

          {/* Card 5: Pediatric general practitioner (Bottom Right) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="lg:col-span-5 group relative rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-[1.6/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src="/images/service-pediatric.jpg"
              alt="Pediatric general practitioner"
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-xs font-mono font-medium text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                [4]
              </span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Paediatric general practitioner
              </h3>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};
