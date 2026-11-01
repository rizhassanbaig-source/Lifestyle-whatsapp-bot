module.exports = (req, res) => {
  if (req.method === 'GET') {
    if (req.query['hub.verify_token'] === 'lifestyle123') {
      return res.status(200).send(req.query['hub.challenge']);
    } else {
      return res.status(403).send('Forbidden');
    }
  }
  if (req.method === 'POST') {
    return res.status(200).send('EVENT_RECEIVED');
  }
  return res.status(200).send('OK');
};
