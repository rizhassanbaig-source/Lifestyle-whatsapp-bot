module.exports = async (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'lifestyle123';
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }
    return res.status(403).send('Forbidden');
  }
  return res.status(200).send('OK');
};
