'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { servicesData } from '@/data/services';

export const Services: React.FC = () => {
  return (
    <section id="services" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <SectionLabel>Our dental offers</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#111827] tracking-tight">
              Services
            </h2>
          </div>
          <a
            href="#appointment"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] hover:text-[#587A9C] transition-colors"
          >
            <span>View all offers</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Card 1: 3D Scans and X-rays (Top Left, Large) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-8 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[1.9/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
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
                3D scans and X-rays
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-normal line-clamp-2">
                High-precision digital 3D tomography and low-radiation panoramic scans for exact treatment planning.
              </p>
            </div>
          </motion.a>

          {/* Card 2: Surgery (Top Right) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-4 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-auto bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
          >
            <Image
              src="/images/service-surgery.jpg"
              alt="Dental surgery"
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
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
                Surgery
              </h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                Painless surgical interventions and wisdom tooth extractions.
              </p>
            </div>
          </motion.a>

          {/* Card 3: Dental cleaning (Bottom Left) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="lg:col-span-4 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/3] lg:aspect-[1.3/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
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
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
                Dental cleaning
              </h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                Professional hygiene, ultrasonic scaling, and tooth polishing.
              </p>
            </div>
          </motion.a>

          {/* Card 4: Soft Neutral Text Card "We care about you" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="lg:col-span-3 rounded-2xl sm:rounded-3xl bg-[#EBEFE6] text-[#111827] p-6 sm:p-7 flex flex-col justify-between border border-black/5"
          >
            <span className="text-xs text-slate-500 font-medium tracking-wide">
              We care about you
            </span>
            <div className="my-6">
              <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-tight text-[#111827]">
                Your smile<br />is our priority
              </h3>
            </div>
            <p className="text-xs text-slate-500 font-normal">
              Modern gentle equipment ensuring absolute comfort at every step.
            </p>
          </motion.div>

          {/* Card 5: Pediatric general practitioner (Bottom Right) */}
          <motion.a
            href="#appointment"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="lg:col-span-5 group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-[1.6/1] bg-slate-900 text-white p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all"
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
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mb-1">
                Pediatric general practitioner
              </h3>
              <p className="text-xs text-slate-300 font-normal line-clamp-2">
                Specialized dental care and preventive treatments for children.
              </p>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
};
