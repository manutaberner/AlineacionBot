'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {

    var hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
    bot.sendMessage(msg.chat.id,"Hello dear user");
    } 
        
    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    } 
    
    });
    bot.onText(/\/start/, (msg) => {
    
        bot.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [["/start2", "Second sample"],   ["Keyboard"], ["I'm robot"]],
            'resize_keyboard' : true,
            "one_time_keyboard" : true
            }
        });
            
    });
    

    bot.onText(/\/start2/, (msg) => {
    
        bot.sendMessage(msg.chat.id, "Welcome2", {
        "reply_markup": {
            "keyboard": [["/start3", "Second sample"],   ["Keyboard"], ["I'm robot"]],
            'resize_keyboard' : true,
            "one_time_keyboard" : true
            }
        });
            
    });

    bot.onText(/\/start3/, (msg) => {
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