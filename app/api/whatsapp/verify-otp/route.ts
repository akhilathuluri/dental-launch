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
    const nowIso = new Date().toISOString();

    // Query for valid unverified OTP within the expiry window
    const { data: otpRecords, error: fetchError } = await supabase
      .from('whatsapp_otps')
      .select('id, expires_at, verified')
      .eq('whatsapp_number', sanitizedPhone)
      .eq('otp_code', cleanedOtp)
      .eq('verified', false)
      .gt('expires_at', nowIso)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error fetching OTP from database:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Database verification error. Please try again.' },
        { status: 500 }
      );
    }

    if (!otpRecords || otpRecords.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired verification code. Please request a new OTP.' },
        { status: 400 }
      );
    }

    const matchingOtp = otpRecords[0];

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('whatsapp_otps')
      .update({ verified: true })
      .eq('id', matchingOtp.id);

    if (updateError) {
      console.error('Error updating OTP status:', updateError);
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
