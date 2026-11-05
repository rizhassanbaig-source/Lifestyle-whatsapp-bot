export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const entry = body.entry?.[0]?.changes?.[0]?.value;
      const msg = entry?.messages?.[0];
      if (msg && msg.type === 'text') {
        const from = msg.from;
        const text = msg.text.body.toLowerCase();
        let reply = "Hi! Main Lifestyle Bot hun. 'hi' likho shuru karne ke liye.";
        if (text.includes('hi') || text.includes('hello')) {
          reply = "Assalam-o-Alaikum! Kya chahiye? 1. Outfit Idea 2. Diet Tip 3. Motivation";
        } else if (text.includes('1')) {
          reply = "Aaj ka Outfit Idea: White kurta + beige trouser + white sneakers. Simple aur classy!";
        } else if (text.includes('2')) {
          reply = "Diet Tip: Subah 1 glass pani + 10 badam. Raat ko cheeni band!";
        } else if (text.includes('3')) {
          reply = "Motivation: Roz 1% behtar bano. Chota step bhi progress hai!";
        }
        await fetch(`https://graph.facebook.com/v21.0/${process.env.PHONE_NUMBER_ID}/messages`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ messaging_product: 'whatsapp', to: from, text: { body: reply } })
        });
      }
      return res.status(200).send('OK');
    } catch (e) {
      return res.status(200).send('OK');
    }
  }
  return res.status(405).send('Method not allowed');
      }
