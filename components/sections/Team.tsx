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
        
        {/* Header with Navigation Arrow Controls */}
        <div className="flex flex-row items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <SectionLabel>Our experts</SectionLabel>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#111827] tracking-tight">
              Team
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141C28] text-white flex items-center justify-center hover:bg-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Previous doctor"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141C28] text-white flex items-center justify-center hover:bg-[#1E293B] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
              aria-label="Next doctor"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl sm:rounded-[36px] bg-[#EAEBED] p-4 sm:p-8 lg:p-10 border border-black/5 shadow-xs"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDoctor.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center"
            >
              
              {/* Doctor Image */}
              <div className="lg:col-span-6 rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/3] sm:aspect-[4/3] bg-slate-200 shadow-sm">
                <Image
                  src={currentDoctor.image}
                  alt={currentDoctor.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 650px"
                  className="object-cover object-top"
                />
              </div>

              {/* Doctor Info */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 sm:space-y-8 py-2">
                
                {/* Index & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {currentDoctor.indexStr}
                  </span>

                  <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-black/5 text-xs font-semibold text-[#111827]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{currentDoctor.rating}</span>
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <h3 className="text-2xl sm:text-4xl lg:text-5xl font-light text-[#111827] tracking-tight mb-1 sm:mb-2">
                    {currentDoctor.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-slate-500">
                    {currentDoctor.experience}
                  </p>
                </div>

                {/* Biography */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl">
                  {currentDoctor.bio}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <Button variant="dark" size="lg" asAnchor href="#appointment" className="w-full sm:w-auto">
                    Book an appointment
                  </Button>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
