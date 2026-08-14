'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  MessageSquare,
  Lock,
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  AlertCircle,
  RefreshCw,
  Download,
  FileText
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Footer } from '@/components/layout/Footer';
import { allSpecializedServices, primaryServices } from '@/data/services';
import { generateAppointmentPDF } from '@/lib/pdfReceipt';
import { getClinicDayInfo, ScheduleOverrideItem, sortSlotsChronologically } from '@/lib/clinicSchedule';

interface Slot {
  id: string;
  date: string;
  time_slot: string;
  max_capacity: number;
  booked_count: number;
  is_active: boolean;
}

function AppointmentContent() {
  const searchParams = useSearchParams();
  const initialServiceParam = searchParams.get('service');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [otp, setOtp] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [stepError, setStepError] = useState('');

  // Service, Date, Slot & Overrides State
  const [selectedService, setSelectedService] = useState('3D scans and x-rays');
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, ScheduleOverrideItem>>({});

  // Booking Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Available Date Options (Next 14 Days)
  const [dateOptions, setDateOptions] = useState<string[]>([]);

  // Collect all available services list
  const serviceOptions = Array.from(
    new Set([
      ...primaryServices.filter((s) => !s.isTextCard).map((s) => s.title),
      ...allSpecializedServices.map((s) => s.title),
    ])
  );

  // Pre-fill service from URL if provided
  useEffect(() => {
    if (initialServiceParam) {
      const match = serviceOptions.find(
        (s) => s.toLowerCase() === initialServiceParam.toLowerCase()
      );
      if (match) {
        setSelectedService(match);
      }
    }
  }, [initialServiceParam]);

  // Load active schedule overrides from database
  useEffect(() => {
    async function loadOverrides() {
      const { data } = await supabase.from('clinic_schedule_overrides').select('*');
      if (data) {
        const map: Record<string, ScheduleOverrideItem> = {};
        data.forEach((item: any) => {
          map[item.date] = item;
        });
        setOverrides(map);
      }
    }
    loadOverrides();
  }, []);

  useEffect(() => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d.toISOString().split('T')[0]);
    }
    setDateOptions(dates);
    if (dates.length > 0) {
      // Pick first non-holiday date by default if today is a holiday
      const firstOpenDate = dates.find((d) => !getClinicDayInfo(d, overrides).isHoliday) || dates[0];
      setSelectedDate(firstOpenDate);
    }
  }, [overrides]);

  // Fetch Available Slots from Supabase
  const fetchSlots = async (dateToFetch: string) => {
    if (!dateToFetch) return;
    setLoadingSlots(true);
    setStepError('');

    try {
      const { data, error } = await supabase
        .from('appointment_slots')
        .select('*')
        .eq('date', dateToFetch)
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching slots:', error);
      }

      if (data) {
        const sortedSlots = sortSlotsChronologically(data as Slot[]);
        setAvailableSlots(sortedSlots);
        // Auto-select first available slot if previous wasn't selected or not for this date
        const openSlot = sortedSlots.find((s) => s.booked_count < s.max_capacity);
        if (openSlot) {
          setSelectedSlot(openSlot);
        } else {
          setSelectedSlot(null);
        }
      }
    } catch (err) {
      console.error('Error in fetchSlots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(selectedDate);
    }
  }, [selectedDate]);

  // Handle Step 1: Send Secure WhatsApp OTP via Server API
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) {
      setStepError('Please enter both your name and WhatsApp mobile number.');
      return;
    }

    setSendingOtp(true);
    setStepError('');

    try {
      const res = await fetch('/api/whatsapp/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_number: whatsapp,
          patient_name: name,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStepError(data.error || 'Failed to dispatch WhatsApp OTP. Please check your number.');
        setSendingOtp(false);
        return;
      }

      setSendingOtp(false);
      setStep(2);
    } catch (err: any) {
      console.error(err);
      setStepError('Network error sending WhatsApp verification code. Please try again.');
      setSendingOtp(false);
    }
  };

  // Handle Step 2: Server-Side WhatsApp OTP Verification via Postgres RPC
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setStepError('Please enter the 4-digit verification code sent to your WhatsApp.');
      return;
    }

    setVerifyingOtp(true);
    setStepError('');

    try {
      const res = await fetch('/api/whatsapp/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          whatsapp_number: whatsapp,
          otp_code: otp.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStepError(data.error || 'Invalid or expired OTP code. Please enter the valid code.');
        setVerifyingOtp(false);
        return;
      }

      setVerifyingOtp(false);
      setStepError('');
      setStep(3);
    } catch (err: any) {
      console.error(err);
      setStepError('Server verification error. Please try again.');
      setVerifyingOtp(false);
    }
  };

  // Handle Step 3: Atomic Booking via Postgres RPC with Pessimistic Row Locking
  const handleCompleteBooking = async () => {
    if (!selectedSlot || !selectedDate) {
      setStepError('Please select an available appointment time slot.');
      return;
    }

    setIsSubmitting(true);
    setStepError('');

    try {
      // 1. Call Atomic Postgres RPC to prevent race conditions and overbooking
      const { data: rpcData, error: rpcError } = await supabase.rpc('book_appointment_slot', {
        p_patient_name: name.trim(),
        p_whatsapp_number: whatsapp.trim(),
        p_service: selectedService,
        p_slot_id: selectedSlot.id,
        p_date: selectedDate,
        p_time_slot: selectedSlot.time_slot,
      });

      if (rpcError) {
        console.error('Atomic Booking RPC Error:', rpcError);
        setStepError(
          rpcError.message.includes('fully booked')
            ? 'Sorry! This slot was just taken by another patient. Please choose another slot.'
            : rpcError.message || 'Failed to book slot. Please pick another available time.'
        );
        setIsSubmitting(false);
        // Refresh slots to show updated availability
        fetchSlots(selectedDate);
        return;
      }

      const bookingId = rpcData?.appointment_id || `GAHAN-${Math.floor(100000 + Math.random() * 900000)}`;

      // 2. Dispatch Official WhatsApp Confirmation Ticket via Meta API automatically
      try {
        await fetch('/api/whatsapp/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            whatsapp_number: whatsapp,
            patient_name: name,
            service: selectedService,
            date: selectedDate,
            time_slot: selectedSlot.time_slot,
            appointment_id: bookingId,
          }),
        });
      } catch (confirmError) {
        console.warn('WhatsApp confirmation notification warning:', confirmError);
      }

      setBookingDetails({
        id: bookingId,
        patientName: name,
        whatsapp: whatsapp,
        service: selectedService,
        date: selectedDate,
        timeSlot: selectedSlot.time_slot,
      });

      setIsSubmitting(false);
      setStep(4);
    } catch (err: any) {
      console.error('Booking submission exception:', err);
      setStepError(err.message || 'An unexpected error occurred while booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Handle Optional PDF Receipt Download
  const handleDownloadPDF = () => {
    if (!bookingDetails) return;
    setIsDownloadingPdf(true);
    try {
      generateAppointmentPDF(bookingDetails);
    } catch (err) {
      console.error('Error generating PDF:', err);
    } finally {
      setTimeout(() => setIsDownloadingPdf(false), 800);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FA] flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-[#141C28] text-white py-4 px-4 sm:px-8 border-b border-white/10 shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/90 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="px-5 py-2 bg-white text-[#111827] font-semibold text-sm rounded-full">
            Gahan Dental
          </Link>
        </div>
      </header>

      {/* Main Booking Stepper Container */}
      <section className="w-full py-8 sm:py-16 px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-[36px] shadow-2xl border border-black/5 overflow-hidden">
          {/* Top Stepper Indicator */}
          <div className="bg-[#141C28] text-white px-6 py-6 sm:px-10 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= 1 ? 'bg-emerald-500 text-white' : 'bg-white/20 text-slate-400'
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-300">Contact</span>

              <ChevronRight className="w-4 h-4 text-slate-500" />

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= 2 ? 'bg-emerald-500 text-white' : 'bg-white/20 text-slate-400'
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-300">OTP</span>

              <ChevronRight className="w-4 h-4 text-slate-500" />

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= 3 ? 'bg-emerald-500 text-white' : 'bg-white/20 text-slate-400'
                }`}
              >
                3
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-300">Slots</span>

              <ChevronRight className="w-4 h-4 text-slate-500" />

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step === 4 ? 'bg-emerald-500 text-white' : 'bg-white/20 text-slate-400'
                }`}
              >
                4
              </div>
              <span className="hidden sm:inline text-xs font-medium text-slate-300">Confirmed</span>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Step {step} of 4
            </span>
          </div>

          <div className="p-6 sm:p-12">
            {/* Global Step Error Banner */}
            {stepError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-xs text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="font-medium">{stepError}</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: Name & WhatsApp Mobile Number */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-[#587A9C] uppercase tracking-widest">
                      Step 1 • Patient Contact
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-light text-[#111827]">
                      Enter your details
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Enter your mobile number to receive your secure WhatsApp verification code.
                    </p>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-5 pt-2">
                    <div>
                      <label htmlFor="patientName" className="block text-xs font-semibold text-[#111827] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="patientName"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[48px]"
                      />
                    </div>

                    <div>
                      <label htmlFor="whatsappNumber" className="block text-xs font-semibold text-[#111827] mb-1.5">
                        WhatsApp Mobile Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="whatsappNumber"
                          required
                          placeholder="e.g. 9876543210"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[48px]"
                        />
                        <MessageSquare className="w-5 h-5 text-emerald-500 absolute right-4 top-3.5 pointer-events-none" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                        <span>A 4-digit OTP will be dispatched via official Meta WhatsApp API</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={sendingOtp}
                      className="w-full py-4 px-6 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-all min-h-[50px] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <span>{sendingOtp ? 'Sending WhatsApp OTP...' : 'Send WhatsApp OTP'}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Secure Server-Side WhatsApp OTP Verification */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 max-w-xl mx-auto"
                >
                  <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest flex items-center justify-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Step 2 • WhatsApp Verification
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-light text-[#111827]">
                      Enter WhatsApp OTP
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Verification code dispatched to{' '}
                      <span className="font-semibold text-[#111827]">{whatsapp}</span>.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-5">
                    <div>
                      <label htmlFor="otpCode" className="block text-xs font-semibold text-[#111827] mb-1.5">
                        4-Digit Verification Code *
                      </label>
                      <input
                        type="text"
                        id="otpCode"
                        required
                        maxLength={6}
                        placeholder="••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3.5 text-center tracking-[0.4em] font-mono text-xl border border-slate-300 rounded-2xl text-[#111827] focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 min-h-[52px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStepError('');
                          setStep(1);
                        }}
                        className="w-1/3 py-3.5 px-4 bg-slate-100 text-slate-700 font-medium text-xs rounded-full hover:bg-slate-200 transition-colors"
                      >
                        Change Number
                      </button>
                      <button
                        type="submit"
                        disabled={verifyingOtp}
                        className="w-2/3 py-3.5 px-6 bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-emerald-700 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        <span>{verifyingOtp ? 'Verifying...' : 'Verify & Continue'}</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: Select Date & Available Time Slot */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-[#587A9C] uppercase tracking-widest">
                      Step 3 • Appointment Details
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-light text-[#111827]">
                      Choose Date & Available Slot
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Welcome, <span className="font-semibold text-[#111827]">{name}</span>! Select your treatment and time.
                    </p>
                  </div>

                  {/* 1. Select Service */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-[#111827]">
                      Select Treatment / Service *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-4 py-3.5 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] min-h-[48px] bg-white"
                    >
                      {serviceOptions.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Select Date */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#111827]">
                        Select Available Date *
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Scroll for next 14 days
                      </span>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                      {dateOptions.map((dateStr) => {
                        const d = new Date(dateStr + 'T00:00:00');
                        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                        const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                        const isSelected = selectedDate === dateStr;
                        const dayInfo = getClinicDayInfo(dateStr, overrides);

                        return (
                          <button
                            key={dateStr}
                            type="button"
                            onClick={() => setSelectedDate(dateStr)}
                            className={`flex flex-col items-center justify-center min-w-[92px] py-3 px-3 rounded-2xl border transition-all cursor-pointer relative ${
                              isSelected
                                ? 'bg-[#141C28] text-white border-[#141C28] shadow-md ring-2 ring-[#141C28]/20'
                                : dayInfo.isHoliday
                                ? 'bg-amber-50/60 text-amber-900/80 border-amber-200/80 hover:bg-amber-50'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-[10px] uppercase font-semibold opacity-70">
                              {dayName}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold mt-0.5">{monthDay}</span>

                            {dayInfo.isHoliday ? (
                              <span className="text-[9px] font-semibold text-amber-700 bg-amber-100/90 px-1.5 py-0.5 rounded-md mt-1">
                                Holiday
                              </span>
                            ) : dayInfo.isOverride && dayInfo.overrideStatus === 'working_day' ? (
                              <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md mt-1">
                                Special Open
                              </span>
                            ) : dayInfo.badgeLabel?.includes('3rd Tue') ? (
                              <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-md mt-1">
                                Open (3rd Tue)
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Available Time Slots Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-semibold text-[#111827]">
                        Available Time Slots for {selectedDate} *
                      </label>
                      <button
                        type="button"
                        onClick={() => fetchSlots(selectedDate)}
                        className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Refresh slots</span>
                      </button>
                    </div>

                    {getClinicDayInfo(selectedDate, overrides).isHoliday ? (
                      <div className="py-8 px-6 text-center bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                        <p className="font-semibold text-sm">🏖️ Clinic Closed on This Date</p>
                        <p className="text-amber-800">
                          {getClinicDayInfo(selectedDate, overrides).reason}.
                        </p>
                        <p className="text-[11px] text-amber-700 font-medium pt-1">
                          Please choose another open date above to view available 30-minute time slots (10:00 AM – 07:30 PM).
                        </p>
                      </div>
                    ) : loadingSlots ? (
                      <div className="py-8 text-center text-xs text-slate-400">
                        Loading available slots from clinic database...
                      </div>
                    ) : availableSlots.length === 0 ? (
                      <div className="py-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-1">
                        <p>No active slots released yet for {selectedDate}.</p>
                        <p className="text-[11px] text-slate-400">
                          Operating hours: 10:00 AM – 07:30 PM (30-min slots). Please check back later or call our clinic.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {availableSlots.map((slot) => {
                          const isFull = slot.booked_count >= slot.max_capacity;
                          const isSelected = selectedSlot?.id === slot.id;

                          return (
                            <button
                              key={slot.id}
                              type="button"
                              disabled={isFull}
                              onClick={() => setSelectedSlot(slot)}
                              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between min-h-[75px] ${
                                isFull
                                  ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                                  : isSelected
                                  ? 'bg-[#587A9C] text-white border-[#587A9C] shadow-md ring-2 ring-[#587A9C]/40'
                                  : 'bg-white text-[#111827] border-slate-200 hover:border-slate-300 hover:shadow-xs cursor-pointer'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-xs sm:text-sm font-semibold">
                                  {slot.time_slot}
                                </span>
                                <Clock
                                  className={`w-3.5 h-3.5 ${
                                    isSelected ? 'text-white' : 'text-slate-400'
                                  }`}
                                />
                              </div>

                              <span
                                className={`text-[10px] font-medium mt-2 ${
                                  isSelected
                                    ? 'text-white/90'
                                    : isFull
                                    ? 'text-red-400'
                                    : 'text-emerald-600'
                                }`}
                              >
                                {isFull ? 'Slot Booked' : 'Available'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Complete Booking CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setStepError('');
                        setStep(2);
                      }}
                      className="px-5 py-3 text-slate-600 hover:text-[#111827] text-xs font-semibold cursor-pointer"
                    >
                      ← Back to Verification
                    </button>

                    <button
                      type="button"
                      disabled={
                        !selectedSlot ||
                        isSubmitting ||
                        (selectedSlot && selectedSlot.booked_count >= selectedSlot.max_capacity)
                      }
                      onClick={handleCompleteBooking}
                      className="py-3.5 px-8 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-all shadow-lg disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? 'Confirming with Database...' : 'Confirm Appointment'}
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: UI Confirmation Screen, Auto WhatsApp Ticket & Optional PDF Download */}
              {step === 4 && bookingDetails && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-6 max-w-lg mx-auto py-4"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">
                      Booking Confirmed
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-light text-[#111827] mt-1">
                      Your visit is scheduled!
                    </h2>
                  </div>

                  {/* Confirmation Summary Card */}
                  <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-slate-200 text-left space-y-3.5 text-xs text-[#111827]">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                      <span className="text-slate-400 font-medium">Appointment Reference</span>
                      <span className="font-mono font-bold text-[#141C28] bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {bookingDetails.id}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Patient Name:</span>
                      <span className="font-semibold">{bookingDetails.patientName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">WhatsApp Mobile:</span>
                      <span className="font-semibold">{bookingDetails.whatsapp}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Treatment:</span>
                      <span className="font-semibold text-[#587A9C]">{bookingDetails.service}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Date & Slot:</span>
                      <span className="font-semibold">
                        {bookingDetails.date} at {bookingDetails.timeSlot}
                      </span>
                    </div>
                  </div>

                  {/* Meta WhatsApp Automatic Notification Badge */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-left">
                    <MessageSquare className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div className="text-xs text-emerald-900">
                      <p className="font-semibold">WhatsApp Ticket Sent Automatically!</p>
                      <p className="text-[11px] text-emerald-700 mt-0.5">
                        A full digital booking confirmation has been dispatched to {bookingDetails.whatsapp}.
                      </p>
                    </div>
                  </div>

                  {/* Actions: Optional PDF Download & Return to Homepage */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      disabled={isDownloadingPdf}
                      className="w-full sm:w-1/2 py-3.5 px-6 bg-white text-[#111827] border border-slate-300 font-semibold text-xs sm:text-sm rounded-full hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.98]"
                    >
                      <Download className="w-4 h-4 text-[#587A9C]" />
                      <span>{isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Pass'}</span>
                    </button>

                    <Link
                      href="/"
                      className="w-full sm:w-1/2 py-3.5 px-6 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-colors text-center flex items-center justify-center cursor-pointer shadow-md"
                    >
                      Return to Homepage
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center text-xs text-slate-400">
          Loading appointment booking...
        </div>
      }
    >
      <AppointmentContent />
    </Suspense>
  );
}
