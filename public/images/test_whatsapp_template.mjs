const phoneNumberId = '1252543801277504';
const accessToken = 'EAAWRhtnxnr0BSEJ45j1ZCToUyBXHOpGFYI3M9zRm9Gk0ZBTSSA4jzGeDHuPI4CVXm3mqiAqMzKIFML0ZApNvUh64NnNl5KSDDxULqsNPOLSZCU4ux8QcU8G7ZCxdTTVMLcDjguwdkjhLRAWJsSgp9hTwlzdZA8A6Egm9l0bsH5PeJf5QZAP06B55JjmFHNdZAbYzCmPgwJpOrjjYpNAdQfczCZBNKnZAqZChjt0zsZBwZBZCY0FZCeZAg6xdMt5N8IHNv461WdpokZBBGRBcy70JdndJU5Wx5YQDZB';

async function test() {
  const endpoint = `https://graph.facebook.com/v21.0/${phoneNumberId}/messages`;

  // Test Template Message hello_world to 916281949046
  const payloadTemplate = {
    messaging_product: 'whatsapp',
    to: '916281949046',
    type: 'template',
    template: {
      name: 'hello_world',
      language: { code: 'en_US' }
    }
  };

  console.log('Sending Meta Template hello_world to 916281949046...');
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payloadTemplate)
  });

  const data = await res.json();
  console.log('Status code:', res.status);
  console.log('Meta API Response:', JSON.stringify(data, null, 2));
}

test();
