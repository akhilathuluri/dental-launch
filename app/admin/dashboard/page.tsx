'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Search,
  LogOut,
  Sparkles,
  Users,
  ShieldCheck,
  MessageSquare,
  RefreshCw,
  Sliders,
  Filter,
  Lock,
  UserPlus,
  UserCheck,
  AlertCircle,
  X,
  ExternalLink,
  Send,
  ChevronLeft,
  ChevronRight,
  CalendarCheck
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { primaryServices, allSpecializedServices } from '@/data/services';
import {
  STANDARD_TIME_SLOTS,
  getClinicDayInfo,
  ScheduleOverrideItem,
  ClinicDayInfo,
  sortSlotsChronologically,
  parseTimeToMinutes,
  getTodayLocalDateStr,
  shiftDateString
} from '@/lib/clinicSchedule';

interface SlotItem {
  id: string;
  date: string;
  time_slot: string;
  max_capacity: number;
  booked_count: number;
  is_active: boolean;
}

interface AppointmentItem {
  id: string;
  patient_name: string;
  whatsapp_number: string;
  service: string;
  slot_id?: string;
  date: string;
  time_slot: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  whatsapp_sent: boolean;
  created_at: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();

  // Auth Guard State
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Tab & Data State
  const [activeTab, setActiveTab] = useState<'slots' | 'bookings'>('bookings');
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [overrides, setOverrides] = useState<Record<string, ScheduleOverrideItem>>({});
  const [overrideUpdating, setOverrideUpdating] = useState(false);

  // Slot Management Form State
  const [targetDate, setTargetDate] = useState<string>(getTodayLocalDateStr());
  const [customTimeSlot, setCustomTimeSlot] = useState(STANDARD_TIME_SLOTS[0] || '10:00 AM');
  const [releasing, setReleasing] = useState(false);

  // Appointments Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookingDateFilter, setBookingDateFilter] = useState<string>(getTodayLocalDateStr());
  const [dateFilterMode, setDateFilterMode] = useState<'date' | 'all'>('date');

