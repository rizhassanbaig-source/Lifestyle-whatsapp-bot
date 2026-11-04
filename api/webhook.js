const VERIFY_TOKEN = "lifestyle123";

module.exports = (req, res) => {
  // 1. VERIFICATION - Meta jab Verify and Save click karega
  if (req.method === 'GET') {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } 
  // 2. RECEIVE MESSAGES
  else if (req.method === 'POST') {
    console.log('Message:', JSON.stringify(req.body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
  } 
  else {
    res.send('Lifestyle Bot is Running!');
  }
};
