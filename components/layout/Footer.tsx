import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0D2619] text-white pt-12 pb-8 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">

          {/* Brand Info & Address */}
          <div className="max-w-md space-y-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-white text-[#0D2619] font-semibold text-sm tracking-tight rounded-full shadow-sm"
            >
              Gahan Dental
            </Link>
            <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed font-normal">
              State-of-the-art multi-speciality dental care and pediatric dental treatments in Kukatpally, Hyderabad.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-200/80 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Road No 1, KPHB Colony, Kukatpally, Hyderabad 500072</span>
            </div>
          </div>

          {/* Navigation Links: About, Privacy, Terms */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <Link
              href="/about"
              className="text-xs sm:text-sm text-emerald-100/80 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-emerald-100/80 hover:text-white transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs sm:text-sm text-emerald-100/80 hover:text-white transition-colors font-medium"
            >
              Terms
            </Link>
            <Link
              href="/appointment"
              className="px-5 py-2.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-white border border-emerald-500/30 font-semibold text-xs rounded-full transition-all hover:scale-[1.02]"
            >
              Book Appointment
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-emerald-200/60">
          <p>© {new Date().getFullYear()} Gahan Dental Clinic. All rights reserved.</p>

          <p className="text-emerald-200/80 text-center">
            Designed &amp; Developed by{' '}
            <a
              href="https://athuluriakhil.vercel.app/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Akhil &amp; Chanakya
            </a>
          </p>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Certified Dental Practice &bull; 10:00 AM – 07:30 PM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
