const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const VERIFY_TOKEN = "lifestyle123";

// Home page
app.get('/', (req, res) => {
  res.send("Lifestyle Bot is Running!");
});

// --- WEBHOOK VERIFICATION - 3 jagah lagana zaroori hai ---
function verifyWebhook(req, res) {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else {
    res.send("Lifestyle Bot is Running!");
  }
}

app.get('/api/webhook', verifyWebhook);
app.get('/webhook', verifyWebhook);

// --- RECEIVE MESSAGES ---
function handleMessage(req, res) {
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
}

app.post('/', handleMessage);
app.post('/api/webhook', handleMessage);
app.post('/webhook', handleMessage);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot running on " + PORT));
