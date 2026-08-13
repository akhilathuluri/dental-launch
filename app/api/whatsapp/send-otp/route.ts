import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendWhatsAppMessage, sanitizePhoneNumber } from '@/lib/whatsapp';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { whatsapp_number, patient_name } = await request.json();

    if (!whatsapp_number) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp mobile number is required.' },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizePhoneNumber(whatsapp_number);

    // Cryptographically secure 4-digit OTP generation (1000 - 9999)
    const otpCode = crypto.randomInt(1000, 10000).toString();

    const messageText = `✨ *Gahan Dental Clinic Verification*\n\nHello *${
      patient_name ? patient_name.trim() : 'Valued Patient'
    }*,\n\nYour appointment verification code is: *${otpCode}*\n\nThis code is valid for 10 minutes. Please enter it on the website to select your preferred appointment time slot.`;

    // 1. Dispatch real WhatsApp message via Meta Cloud API
    const whatsappResult = await sendWhatsAppMessage(sanitizedPhone, messageText);

    // 2. Persist OTP in Supabase with a 10-minute expiry window
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    
    // Invalidate previous unverified OTPs for this number
    await supabase
      .from('whatsapp_otps')
      .update({ verified: true })
      .eq('whatsapp_number', sanitizedPhone)
      .eq('verified', false);

    // Insert new active OTP record
    const { error: dbError } = await supabase.from('whatsapp_otps').insert({
      whatsapp_number: sanitizedPhone,
      otp_code: otpCode,
      expires_at: expiresAt,
      verified: false,
    });

    if (dbError) {
      console.error('Failed to store OTP in database:', dbError);
    }

    // Return response without leaking the OTP code to the client
    return NextResponse.json({
      success: true,
      whatsappResult,
      message: 'WhatsApp verification code dispatched successfully.',
    });
  } catch (err: any) {
    console.error('Error in send-otp route:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error while sending OTP.' },
      { status: 500 }
    );
  }
}
