'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, ExternalLink, Calendar } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import Link from 'next/link';

export const MapSection: React.FC = () => {
  const latitude = 17.4962759058744;
  const longitude = 78.39706800857294;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  const embedMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=17&output=embed`;

  return (
    <section id="location" className="w-full py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-[#F7F8FA]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <SectionLabel>Find our clinic</SectionLabel>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[#111827] tracking-tight">
              Our Location
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md font-normal">
              Conveniently located in Kukatpally / KPHB Colony, Hyderabad with easy transit access and dedicated patient parking.
            </p>
          </div>
        </div>

        {/* Main Grid: Info Cards + Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Address, Hours & Navigation CTAs (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 sm:p-8 bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/80 shadow-xs"
          >
            <div className="space-y-6">
              
              {/* Clinic Name & Pin */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#165634]/10 text-[#165634] flex items-center justify-center shrink-0 border border-[#165634]/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#111827] tracking-tight">
                    Gahan Dental Clinic
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    Road No 1, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1.5">
                    Coordinates: 17.4963° N, 78.3971° E
                  </p>
                </div>
              </div>

              {/* Clinic Schedule / Hours */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#111827]">
                  <Clock className="w-4 h-4 text-[#165634]" />
                  <span>Practice &amp; Working Hours</span>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Mon, Wed, Thu, Fri, Sat:</span>
                    <span className="font-medium text-slate-800">10:00 AM – 07:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/60">
                    <span>Closed:</span>
                    <span>Tuesdays (except 3rd Tue) &amp; 2nd Sunday</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#165634] hover:bg-[#114227] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold text-xs rounded-full transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#165634]" />
                  <span>Call Front Desk</span>
                </a>

                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 hover:bg-emerald-100 text-[#165634] font-semibold text-xs rounded-full border border-emerald-200/60 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </Link>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Responsive Interactive Map (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 relative rounded-3xl sm:rounded-[32px] overflow-hidden border border-slate-200/80 shadow-md bg-slate-100 min-h-[360px] sm:min-h-[440px] flex"
          >
            <iframe
              title="Gahan Dental Clinic Location Map"
              src={embedMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[360px] sm:min-h-[440px]"
            />

            {/* Map Direct Badge */}
            <div className="absolute top-4 right-4 z-10">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white/95 backdrop-blur-md hover:bg-white text-[#111827] text-xs font-semibold rounded-full shadow-lg border border-black/5 transition-all hover:scale-[1.02]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#165634]" />
                <span>Open Full Map</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
