-- Migration: 20260811000001_seed_initial_slots.sql
-- Description: Seed initial default slots for the upcoming 7 days.

INSERT INTO public.appointment_slots (date, time_slot, max_capacity, is_active)
SELECT 
  (CURRENT_DATE + (d || ' day')::interval)::date AS date,
  t.time_slot,
  1 AS max_capacity,
  true AS is_active
FROM generate_series(0, 7) d
CROSS JOIN (
  VALUES 
    ('09:00 AM'),
    ('10:00 AM'),
    ('11:00 AM'),
    ('02:00 PM'),
    ('04:00 PM'),
    ('05:30 PM')
) AS t(time_slot)
ON CONFLICT (date, time_slot) DO NOTHING;
