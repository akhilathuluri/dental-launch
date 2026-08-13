-- Migration: 20260814000000_secure_rls_and_atomic_booking.sql
-- Description: Revoke insecure public SELECT on appointments & whatsapp_otps, add atomic booking RPC with row locking, and add capacity restoration RPC.

-- 1. Drop existing policies to prevent conflicts
DROP POLICY IF EXISTS "Allow public select of own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow public insert of appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow admin full access to appointments" ON public.appointments;

DROP POLICY IF EXISTS "Allow public select and update of OTP" ON public.whatsapp_otps;
DROP POLICY IF EXISTS "Allow public update of OTP" ON public.whatsapp_otps;
DROP POLICY IF EXISTS "Allow public insert of OTP" ON public.whatsapp_otps;
DROP POLICY IF EXISTS "Allow public update of own unverified OTP" ON public.whatsapp_otps;
DROP POLICY IF EXISTS "Allow admin full access to OTPs" ON public.whatsapp_otps;

-- 2. Restrict appointments table:
CREATE POLICY "Allow public insert of appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admin full access to appointments" ON public.appointments
  FOR ALL USING (auth.role() = 'authenticated');

-- 3. Restrict whatsapp_otps table:
CREATE POLICY "Allow public insert of OTP" ON public.whatsapp_otps
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update of own unverified OTP" ON public.whatsapp_otps
  FOR UPDATE USING (verified = false);

CREATE POLICY "Allow admin full access to OTPs" ON public.whatsapp_otps
  FOR ALL USING (auth.role() = 'authenticated');

-- 4. Atomic Booking Function with Row-Level Locking (Pessimistic concurrency control)
CREATE OR REPLACE FUNCTION public.book_appointment_slot(
  p_patient_name TEXT,
  p_whatsapp_number TEXT,
  p_service TEXT,
  p_slot_id UUID,
  p_date DATE,
  p_time_slot TEXT
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_slot RECORD;
  v_appointment_id UUID;
BEGIN
  -- Lock the slot row for update to eliminate race conditions
  SELECT * INTO v_slot
  FROM public.appointment_slots
  WHERE id = p_slot_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Appointment slot not found' USING ERRCODE = 'P0002';
  END IF;

  IF NOT v_slot.is_active THEN
    RAISE EXCEPTION 'This appointment slot is currently inactive' USING ERRCODE = 'P0001';
  END IF;

  IF v_slot.booked_count >= v_slot.max_capacity THEN
    RAISE EXCEPTION 'This time slot is already fully booked. Please choose another slot.' USING ERRCODE = 'P0003';
  END IF;

  -- Increment slot booked count
  UPDATE public.appointment_slots
  SET booked_count = booked_count + 1
  WHERE id = p_slot_id;

  -- Insert appointment record
  INSERT INTO public.appointments (
    patient_name,
    whatsapp_number,
    service,
    slot_id,
    date,
    time_slot,
    status,
    whatsapp_sent
  )
  VALUES (
    p_patient_name,
    p_whatsapp_number,
    p_service,
    p_slot_id,
    p_date,
    p_time_slot,
    'confirmed',
    true
  )
  RETURNING id INTO v_appointment_id;

  RETURN jsonb_build_object(
    'success', true,
    'appointment_id', v_appointment_id,
    'message', 'Appointment booked successfully'
  );
END;
$$;

-- 5. Cancellation Function to restore slot capacity
CREATE OR REPLACE FUNCTION public.cancel_appointment_slot(
  p_appointment_id UUID
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_slot_id UUID;
  v_current_status TEXT;
BEGIN
  SELECT slot_id, status INTO v_slot_id, v_current_status
  FROM public.appointments
  WHERE id = p_appointment_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Appointment not found' USING ERRCODE = 'P0002';
  END IF;

  IF v_current_status = 'cancelled' THEN
    RETURN jsonb_build_object('success', true, 'message', 'Appointment was already cancelled');
  END IF;

  -- Update appointment status
  UPDATE public.appointments
  SET status = 'cancelled'
  WHERE id = p_appointment_id;

  -- Decrement slot booked count if attached to a slot and > 0
  IF v_slot_id IS NOT NULL THEN
    UPDATE public.appointment_slots
    SET booked_count = GREATEST(0, booked_count - 1)
    WHERE id = v_slot_id;
  END IF;

  RETURN jsonb_build_object('success', true, 'message', 'Appointment cancelled and slot capacity restored');
END;
$$;
