const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "lifestyle123";
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    if (mode) {
      return res.sendStatus(403);
    }
    return res.send('Lifestyle Bot is Running!');
  }

  if (req.method === 'POST') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) {}
      }
      if (body && body.object === 'whatsapp_business_account') {
        const entry = body.entry?.[0];
        const change = entry?.changes?.[0];
        const value = change?.value;
        const message = value?.messages?.[0];

        if (message && message.type === 'text') {
          const from = message.from;
          const text = message.text.body.toLowerCase().trim();

          let reply = "Assalam-o-Alaikum! Welcome to Lifestyle. \n\n1 - Menu Dekhna\n2 - Order Karna\n3 - Help";

          if (text.includes('hi') || text.includes('hello') || text.includes('salam')) {
            reply = "Assalam-o-Alaikum! Welcome to Lifestyle. \n\nKya chahiye apko?\n1 - Menu\n2 - Order\n3 - Help";
          } else if (text === '1') {
            reply = "Hamara Menu:\nBurger - 500 Rs\nPizza - 1200 Rs\nShake - 300 Rs\n\nOrder ke liye 2 likhen";
          } else if (text === '2') {
            reply = "Order ke liye apna Naam aur Address bhejen. Shukriya!";
          } else if (text === '3') {
            reply = "Kisi bhi madad ke liye 0300-1234567 par rabta karen.";
          }

          await fetch(`https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: from,
              type: 'text',
              text: { body: reply }
            })
          });
        }
      }
      return res.status(200).send('EVENT_RECEIVED');
    } catch (e) {
      console.log(e);
      return res.status(200).send('EVENT_RECEIVED');
    }
  }

  return res.send('Lifestyle Bot is Running!');
};
