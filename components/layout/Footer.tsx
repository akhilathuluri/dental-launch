import React from 'react';
import { footerNavigation } from '@/data/navigation';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#141C28] text-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info & Socials */}
          <div className="lg:col-span-2 flex flex-col justify-between gap-6">
            <div>
              <a
                href="#home"
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#111827] font-semibold text-sm tracking-tight rounded-full shadow-sm mb-4"
              >
                Dentty
              </a>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
                Prevention, diagnosis and treatment of dental and oral diseases. High-end modern dental care tailored to your health.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all text-xs font-semibold"
              >
                fb
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all text-xs font-semibold"
              >
                tw
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-all text-xs font-semibold"
              >
                ig
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              {footerNavigation.solutions.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerNavigation.company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerNavigation.support.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerNavigation.legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-xs text-slate-300 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Dentty Dental Clinic. All rights reserved.</p>
          <p className="text-slate-400">Designed & Engineered with Architectural Precision</p>
        </div>
      </div>
    </footer>
  );
};
