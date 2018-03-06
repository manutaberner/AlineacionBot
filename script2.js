'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    // JSON object that contains custom reply markup
    var keyboard = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['Crear Alineacion'],
            ['Mis Alineaciones'],
            ['Bye!']
          ]
        })
    };
   //send msg to the chat
    bot.sendMessage(msg.chat.id, text, keyboard);
});
bot.on('message', (msg) => {
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(msg.chat.id, "Hello dear user");
    }
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }    
    var robot = "I'm robot";
    if (msg.text.indexOf(robot) === 0) {
        bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
    }
    });