'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { navItems } from '@/data/navigation';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Logo Badge */}
        <a
          href="#home"
          className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2.5 bg-white/20 backdrop-blur-md border border-white/25 text-white font-medium text-sm sm:text-base tracking-tight rounded-full shadow-xs hover:bg-white/30 transition-colors"
        >
          Dentty
        </a>

        {/* Desktop Central Navigation Pill */}
        <nav className="hidden md:flex items-center gap-1 bg-white/20 backdrop-blur-md border border-white/25 px-4 py-1.5 rounded-full shadow-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                item.isActive
                  ? 'bg-white/30 text-white font-semibold flex items-center gap-1.5'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-pulse" />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Controls: CTA & Language Selector */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#appointment"
            className="px-5 py-2.5 bg-white text-[#111827] font-medium text-xs sm:text-sm rounded-full shadow-xs hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get in touch
          </a>

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-medium rounded-full hover:bg-white/25 transition-colors"
            aria-label="Select language"
          >
            <span>Eng</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="#appointment"
            className="px-3.5 py-2 bg-white text-[#111827] font-medium text-xs rounded-full shadow-xs"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="p-2.5 bg-white/20 backdrop-blur-md text-white border border-white/25 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Modern Floating Glass Mobile Modal Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md md:hidden"
            />

            {/* Floating Glass Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed inset-x-3 top-3 bottom-3 z-50 bg-[#141C28]/95 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl md:hidden text-white"
            >
              {/* Sheet Top Row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <a
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-white/15 border border-white/20 text-white font-medium text-sm rounded-full"
                >
                  Dentty
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="#appointment"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-white text-[#111827] font-semibold text-xs rounded-full shadow-xs"
                  >
                    Get in touch
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-white/15 text-white border border-white/20 rounded-full hover:bg-white/25 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Items List */}
              <div className="py-6 flex flex-col gap-2 my-auto">
                <span className="text-[11px] font-normal text-slate-400 mb-2">
                  Navigation
                </span>

                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-lg font-light transition-all ${
                      item.isActive
                        ? 'bg-white/15 text-white font-medium border border-white/15 shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.isActive ? (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-500 opacity-60" />
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Bottom Actions & Metadata */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <a
                  href="#appointment"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 flex items-center justify-center gap-2 bg-white text-[#111827] font-semibold text-sm rounded-full shadow-lg hover:bg-slate-100 transition-all"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>Practice Hours: 09:00 – 21:00</span>
                  <span className="text-white font-medium bg-white/10 px-3 py-1 rounded-full border border-white/15">
                    Eng
                  </span>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
