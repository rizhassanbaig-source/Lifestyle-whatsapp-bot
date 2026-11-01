export default function handler(req, res) {
  // Meta Verify ke liye
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === 'lifestyle123') {
      console.log('WEBHOOK VERIFIED');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).send('Forbidden');
    }
  }

  // WhatsApp message aane par
  if (req.method === 'POST') {
    console.log('Message received');
    return res.status(200).send('OK');
  }

  return res.status(200).send('OK');
}
