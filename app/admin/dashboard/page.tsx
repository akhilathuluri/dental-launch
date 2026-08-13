'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Lock
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

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

  // Slot Management Form State
  const [targetDate, setTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [customTimeSlot, setCustomTimeSlot] = useState('09:00 AM');
  const [releasing, setReleasing] = useState(false);

  // Appointments Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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

    // Fetch Slots for targetDate
    const { data: slotsData } = await supabase
      .from('appointment_slots')
      .select('*')
      .eq('date', targetDate)
      .order('time_slot', { ascending: true });

    if (slotsData) setSlots(slotsData as SlotItem[]);

    // Fetch All Appointments
    const { data: apptsData } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (apptsData) setAppointments(apptsData as AppointmentItem[]);

    setLoading(false);
  }

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

  // Bulk Release Standard Slots for Selected Date
  const handleBulkReleaseSlots = async () => {
    setReleasing(true);
    const standardTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

    const bulkPayload = standardTimes.map((time_slot) => ({
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

  // Admin Logout
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/admin');
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appt.whatsapp_number.includes(searchQuery) ||
      appt.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || appt.status === statusFilter;

    return matchesSearch && matchesStatus;
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
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-tight transition-colors border-b-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-[#141C28] text-[#141C28]'
                : 'border-transparent text-slate-400 hover:text-slate-700'
            }`}
          >
            Who Booked Slots ({appointments.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slots')}
            className={`pb-3 text-xs sm:text-sm font-semibold tracking-tight transition-colors border-b-2 cursor-pointer ${
              activeTab === 'slots'
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
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search patient name, WhatsApp, or treatment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#587A9C]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#587A9C]"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
                      <th className="py-4 px-6">Date & Slot</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-slate-400 text-xs">
                          No appointments found matching your search.
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
                              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider inline-block ${
                                appt.status === 'confirmed'
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
                              className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none"
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
            {/* Slot Release Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-[#111827] tracking-tight">
                    Slot Releasing Panel
                  </h3>
                  <p className="text-xs text-slate-500">
                    Release new available time slots for patients to book on the website.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleBulkReleaseSlots}
                  disabled={releasing}
                  className="px-5 py-2.5 bg-[#587A9C] text-white text-xs font-semibold rounded-full hover:bg-[#4C6B8A] transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Release 6 Standard Slots for {targetDate}</span>
                </button>
              </div>

              <form onSubmit={handleReleaseSingleSlot} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none min-h-[46px]"
                />

                <select
                  value={customTimeSlot}
                  onChange={(e) => setCustomTimeSlot(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold text-[#111827] focus:outline-none min-h-[46px]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
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
              <h4 className="text-sm font-semibold text-[#111827]">
                Active Released Slots for {targetDate} ({slots.length})
              </h4>

              {slots.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  No slots released yet for {targetDate}. Click "Release 6 Standard Slots" above.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#587A9C]" />
                          <span className="font-semibold text-sm text-[#111827]">
                            {slot.time_slot}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Booked: {slot.booked_count} / {slot.max_capacity}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSlotActive(slot.id, slot.is_active)}
                          className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase cursor-pointer ${
                            slot.is_active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {slot.is_active ? 'Active' : 'Disabled'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <footer className="w-full py-6 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        Gahan Dental Clinic Admin Dashboard • Supabase Auth Guarded
      </footer>
    </main>
  );
}
