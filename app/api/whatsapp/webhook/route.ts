import { NextResponse } from 'next/server';

// 1. GET Handler: Required by Meta to verify your Webhook URL during setup (Step 2)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const configuredVerifyToken =
    process.env.WHATSAPP_VERIFY_TOKEN || 'gahan_dental_verify_token_2026';

  // Check if mode and token match
  if (mode === 'subscribe' && token === configuredVerifyToken) {
    console.log('Meta Webhook Verified Successfully!');
    return new Response(challenge, { status: 200 });
  }

  // Verification failed
  return NextResponse.json(
    { error: 'Verification token mismatch' },
    { status: 403 }
  );
}

// 2. POST Handler: Receives live delivery receipts and incoming patient messages
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log incoming Meta WhatsApp events (delivery status, read receipts, replies)
    if (body.object) {
      if (
        body.entry &&
        body.entry[0]?.changes &&
        body.entry[0]?.changes[0]?.value?.messages &&
        body.entry[0]?.changes[0]?.value?.messages[0]
      ) {
        const message = body.entry[0].changes[0].value.messages[0];
        const fromNumber = message.from;
        const textBody = message.text?.body;
        console.log(`Incoming message from ${fromNumber}: ${textBody}`);
      }

      return NextResponse.json({ status: 'EVENT_RECEIVED' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Not a WhatsApp API event' }, { status: 404 });
  } catch (error: any) {
    console.error('Webhook Processing Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
