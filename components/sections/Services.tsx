'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Layers,
  Zap,
  Smile,
  Flame,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Scissors,
  HeartPulse,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { primaryServices, allSpecializedServices, SpecializedService } from '@/data/services';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Smile: <Smile className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5" />,
  Scissors: <Scissors className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
};

const categories = ['All', 'Orthodontics', 'Restorative', 'Surgical & Endodontics', 'Preventive & Gum Care'];

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAllTreatments, setShowAllTreatments] = useState(true);

  const filteredServices = activeCategory === 'All'
    ? allSpecializedServices
    : allSpecializedServices.filter(s => s.category === activeCategory);

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
            href="#specialized-treatments"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D2736] text-white text-xs sm:text-sm font-medium rounded-full hover:bg-[#111827] transition-all hover:scale-[1.02] shadow-sm group"
          >
            <span>View all 12 treatments</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Primary Asymmetric Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 mb-16 sm:mb-24">

          {/* Card 1: Digital X-rays and X-rays (Top Left, Large) */}
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
              alt="Digital X-rays and X-rays"
              fill
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
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
                Digital X-rays
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
              src="/images/clinic-operating.jpg"
              alt="Surgery"
              fill
              sizes="(max-width: 1024px) 100vw, 450px"
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
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
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
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
              alt="Paediatric general practitioner"
              fill
              sizes="(max-width: 1024px) 100vw, 550px"
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
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

        {/* Specialized Dental Treatments Section */}
        <div id="specialized-treatments" className="pt-10 border-t border-black/5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <SectionLabel>All Dental Treatments</SectionLabel>
              <h3 className="text-2xl sm:text-4xl font-light text-[#111827] tracking-tight">
                Specialized dental procedures
              </h3>
            </div>

            {/* Category Pills Filter */}
            <div className="flex flex-wrap items-center gap-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${activeCategory === cat
                    ? 'bg-[#1D2736] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-black/5'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 12 Treatments Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          >
            <AnimatePresence>
              {filteredServices.map((service, idx) => (
                <motion.a
                  key={service.id}
                  href="#appointment"
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="group relative p-5 sm:p-6 rounded-2xl bg-white border border-black/5 hover:border-black/15 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F3F6] text-[#1D2736] flex items-center justify-center group-hover:bg-[#587A9C] group-hover:text-white transition-colors duration-300">
                        {iconMap[service.iconName] || <Sparkles className="w-5 h-5" />}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                        {service.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-medium text-[#111827] tracking-tight group-hover:text-[#587A9C] transition-colors mb-2">
                      {service.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#1D2736] group-hover:text-[#587A9C]">
                    <span>Book treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
