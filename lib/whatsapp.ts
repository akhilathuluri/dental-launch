export async function sendWhatsAppMessage(to: string, messageText: string, templateName?: string) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID || '1252543801277504';
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN || 'EAAWRhtnxnr0BSCr6DrZBK30Mn4TdDeLae5NdZAX5bME13CHZA9ZCyxZA9dqZBR5T3PZCsZCcUuYKVczWFZAGGKuYUbPTyJrYVZCbJ4DBDRhkSV0IMsZB4NoqBOZAVfC3nsKrVHrf2qQtubEn3V1bk6rRFKJf4PSmgyfXchSUugM3ZBYmSxUaWQOBtZA8pmnBtXztsJnXleg1ZCiTHTs1ZCFrplNiHy9UKZBzrgw4NEyN9eKw2Xp83DOyZCAs7mV0zNQKMe1bvz9RPzCvaIHqyfw6TJIqiDFFEQ0ZCEpYwZDZD';

  // Sanitize phone number (remove +, spaces, hyphens)
  let recipient = to.replace(/[^0-9]/g, '');

  if (recipient.length === 10) {
    recipient = '91' + recipient;
  }

  const endpoint = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  // Payload: If template specified, send Template Message (bypasses 24h window), else Text Message
  const payload = templateName
    ? {
        messaging_product: 'whatsapp',
        to: recipient,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
        },
      }
    : {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: recipient,
        type: 'text',
        text: {
          preview_url: false,
          body: messageText,
        },
      };

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
      console.error('Meta WhatsApp API Error:', data);
      
      // If error 131047 (Re-engagement 24h window error), attempt automatic fallback to hello_world template
      if (data.error?.code === 131047 && !templateName) {
        console.log('Attempting Meta Template hello_world fallback for 24h window...');
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
    console.error('WhatsApp API Fetch Error:', error);
    return { success: false, error: error.message || 'Network error connecting to Meta API' };
  }
}
