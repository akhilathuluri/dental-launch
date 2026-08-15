import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ShieldCheck, Award, Heart, Sparkles, CheckCircle2, MapPin, Clock, Phone } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'About Us | Gahan Dental Clinic & Implant Center',
  description: 'Learn about Gahan Dental Clinic in Kukatpally, Hyderabad. Led by Dr. Manishpala (MDS), we provide compassionate, state-of-the-art pediatric and general dental care.',
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#F7F8FA] flex flex-col justify-between text-[#111827]">
      {/* Top Header */}
      <header className="w-full bg-[#0F3521] text-white py-4 px-4 sm:px-6 lg:px-8 shadow-md sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/"
            className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm border border-white/25"
          >
            Gahan Dental
          </Link>

          <Link
            href="/appointment"
            className="px-4 py-2 bg-white text-[#0F3521] font-semibold text-xs sm:text-sm rounded-full shadow-sm hover:bg-emerald-50 transition-all hover:scale-[1.02]"
          >
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* 1. Hero Section */}
        <section className="bg-[#0F3521] bg-gradient-to-br from-[#14482C] via-[#0F3521] to-[#0A2617] text-white rounded-3xl sm:rounded-[36px] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl relative z-10 space-y-6">
            <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
              About Gahan Dental
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Transforming Smiles with <span className="font-normal text-white">Care &amp; Precision</span>
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl font-normal">
              Gahan Dental Clinic &amp; Implant Center is a premier multi-speciality dental healthcare facility located in Kukatpally, Hyderabad. We combine clinical expertise, advanced painless laser technologies, and compassionate patient care to deliver healthy, confident smiles for patients of all ages.
            </p>
          </div>
        </section>

        {/* 2. Clinical Philosophy & Values */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#165634]">Our Core Values</span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-[#111827]">
              The Standard of Dental Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#165634]/10 text-[#165634] flex items-center justify-center border border-[#165634]/20">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">Gentle &amp; Painless Dentistry</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We believe dental visits should be comforting and stress-free. Utilizing advanced topical anesthetics, laser therapies, and gentle techniques, we ensure virtually pain-free experiences.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#165634]/10 text-[#165634] flex items-center justify-center border border-[#165634]/20">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">Modern Laser &amp; Digital Tech</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Our clinic is equipped with zero-radiation digital imaging, dental lasers for soft tissue management, and motorized rotary endodontic systems for precise outcomes.
              </p>
            </div>

            <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#165634]/10 text-[#165634] flex items-center justify-center border border-[#165634]/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#111827]">Strict Hospital-Grade Sterilization</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Patient safety is our foremost priority. We follow strict 4-tier Class-B autoclave sterilization protocols for all instruments, accompanied by disposable barriers and air purification.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Lead Specialist Profile */}
        <section className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-12 lg:p-16 border border-slate-200/80 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Doctor Image */}
            <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden relative aspect-[4/4.5] bg-slate-100 shadow-md">
              <Image
                src="/images/doctor.png"
                alt="Dr. Manishpala - Lead Specialist at Gahan Dental"
                fill
                priority
                unoptimized
                className="object-cover object-top"
              />
            </div>

            {/* Doctor Bio & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="px-3.5 py-1 bg-[#165634]/10 text-[#165634] text-xs font-semibold rounded-full border border-[#165634]/20">
                  Lead Specialist &amp; Pediatric Dentist
                </span>
                <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-[#111827]">
                  Dr. Manishpala
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-[#165634]">
                  MDS - Paedodontics And Preventive Dentistry, BDS
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  13 Years Experience Overall (12 years as specialist)
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Dr. Manishpala is a highly respected Pediatric Dentist and Preventive Dental Specialist. She completed her Master of Dental Surgery (MDS) from the prestigious Army College of Dental Sciences. Over 13+ years of clinical practice across prominent multi-speciality hospitals and dental centers, she has developed comprehensive mastery in child behavior management, preventive pediatric protocols, laser procedures, and complex root canal therapies for patients of all age groups.
              </p>

              {/* Specializations List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#165634] shrink-0" />
                  <span>Pediatric Dentistry &amp; Pulpectomy</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#165634] shrink-0" />
                  <span>Infant &amp; Adult Laser Treatments</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#165634] shrink-0" />
                  <span>Single-Sitting Rotary Root Canals</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#165634] shrink-0" />
                  <span>Preventive Sealants &amp; Fluoride Therapy</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/appointment"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#165634] hover:bg-[#114227] text-white font-semibold text-xs sm:text-sm rounded-full transition-all shadow-md hover:shadow-lg"
                >
                  <span>Schedule Consultation with Dr. Manishpala</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Location & Contact Banner */}
        <section className="bg-slate-100 rounded-3xl p-8 sm:p-12 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-[#111827]">Visit Our Kukatpally Clinic</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#165634]" />
                <span>Road No 1, KPHB Colony, Kukatpally, Hyderabad 500072</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#165634]" />
                <span>Mon-Sat: 10:00 AM – 07:30 PM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919876543210"
              className="px-6 py-3 bg-white text-[#111827] font-semibold text-xs rounded-full border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors"
            >
              Call Front Desk
            </a>
            <Link
              href="/appointment"
              className="px-6 py-3 bg-[#165634] hover:bg-[#114227] text-white font-semibold text-xs rounded-full shadow-sm transition-all"
            >
              Book Appointment
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
