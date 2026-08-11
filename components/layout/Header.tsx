'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navItems } from '@/data/navigation';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className="sticky top-0 z-50 w-full transition-all duration-300 pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
        
        {/* Logo Badge */}
        <a
          href="#home"
          className="flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 bg-[#141C28] text-white font-semibold text-sm sm:text-base tracking-tight rounded-full shadow-sm hover:bg-[#1E293B] transition-colors"
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
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-white/20 backdrop-blur-md text-white border border-white/25 rounded-full focus:outline-none focus:ring-2 focus:ring-white/40"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 top-[70px] z-40 bg-[#141C28]/95 backdrop-blur-xl p-6 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-3 mt-4">
              <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase mb-2">
                Navigation
              </span>
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`text-2xl font-medium tracking-tight py-2 border-b border-white/10 ${
                    item.isActive ? 'text-amber-300 font-semibold' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <a
                href="#appointment"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 text-center bg-white text-[#111827] font-semibold text-base rounded-full shadow-lg"
              >
                Book Appointment
              </a>
              <div className="flex justify-between items-center text-xs text-slate-400 pt-2 border-t border-white/10">
                <span>Practice Hours: 09:00 - 21:00</span>
                <span className="text-white">Eng</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
