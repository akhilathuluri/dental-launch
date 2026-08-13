import { NextResponse } from 'next/server';
import { sendWhatsAppMessage, sanitizePhoneNumber } from '@/lib/whatsapp';

export async function POST(request: Request) {
  try {
    const { whatsapp_number, patient_name, service, date, time_slot, appointment_id } = await request.json();

    if (!whatsapp_number || !patient_name || !service || !date || !time_slot) {
      return NextResponse.json(
        { success: false, error: 'Missing required appointment parameters.' },
        { status: 400 }
      );
    }

    const sanitizedPhone = sanitizePhoneNumber(whatsapp_number);

    const messageText = `🎉 *Gahan Dental Clinic — Booking Confirmed!*\n\nDear *${patient_name}*,\n\nYour dental appointment has been successfully scheduled.\n\n📌 *Booking Details:*\n- *Ref ID:* ${
      appointment_id || 'CONFIRMED'
    }\n- *Treatment:* ${service}\n- *Date:* ${date}\n- *Time Slot:* ${time_slot}\n\n📍 *Clinic Address:*\nGahan Dental Care Center, Main Boulevard\n*Contact:* +1 (800) 456-7890\n\nThank you for choosing Gahan Dental! We look forward to welcoming you.`;

    // Send real WhatsApp confirmation ticket via Meta Cloud API
    const whatsappResult = await sendWhatsAppMessage(sanitizedPhone, messageText);

    return NextResponse.json({
      success: true,
      whatsappResult,
      message: 'WhatsApp booking confirmation ticket sent via Meta Cloud API.',
    });
  } catch (err: any) {
    console.error('Error in send-confirmation API route:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
