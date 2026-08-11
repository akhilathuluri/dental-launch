import { NextResponse } from 'next/server';
import { sendWhatsAppMessage } from '@/lib/whatsapp';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { whatsapp_number, otp_code, patient_name } = await request.json();

    if (!whatsapp_number || !otp_code) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp number and OTP code are required.' },
        { status: 400 }
      );
    }

    const messageText = `✨ *Dentty Dental Clinic Verification*\n\nHello *${
      patient_name || 'Patient'
    }*,\n\nYour WhatsApp verification OTP code is: *${otp_code}*\n\nThis code is valid for 10 minutes. Please enter it on the website to choose your preferred appointment time slot.`;

    // Send real WhatsApp message via Meta Cloud API
    const whatsappResult = await sendWhatsAppMessage(whatsapp_number, messageText);

    // Save record to Supabase whatsapp_otps table
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    await supabase.from('whatsapp_otps').insert({
      whatsapp_number: whatsapp_number,
      otp_code: otp_code,
      expires_at: expiresAt,
      verified: false,
    });

    return NextResponse.json({
      success: true,
      whatsappResult,
      otp_code,
      message: 'WhatsApp OTP code dispatched successfully.',
    });
  } catch (err: any) {
    console.error('Error in send-otp API route:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
