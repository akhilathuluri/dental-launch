-- Migration: 20260814000001_create_schedule_overrides.sql
-- Description: Create clinic_schedule_overrides table for dynamic admin holiday and working day declarations.

CREATE TABLE IF NOT EXISTS public.clinic_schedule_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('holiday', 'working_day')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.clinic_schedule_overrides ENABLE ROW LEVEL SECURITY;

-- Allow public read access so patient views and live badges reflect custom overrides
CREATE POLICY "Allow public read access to schedule overrides" ON public.clinic_schedule_overrides
  FOR SELECT USING (true);

-- Allow authenticated admin full management access
CREATE POLICY "Allow admin full access to schedule overrides" ON public.clinic_schedule_overrides
  FOR ALL USING (auth.role() = 'authenticated');
