const phoneNumberId = '1252543801277504';
const accessToken = 'EAAWRhtnxnr0BSCr6DrZBK30Mn4TdDeLae5NdZAX5bME13CHZA9ZCyxZA9dqZBR5T3PZCsZCcUuYKVczWFZAGGKuYUbPTyJrYVZCbJ4DBDRhkSV0IMsZB4NoqBOZAVfC3nsKrVHrf2qQtubEn3V1bk6rRFKJf4PSmgyfXchSUugM3ZBYmSxUaWQOBtZA8pmnBtXztsJnXleg1ZCiTHTs1ZCFrplNiHy9UKZBzrgw4NEyN9eKw2Xp83DOyZCAs7mV0zNQKMe1bvz9RPzCvaIHqyfw6TJIqiDFFEQ0ZCEpYwZDZD';

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
