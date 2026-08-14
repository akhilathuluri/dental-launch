-- Migration: 20260811000001_seed_initial_slots.sql
-- Description: Seed initial standard 30-minute interval slots (10:00 AM – 07:30 PM) for the upcoming 14 days.

INSERT INTO public.appointment_slots (date, time_slot, max_capacity, is_active)
SELECT 
  (CURRENT_DATE + (d || ' day')::interval)::date AS date,
  t.time_slot,
  1 AS max_capacity,
  true AS is_active
FROM generate_series(0, 14) d
CROSS JOIN (
  VALUES 
    ('10:00 AM'),
    ('10:30 AM'),
    ('11:00 AM'),
    ('11:30 AM'),
    ('12:00 PM'),
    ('12:30 PM'),
    ('01:00 PM'),
    ('01:30 PM'),
    ('02:00 PM'),
    ('02:30 PM'),
    ('03:00 PM'),
    ('03:30 PM'),
    ('04:00 PM'),
    ('04:30 PM'),
    ('05:00 PM'),
    ('05:30 PM'),
    ('06:00 PM'),
    ('06:30 PM'),
    ('07:00 PM'),
    ('07:30 PM')
) AS t(time_slot)
ON CONFLICT (date, time_slot) DO NOTHING;
