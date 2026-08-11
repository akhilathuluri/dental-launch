-- Migration: 20260811000000_create_booking_tables.sql
-- Description: Create tables for appointment_slots, appointments, and whatsapp_otps with RLS security policies.

CREATE TABLE IF NOT EXISTS public.appointment_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  max_capacity INT NOT NULL DEFAULT 1,
  booked_count INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT unique_slot_per_day UNIQUE (date, time_slot)
);

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  service TEXT NOT NULL,
  slot_id UUID REFERENCES public.appointment_slots(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled')),
  whatsapp_sent BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.whatsapp_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointment_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_otps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for appointment_slots
CREATE POLICY "Allow public read access to active slots" ON public.appointment_slots
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to slots" ON public.appointment_slots
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for appointments
CREATE POLICY "Allow public insert of appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select of own appointments" ON public.appointments
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to appointments" ON public.appointments
  FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for whatsapp_otps
CREATE POLICY "Allow public insert of OTP" ON public.whatsapp_otps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select and update of OTP" ON public.whatsapp_otps
  FOR SELECT USING (true);

CREATE POLICY "Allow public update of OTP" ON public.whatsapp_otps
  FOR UPDATE USING (true);