  // Direct Slot Booking on behalf of Patient State
  const [bookingModalSlot, setBookingModalSlot] = useState<SlotItem | null>(null);
  const [adminPatientName, setAdminPatientName] = useState('');
  const [adminWhatsapp, setAdminWhatsapp] = useState('');
  const [adminSelectedService, setAdminSelectedService] = useState('Digital X-rays');
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingModalError, setBookingModalError] = useState('');
  const [bookingModalSuccess, setBookingModalSuccess] = useState('');

  // Collect all available services
  const serviceOptions = Array.from(
    new Set([
      ...primaryServices.filter((s) => !s.isTextCard).map((s) => s.title),
      ...allSpecializedServices.map((s) => s.title),
    ])
  );

  // 1. Strict Auth Verification on Page Load
  useEffect(() => {
    async function verifyAdminAuth() {
      setCheckingAuth(true);
      const { data: { session } } = await supabase.auth.getSession();

      if (!session || !session.user) {
        setIsAuthenticated(false);
        setCheckingAuth(false);
        router.replace('/admin');
        return;
      }

      setIsAuthenticated(true);
      setCheckingAuth(false);
    }

    verifyAdminAuth();

    // Listen for Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        router.replace('/admin');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  // 2. Fetch Data from Supabase only if Authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, targetDate]);

  async function fetchData() {
    setLoading(true);

    // 1. Fetch Schedule Overrides
    const { data: overrideData } = await supabase
      .from('clinic_schedule_overrides')
      .select('*');

    if (overrideData) {
      const map: Record<string, ScheduleOverrideItem> = {};
      overrideData.forEach((item: any) => {
        map[item.date] = item;
      });
      setOverrides(map);
    }

    // 2. Fetch Slots for targetDate
    const { data: slotsData } = await supabase
      .from('appointment_slots')
      .select('*')
      .eq('date', targetDate);

    if (slotsData) setSlots(sortSlotsChronologically(slotsData as SlotItem[]));

    // 3. Fetch All Appointments
    const { data: apptsData } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (apptsData) setAppointments(apptsData as AppointmentItem[]);

    setLoading(false);
  }

  // Declare Date as Holiday (Close Clinic & Deactivate Slots)
  const handleDeclareHoliday = async (dateStr: string) => {
    setOverrideUpdating(true);
    try {
      await supabase.from('clinic_schedule_overrides').upsert(
        {
          date: dateStr,
          status: 'holiday',
          reason: 'Admin Declared Holiday (Clinic Closed)',
        },
        { onConflict: 'date' }
      );

      // Deactivate all unbooked slots on this date so patients cannot book
      await supabase
        .from('appointment_slots')
        .update({ is_active: false })
        .eq('date', dateStr);

      await fetchData();
    } catch (err) {
      console.error('Error declaring holiday:', err);
    } finally {
      setOverrideUpdating(false);
    }
  };

  // Declare Date as Working Day (Open Clinic & Bulk Release All 20 Slots)
  const handleDeclareWorkingDay = async (dateStr: string) => {
    setOverrideUpdating(true);
    try {
      await supabase.from('clinic_schedule_overrides').upsert(
        {
          date: dateStr,
          status: 'working_day',
          reason: 'Admin Declared Special Working Day (Open)',
        },
        { onConflict: 'date' }
      );

      // Bulk release all 20 standard slots
      const bulkPayload = STANDARD_TIME_SLOTS.map((time_slot) => ({
        date: dateStr,
        time_slot,
        max_capacity: 1,
        is_active: true,
      }));

      await supabase.from('appointment_slots').upsert(bulkPayload, { onConflict: 'date,time_slot' });

      await fetchData();
    } catch (err) {
      console.error('Error declaring working day:', err);
    } finally {
      setOverrideUpdating(false);
    }
  };

  // Reset Date to Default Clinic Schedule
  const handleResetToDefaultSchedule = async (dateStr: string) => {
    setOverrideUpdating(true);
    try {
      await supabase
        .from('clinic_schedule_overrides')
        .delete()
        .eq('date', dateStr);

      await fetchData();
    } catch (err) {
      console.error('Error resetting schedule:', err);
    } finally {
      setOverrideUpdating(false);
    }
  };

  // Release Single Slot
  const handleReleaseSingleSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setReleasing(true);

    await supabase.from('appointment_slots').upsert(
      {
        date: targetDate,
        time_slot: customTimeSlot,
        max_capacity: 1,
        is_active: true,
      },
      { onConflict: 'date,time_slot' }
    );

    setReleasing(false);
    fetchData();
  };

  // Bulk Release Standard 20 Slots (10:00 AM – 07:30 PM, 30-min intervals) for Selected Date
  const handleBulkReleaseSlots = async () => {
    setReleasing(true);

    const bulkPayload = STANDARD_TIME_SLOTS.map((time_slot) => ({
      date: targetDate,
      time_slot,
      max_capacity: 1,
      is_active: true,
    }));

    await supabase.from('appointment_slots').upsert(bulkPayload, { onConflict: 'date,time_slot' });

    setReleasing(false);
    fetchData();
  };

  // Toggle Slot Active Status
  const handleToggleSlotActive = async (slotId: string, currentStatus: boolean) => {
    await supabase
      .from('appointment_slots')
      .update({ is_active: !currentStatus })
      .eq('id', slotId);

    fetchData();
  };

  // Delete Slot
  const handleDeleteSlot = async (slotId: string) => {
    await supabase.from('appointment_slots').delete().eq('id', slotId);
    fetchData();
  };

  // Update Appointment Status (with automatic capacity restoration if cancelled)
  const handleUpdateApptStatus = async (apptId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    if (newStatus === 'cancelled') {
      // Call Postgres cancellation function to restore slot capacity
      const { error } = await supabase.rpc('cancel_appointment_slot', {
        p_appointment_id: apptId,
      });

      if (error) {
        console.error('Error in cancel_appointment_slot RPC:', error);
        // Fallback update
        await supabase.from('appointments').update({ status: 'cancelled' }).eq('id', apptId);
      }
    } else {
      await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', apptId);
    }

    fetchData();
  };

  // Direct Slot Confirmation / Booking on behalf of Patient by Admin
  const handleAdminDirectBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalSlot) return;

    if (!adminPatientName.trim() || !adminWhatsapp.trim()) {
      setBookingModalError('Please enter both patient full name and WhatsApp mobile number.');
      return;
    }

    setIsSubmittingBooking(true);
    setBookingModalError('');
    setBookingModalSuccess('');

    try {
      // 1. Call Atomic Postgres RPC to book slot with row locking
      const { data: rpcData, error: rpcError } = await supabase.rpc('book_appointment_slot', {
        p_patient_name: adminPatientName.trim(),
        p_whatsapp_number: adminWhatsapp.trim(),
        p_service: adminSelectedService,
        p_slot_id: bookingModalSlot.id,
        p_date: bookingModalSlot.date,
        p_time_slot: bookingModalSlot.time_slot,
      });

      if (rpcError) {
        console.error('Admin Direct Booking RPC Error:', rpcError);
        setBookingModalError(
          rpcError.message.includes('fully booked')
            ? 'This slot is already fully booked.'
            : rpcError.message || 'Failed to book slot on behalf of patient.'
        );
        setIsSubmittingBooking(false);
        return;
      }

      const bookingId = rpcData?.appointment_id || `GAHAN-${Math.floor(100000 + Math.random() * 900000)}`;

      // 2. Dispatch Official WhatsApp Confirmation Ticket directly (No OTP verification required)
      try {
        await fetch('/api/whatsapp/send-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            whatsapp_number: adminWhatsapp.trim(),
            patient_name: adminPatientName.trim(),
            service: adminSelectedService,
            date: bookingModalSlot.date,
            time_slot: bookingModalSlot.time_slot,
            appointment_id: bookingId,
          }),
        });
      } catch (confirmError) {
        console.warn('WhatsApp confirmation notification error:', confirmError);
      }

      setBookingModalSuccess(
        `Slot successfully confirmed for ${adminPatientName}! WhatsApp confirmation dispatched.`
      );

      // Refresh both slots and appointments table
      await fetchData();

      // Automatically close modal after brief delay
      setTimeout(() => {
        setBookingModalSlot(null);
        setAdminPatientName('');
        setAdminWhatsapp('');
        setBookingModalSuccess('');
        setBookingModalError('');
        setIsSubmittingBooking(false);
      }, 1200);
    } catch (err: any) {
      console.error('Admin Booking Exception:', err);
      setBookingModalError(err.message || 'An unexpected error occurred during booking.');
      setIsSubmittingBooking(false);
    }
  };

  // Open direct booking modal for a slot
  const openDirectBookingModal = (slot: SlotItem) => {
    setBookingModalSlot(slot);
    setAdminPatientName('');
    setAdminWhatsapp('');
    setAdminSelectedService(serviceOptions[0] || 'Digital X-rays');
    setBookingModalError('');
    setBookingModalSuccess('');
  };

  // Switch to bookings tab and search for a patient
  const viewBookedPatientInDirectory = (patientNameOrPhone: string) => {
    setActiveTab('bookings');
    setSearchQuery(patientNameOrPhone);
  };

  // Admin Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/admin');
  };

  // Date shifting helper for date filter
  const handleShiftBookingDate = (days: number) => {
    const nextDate = shiftDateString(bookingDateFilter, days);
    setBookingDateFilter(nextDate);
    setDateFilterMode('date');
  };

  // Filtered Appointments (Filtered by Search, Status & Date, sorted chronologically)
  const filteredAppointments = appointments
    .filter((appt) => {
      const matchesSearch =
        appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.whatsapp_number.includes(searchQuery) ||
        appt.service.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;

      const matchesDate = dateFilterMode === 'all' || appt.date === bookingDateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      if (a.date !== b.date) {
        return b.date.localeCompare(a.date);
      }
      return parseTimeToMinutes(a.time_slot) - parseTimeToMinutes(b.time_slot);
    });

  // Render Loading / Checking Auth Gate
  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#141C28] text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 border border-white/15 animate-pulse">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-light tracking-tight text-white">
            Verifying Admin Authorization...
          </h2>
          <p className="text-xs text-slate-400">
            Checking active Supabase security session.
          </p>
        </div>
      </main>
    );
  }

  // Render Access Denied fallback if unauthenticated
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#141C28] text-white flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-sm">
          <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
            <XCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-semibold text-white">Access Denied</h2>
          <p className="text-xs text-slate-400">
            You must sign in with an authorized Supabase admin account to view the dashboard.
          </p>
          <Link
            href="/admin"
            className="inline-block py-3 px-6 bg-white text-[#111827] text-xs font-semibold rounded-full hover:bg-slate-100 transition-colors mt-2"
          >
            Go to Admin Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#111827] flex flex-col justify-between">
      {/* Admin Navbar */}
      <header className="sticky top-0 z-50 bg-[#141C28] text-white py-4 px-4 sm:px-8 border-b border-white/10 shadow-md">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-1.5 bg-white text-[#111827] font-semibold text-sm rounded-full">
              Gahan Dental
            </Link>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchData}
              className="p-2 text-slate-300 hover:text-white bg-white/10 rounded-full border border-white/15 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold rounded-full hover:bg-red-500/30 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <section className="w-full py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex-1">
        {/* Top Summary Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Total Bookings
            </span>
            <p className="text-3xl font-light text-[#111827]">{appointments.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Confirmed Patients
            </span>
            <p className="text-3xl font-light text-emerald-600">
              {appointments.filter((a) => a.status === 'confirmed').length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Slots Released Today
            </span>
            <p className="text-3xl font-light text-[#587A9C]">{slots.length}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Completed Treatments
            </span>
            <p className="text-3xl font-light text-slate-700">
              {appointments.filter((a) => a.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Tab Selection Controls */}
        <div className="flex border-b border-slate-200 mb-6 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-tight transition-colors border-b-2 cursor-pointer ${activeTab === 'bookings'
              ? 'border-[#141C28] text-[#141C28]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
          >
            Who Booked Slots ({appointments.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slots')}
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-tight transition-colors border-b-2 cursor-pointer ${activeTab === 'slots'
              ? 'border-[#141C28] text-[#141C28]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
              }`}
          >
            Slot Releasing & Management ({slots.length})
          </button>
        </div>

        {/* TAB 1: WHO BOOKED THE SLOTS (APPOINTMENTS DIRECTORY) */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Search & Comprehensive Date / Status Filter Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                {/* 1. Search Query Input */}
                <div className="relative flex-1 min-w-[240px]">
                  <input
                    type="text"
                    placeholder="Search patient name, WhatsApp, or treatment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:border-[#587A9C]"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>

                {/* 2. Date Filter Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Mode Toggle: Specific Date vs All Dates */}
                  <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setDateFilterMode('date')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${dateFilterMode === 'date'
                        ? 'bg-[#141C28] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      📅 By Date
                    </button>
                    <button
                      type="button"
                      onClick={() => setDateFilterMode('all')}
                      className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${dateFilterMode === 'all'
                        ? 'bg-[#141C28] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      🌐 All Dates
                    </button>
                  </div>

                  {/* Date Input with Prev / Next and Today Shortcuts when By Date is active */}
                  {dateFilterMode === 'date' && (
                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-2xl p-1">
                      <button
                        type="button"
                        onClick={() => handleShiftBookingDate(-1)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                        title="Previous Day"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <input
                        type="date"
                        value={bookingDateFilter}
                        onChange={(e) => {
                          setBookingDateFilter(e.target.value);
                          setDateFilterMode('date');
                        }}
                        className="px-2 py-1 bg-transparent text-xs font-semibold text-[#111827] focus:outline-none cursor-pointer"
                      />

                      <button
                        type="button"
                        onClick={() => handleShiftBookingDate(1)}
                        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                        title="Next Day"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setBookingDateFilter(getTodayLocalDateStr());
                          setDateFilterMode('date');
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-xl transition-colors cursor-pointer ${bookingDateFilter === getTodayLocalDateStr()
                          ? 'bg-[#587A9C] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                          }`}
                      >
                        Today
                      </button>
                    </div>
                  )}

                  {/* 3. Status Filter Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-[#587A9C] cursor-pointer"
                    >
                      <option value="all">All Statuses</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Description Subbar */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#111827]">
                    Showing {filteredAppointments.length} bookings
                  </span>
                  <span>•</span>
                  <span>
                    {dateFilterMode === 'date' ? (
                      <>
                        Filtered on <strong className="text-[#111827]">{bookingDateFilter}</strong>
                        {bookingDateFilter === getTodayLocalDateStr() && (
                          <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            Today
                          </span>
                        )}
                      </>
                    ) : (
                      <strong className="text-[#111827]">All Calendar Dates</strong>
                    )}
                  </span>
                  {statusFilter !== 'all' && (
                    <>
                      <span>•</span>
                      <span className="capitalize">Status: <strong>{statusFilter}</strong></span>
                    </>
                  )}
                </div>

                {dateFilterMode === 'date' ? (
                  <button
                    type="button"
                    onClick={() => setDateFilterMode('all')}
                    className="text-[11px] text-[#587A9C] hover:underline font-semibold cursor-pointer"
                  >
                    View All Dates
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setBookingDateFilter(getTodayLocalDateStr());
                      setDateFilterMode('date');
                    }}
                    className="text-[11px] text-[#587A9C] hover:underline font-semibold cursor-pointer"
                  >
                    Filter Today's Date
                  </button>
                )}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase text-[11px] font-semibold tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6">Patient Name</th>
                      <th className="py-4 px-6">WhatsApp Number</th>
                      <th className="py-4 px-6">Treatment Service</th>
                      <th className="py-4 px-6">Date &amp; Slot</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-slate-400 text-xs">
                          <div className="space-y-3 max-w-sm mx-auto">
                            <p className="font-semibold text-sm text-[#111827]">
                              No bookings found
                            </p>
                            <p className="text-slate-500 text-xs">
                              {dateFilterMode === 'date'
                                ? `No patient bookings found for ${bookingDateFilter}.`
                                : 'No patient bookings matching the current filters.'}
                            </p>
                            <div className="flex items-center justify-center gap-2 pt-2">
                              {dateFilterMode === 'date' && bookingDateFilter !== getTodayLocalDateStr() && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBookingDateFilter(getTodayLocalDateStr());
                                    setDateFilterMode('date');
                                  }}
                                  className="px-4 py-2 bg-[#587A9C] text-white font-semibold text-xs rounded-full hover:bg-[#4C6B8A] transition-colors cursor-pointer"
                                >
                                  Jump to Today
                                </button>
                              )}
                              {dateFilterMode === 'date' && (
                                <button
                                  type="button"
                                  onClick={() => setDateFilterMode('all')}
                                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                                >
                                  View All Dates ({appointments.length})
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appt) => (
                        <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6 font-medium text-[#111827]">
                            {appt.patient_name}
                          </td>
                          <td className="py-4 px-6 font-mono text-slate-600">
                            <div className="flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                              <span>{appt.whatsapp_number}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium text-[#587A9C]">
                            {appt.service}
                          </td>
                          <td className="py-4 px-6 text-slate-600">
                            <span className="font-semibold">{appt.date}</span> at {appt.time_slot}
                          </td>
                          <td className="py-4 px-6">
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider inline-block ${appt.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : appt.status === 'completed'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-red-100 text-red-800'
                                }`}
                            >
                              {appt.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <select
                              value={appt.status}
                              onChange={(e) =>
                                handleUpdateApptStatus(
                                  appt.id,
                                  e.target.value as 'confirmed' | 'completed' | 'cancelled'
                                )
                              }
                              className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SLOT RELEASING & MANAGEMENT */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            {/* Slot Release Form & Schedule Override Controller */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-semibold text-[#111827] tracking-tight">
                      Slot Releasing &amp; Schedule Panel
                    </h3>
                    {getClinicDayInfo(targetDate, overrides).isHoliday ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                        <span>🏖️ Clinic Closed</span>
                        {getClinicDayInfo(targetDate, overrides).isOverride && (
                          <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded text-amber-950 font-normal">Custom Override</span>
                        )}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                        <span>✅ Clinic Open (10:00 – 19:30)</span>
                        {getClinicDayInfo(targetDate, overrides).isOverride && (
                          <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.5 rounded text-emerald-950 font-normal">Special Working Day</span>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Standard: 10:00 AM – 07:30 PM (Closed on Tuesdays except 3rd Tue &amp; 2nd Sun). Use options below to declare holidays or open clinic on holidays.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleBulkReleaseSlots}
                    disabled={releasing || overrideUpdating}
                    className="px-5 py-2.5 bg-[#587A9C] text-white text-xs font-semibold rounded-full hover:bg-[#4C6B8A] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Release All 20 Slots (10:00 AM – 07:30 PM)</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Holiday / Working Day Override Control Strip */}
              <div className="p-4 rounded-2xl border bg-slate-50 border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Schedule Status for {targetDate}
                  </span>
                  <p className="text-xs font-medium text-[#111827]">
                    {getClinicDayInfo(targetDate, overrides).reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* If Working Day -> Give Option to Declare as Holiday (Close Clinic) */}
                  {!getClinicDayInfo(targetDate, overrides).isHoliday ? (
                    <button
                      type="button"
                      disabled={overrideUpdating}
                      onClick={() => handleDeclareHoliday(targetDate)}
                      className="px-4 py-2 bg-amber-500 text-white text-xs font-semibold rounded-full hover:bg-amber-600 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Declare this date as a holiday and disable all slots"
                    >
                      <span>🏖️ Declare Holiday (Close Clinic)</span>
                    </button>
                  ) : (
                    /* If Holiday -> Give Option to Convert into Working Day (Open Clinic & Release Slots) */
                    <button
                      type="button"
                      disabled={overrideUpdating}
                      onClick={() => handleDeclareWorkingDay(targetDate)}
                      className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-full hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      title="Open clinic on this holiday and release 20 standard slots"
                    >
                      <span>⚡ Open Clinic (Declare Working Day)</span>
                    </button>
                  )}

                  {/* Reset Override Button (if date has an active custom override) */}
                  {getClinicDayInfo(targetDate, overrides).isOverride && (
                    <button
                      type="button"
                      disabled={overrideUpdating}
                      onClick={() => handleResetToDefaultSchedule(targetDate)}
                      className="px-3 py-2 bg-white text-slate-600 border border-slate-300 text-xs font-semibold rounded-full hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
                      title="Remove custom override and revert to default monthly rules"
                    >
                      <span>🔄 Reset to Default</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Single Slot Manual Releasing Form */}
              <form onSubmit={handleReleaseSingleSlot} className="flex flex-col sm:flex-row gap-3 pt-1">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none min-h-[46px]"
                />

                <select
                  value={customTimeSlot}
                  onChange={(e) => setCustomTimeSlot(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none min-h-[46px] bg-white cursor-pointer"
                >
                  {STANDARD_TIME_SLOTS.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  disabled={releasing}
                  className="px-6 py-3 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer min-h-[46px]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Release Single Slot</span>
                </button>
              </form>
            </div>

            {/* Slots List for Selected Date */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#111827]">
                  Active Released Slots for {targetDate} ({slots.length})
                </h4>
                <span className="text-xs text-slate-400">
                  Multiple management options available per slot below
                </span>
              </div>

              {slots.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  No slots released yet for {targetDate}. Click "Release 6 Standard Slots" above.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {slots.map((slot) => {
                    const isBooked = slot.booked_count >= slot.max_capacity;
                    // Find matching booked appointment for quick preview
                    const matchedAppt = appointments.find(
                      (a) =>
                        (a.slot_id === slot.id ||
                          (a.date === slot.date && a.time_slot === slot.time_slot)) &&
                        a.status !== 'cancelled'
                    );

                    return (
                      <div
                        key={slot.id}
                        className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${isBooked
                          ? 'bg-amber-50/50 border-amber-200/80 shadow-xs'
                          : !slot.is_active
                            ? 'bg-slate-100/70 border-slate-200 opacity-75'
                            : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                          }`}
                      >
                        {/* Slot Header Info */}
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`p-2 rounded-xl ${isBooked ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-[#587A9C]'}`}>
                                <Clock className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-semibold text-base text-[#111827]">
                                  {slot.time_slot}
                                </span>
                                <span className="text-[11px] text-slate-400 block font-mono">
                                  {slot.date}
                                </span>
                              </div>
                            </div>

                            {/* Capacity Badge */}
                            <span
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${isBooked
                                ? 'bg-amber-200/80 text-amber-900'
                                : !slot.is_active
                                  ? 'bg-slate-200 text-slate-600'
                                  : 'bg-emerald-100 text-emerald-800'
                                }`}
                            >
                              {isBooked
                                ? `Booked (${slot.booked_count}/${slot.max_capacity})`
                                : `Available (${slot.booked_count}/${slot.max_capacity})`}
                            </span>
                          </div>

                          {/* If Booked: Patient Information Preview */}
                          {isBooked && matchedAppt && (
                            <div className="mt-3.5 p-3 bg-white/80 rounded-2xl border border-amber-200 text-xs space-y-1">
                              <div className="flex items-center justify-between text-[#111827] font-semibold">
                                <span>👤 {matchedAppt.patient_name}</span>
                                <button
                                  type="button"
                                  onClick={() => viewBookedPatientInDirectory(matchedAppt.patient_name)}
                                  className="text-[10px] text-[#587A9C] hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
                                >
                                  <span>View Details</span>
                                  <ExternalLink className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-500 font-mono">
                                📱 {matchedAppt.whatsapp_number}
                              </p>
                              <p className="text-[11px] text-[#587A9C] truncate">
                                🦷 {matchedAppt.service}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Multiple Slot Actions Toolbar */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          {/* Option 1: Admin Direct Slot Booking / Confirmation (if available) */}
                          {!isBooked && slot.is_active && (
                            <button
                              type="button"
                              onClick={() => openDirectBookingModal(slot)}
                              className="w-full py-2.5 px-4 bg-[#141C28] text-white text-xs font-semibold rounded-2xl hover:bg-[#1E293B] transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Book for Patient (No OTP)</span>
                            </button>
                          )}

                          {/* Secondary options row: Active/Disable Toggle & Delete */}
                          <div className="flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => handleToggleSlotActive(slot.id, slot.is_active)}
                              className={`flex-1 py-1.5 px-3 rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center ${slot.is_active
                                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                }`}
                            >
                              {slot.is_active ? 'Disable Slot' : 'Enable Slot'}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteSlot(slot.id)}
                              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                              title="Delete slot completely"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* DIRECT SLOT BOOKING MODAL (Admin books on behalf of customer) */}
      <AnimatePresence>
        {bookingModalSlot && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isSubmittingBooking) setBookingModalSlot(null);
              }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed z-50 max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5"
            >
              {/* Modal Top Row */}
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#111827]">
                      Direct Slot Confirmation
                    </h3>
                    <p className="text-xs text-slate-500">
                      Book appointment on behalf of customer
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isSubmittingBooking}
                  onClick={() => setBookingModalSlot(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Slot Target Summary Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#587A9C]" />
                  <span className="font-semibold text-[#111827]">
                    {bookingModalSlot.time_slot}
                  </span>
                </div>
                <span className="font-mono text-slate-500 font-medium">
                  📅 {bookingModalSlot.date}
                </span>
              </div>

              {/* WhatsApp Callout Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900">
                <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>No OTP Required:</strong> Instant WhatsApp booking ticket will be dispatched to patient automatically.
                </span>
              </div>

              {/* Modal Error Banner */}
              {bookingModalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{bookingModalError}</span>
                </div>
              )}

              {/* Modal Success Banner */}
              {bookingModalSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{bookingModalSuccess}</span>
                </div>
              )}

              {/* Direct Booking Form */}
              <form onSubmit={handleAdminDirectBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Smith"
                    value={adminPatientName}
                    onChange={(e) => setAdminPatientName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Patient WhatsApp Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={adminWhatsapp}
                    onChange={(e) => setAdminWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#111827] mb-1">
                    Selected Treatment / Service *
                  </label>
                  <select
                    value={adminSelectedService}
                    onChange={(e) => setAdminSelectedService(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-[#111827] focus:outline-none focus:border-[#587A9C] min-h-[44px] cursor-pointer"
                  >
                    {serviceOptions.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    disabled={isSubmittingBooking}
                    onClick={() => setBookingModalSlot(null)}
                    className="w-1/3 py-3 px-4 bg-slate-100 text-slate-700 font-semibold text-xs rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-2/3 py-3 px-6 bg-[#141C28] text-white font-semibold text-xs sm:text-sm rounded-full hover:bg-[#1E293B] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isSubmittingBooking ? 'Confirming & Sending...' : 'Confirm & Book Slot'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        Gahan Dental Clinic Admin Dashboard • Direct Slot Confirmation Enabled
      </footer>
    </main>
  );
}
