export interface WhatsAppTemplateComponent {
  type: 'header' | 'body' | 'button';
  sub_type?: string;
  index?: string;
  parameters: Array<{
    type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video';
    text?: string;
    [key: string]: any;
  }>;
}

export function sanitizePhoneNumber(to: string): string {
  let cleaned = to.replace(/[^0-9]/g, '');

  if (cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }

  return cleaned;
}

export async function sendWhatsAppMessage(
  to: string,
  messageText?: string,
  templateName?: string,
  templateComponents?: WhatsAppTemplateComponent[]
) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    console.error('WhatsApp API Error: WHATSAPP_PHONE_NUMBER_ID or WHATSAPP_ACCESS_TOKEN is missing in environment.');
    return {
      success: false,
      error: 'WhatsApp Meta Cloud API credentials not configured in server environment.',
    };
  }

  const recipient = sanitizePhoneNumber(to);
  const endpoint = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  // Construct Meta payload
  let payload: Record<string, any>;

  if (templateName) {
    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipient,
      type: 'template',
      template: {
        name: templateName,
        language: { code: 'en_US' },
        ...(templateComponents && templateComponents.length > 0 ? { components: templateComponents } : {}),
      },
    };
  } else {
    payload = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipient,
      type: 'text',
      text: {
        preview_url: false,
        body: messageText || '',
      },
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta WhatsApp API Error response:', data);

      // Automatic fallback for 24h window (error code 131047)
      if (data.error?.code === 131047 && !templateName) {
        console.warn('Meta 24h conversation window closed. Attempting fallback to pre-approved template hello_world...');
        return sendWhatsAppMessage(to, messageText, 'hello_world');
      }

      return {
        success: false,
        errorCode: data.error?.code,
        error: data.error?.message || 'Meta API error',
        details: data.error?.error_data?.details || data.error?.message,
      };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('WhatsApp API Network Fetch Error:', error);
    return {
      success: false,
      error: error.message || 'Network error connecting to Meta WhatsApp API',
    };
  }
}

// Helper specifically for sending Pre-Approved Meta Templates with dynamic parameters {{1}}, {{2}}, etc.
export async function sendWhatsAppTemplateMessage(
  to: string,
  templateName: string,
  bodyParams: string[] = []
) {
  const components: WhatsAppTemplateComponent[] = [];

  if (bodyParams.length > 0) {
    components.push({
      type: 'body',
      parameters: bodyParams.map((param) => ({
        type: 'text',
        text: String(param),
      })),
    });
  }

  return sendWhatsAppMessage(to, undefined, templateName, components);
}
