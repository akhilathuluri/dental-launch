'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { doctorsData } from '@/data/doctors';

export const Team: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentDoctor = doctorsData[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % doctorsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + doctorsData.length) % doctorsData.length);
  };

  return (
    <section id="team" className="w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <SectionLabel>Our specialist</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#111827] tracking-tight">
              Lead Specialist
            </h2>
          </div>

          {doctorsData.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#165634] text-white flex items-center justify-center hover:bg-[#114227] transition-colors focus:outline-none"
                aria-label="Previous doctor"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#165634] text-white flex items-center justify-center hover:bg-[#114227] transition-colors focus:outline-none"
                aria-label="Next doctor"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl sm:rounded-[36px] bg-[#EAEBED] p-4 sm:p-8 lg:p-10 border border-black/5 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
            
            {/* Doctor Image */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/4.5] bg-white shadow-md">
              <Image
                src={currentDoctor.image}
                alt={currentDoctor.name}
                fill
                priority
                unoptimized
                className="object-cover object-top"
              />
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-5 sm:space-y-6 py-2">
              
              {/* Specialization Badges & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-[#165634]/10 text-[#165634] text-xs font-semibold rounded-full border border-[#165634]/20">
                    {currentDoctor.specialization}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-white px-3.5 py-1 rounded-full border border-black/5 text-xs font-semibold text-[#111827] shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentDoctor.rating} Top Rated</span>
                </div>
              </div>

              {/* Name, Degrees & Experience */}
              <div>
                <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#111827] tracking-tight mb-2">
                  {currentDoctor.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#165634] mb-1">
                  {currentDoctor.qualification}
                </p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {currentDoctor.experience}
                </p>
              </div>

              {/* Biography */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentDoctor.bio}
              </p>

              {/* Key Clinical Procedures */}
              <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-medium text-slate-700">
                <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200">Root Canals</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200">Pulpectomy</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200">Laser Treatments</span>
                <span className="px-2.5 py-1 bg-white rounded-lg border border-slate-200">Infants, Kids &amp; Adults</span>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#appointment"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#165634] hover:bg-[#114227] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  <span>Book Consultation with Dr. Manishpala</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
