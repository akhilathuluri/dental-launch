'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ShieldCheck, Mail, KeyRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-redirect if already signed in
  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        router.push('/admin/dashboard');
      }
    }
    checkSession();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || 'Invalid email or password credentials.');
        setLoading(false);
      } else if (data.session || data.user) {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setErrorMsg('Sign in failed. Please check your admin credentials.');
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An unexpected error occurred during authentication.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#141C28] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full border border-white/15"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Clinic Site</span>
        </Link>

        <span className="px-4 py-1.5 bg-white/10 border border-white/15 text-white font-mono text-xs rounded-full">
          Admin Portal
        </span>
      </div>

      {/* Center Sign In Card */}
      <div className="max-w-md mx-auto w-full py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1D2736] p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 mb-3 border border-white/15">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Admin Authentication
            </h1>
            <p className="text-xs text-slate-400">
              Sign in with your authorized Supabase administrator account.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-500/20 border border-red-500/30 rounded-xl text-xs text-red-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="adminEmail" className="block text-xs font-medium text-slate-300 mb-1.5">
                Admin Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="adminEmail"
                  required
                  placeholder="admin@dentty.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 pl-11 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[46px]"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              </div>
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-xs font-medium text-slate-300 mb-1.5">
                Password *
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="adminPassword"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 pl-11 bg-white/5 border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#587A9C] focus:ring-1 focus:ring-[#587A9C] min-h-[46px]"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-white text-[#111827] font-semibold text-xs sm:text-sm rounded-full hover:bg-slate-100 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 min-h-[48px] shadow-lg cursor-pointer mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Protected by Supabase Auth (Sign-in Only)</span>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-xs text-slate-500 py-4">
        © {new Date().getFullYear()} Dentty Dental Clinic Admin Management
      </div>
    </main>
  );
}
