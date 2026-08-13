import { NextResponse } from 'next/server';
import { sanitizePhoneNumber } from '@/lib/whatsapp';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { whatsapp_number, otp_code } = await request.json();

    if (!whatsapp_number || !otp_code) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number and OTP verification code are required.' },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizePhoneNumber(whatsapp_number);
    const cleanedOtp = otp_code.toString().trim();

    // Call secure Postgres RPC function with SECURITY DEFINER
    const { data, error } = await supabase.rpc('verify_whatsapp_otp', {
      p_whatsapp_number: sanitizedPhone,
      p_otp_code: cleanedOtp,
    });

    if (error) {
      console.error('Error in verify_whatsapp_otp RPC:', error);
      return NextResponse.json(
        { success: false, error: 'Database verification error. Please try again.' },
        { status: 500 }
      );
    }

    if (!data || !data.success) {
      return NextResponse.json(
        {
          success: false,
          error: data?.error || 'Invalid or expired verification code. Please request a new OTP.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'WhatsApp phone number verified successfully.',
    });
  } catch (err: any) {
    console.error('Error in verify-otp route:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error verifying OTP.' },
      { status: 500 }
    );
  }
}
