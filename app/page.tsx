import React from 'react';
import { Hero } from '@/components/sections/Hero';
import { Clinic } from '@/components/sections/Clinic';
import { Services } from '@/components/sections/Services';
import { Team } from '@/components/sections/Team';
import { Appointment } from '@/components/sections/Appointment';
import { MapSection } from '@/components/sections/MapSection';
import { Footer } from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Our Clinic Section */}
      <Clinic />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Team Section */}
      <Team />

      {/* 5. Book Appointment Section */}
      <Appointment />

      {/* 6. Maps & Location Section */}
      <MapSection />

      {/* 7. Footer Section */}
      <Footer />
    </main>
  );
}
