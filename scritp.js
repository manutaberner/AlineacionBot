var TelegramBot = require('node-telegram-bot-api');

var token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
// Setup polling way for the bot
var bot = new TelegramBot(token, {polling: true});
bot.on('text', function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId,"Hola Mundo");
});
