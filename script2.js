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
    var Alineacion = "crear alineacion";
    if (msg.text.toString().toLowerCase().indexOf(Alineacion) === 0) {
        // bot.sendMessage(msg.chat.id, "Hola  " + msg.from.first_name);
        bot.sendMessage(msg.chat.id, "/setdefenders");
    }
    });

       //Set Defenders
bot.onText(/\/setdefenders/, (msg) => {
    var keyboard = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['3 Defensas',],
            ['4 Defensas'],
            ['5 Defensas']
          ]
        })
    };  
    //bot.sendMessage(ms)
    bot.sendMessage(msg.chat.id, "/setdefenders");
});
    
    //Set Midfielders layout
bot.onText(/\/setmidfielderslayout/, (msg) => {
    var keyboard = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['1 Linea de Centrocamistas'],
            ['2  Lineas de Centrocamistas'],
            ['3  Lineas de Centrocamistas']
          ]
        })
    };        
});
      
    //Set Midfielders
bot.onText(/\/setmidfielders/, (msg) => {
    var keyboard = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['1 Centrocampista'],
            ['2 Centrocampistas'],
            ['3 Centrocampistas'],
            ['4 Centrocampistas'],
            ['5 Centrocampistas']
          ]
        })
    };
            
});

    //Set Attackers
bot.onText(/\/setattackers/, (msg) => {
    var keyboard = {
        reply_markup: JSON.stringify({
          keyboard: [
            ['1 Delantero'],
            ['2 Delanteros'],
            ['3 Delanteros']
          ]
        })
    };      
});

    
