const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
    
// bot.on('message', (msg) => {
//   //anything
//   var chatId = msg.chat.id;
//   bot.sendMessage(chatId,"Hola Mundito");
// });

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
    bot.sendMessage(msg.chat.id, text, keyboard).then(message => {
        bot.once('from.' + message.from.id, m => {
            if (m.text === 'Create Alineacion') bot.sendMessage(m.from.id, 'Ok...Create :)!');
            else if (m.text === 'My Alineaciones') bot.sendMessage(m.from.id, 'Me too!!!!');
            else bot.sendMessage(m.from.id, 'Bye.. :(');
        });   
  });
});

    //Set Defenders
bot.onText(/\/setdefenders/, (msg) => {
    bot.sendMessage(msg.chat.id, "setdefenders", {
    "reply_markup": {
      "keyboard": [["3 Defensas"], ["4 Defensas"], ["5 Defensas"]]
        }
    });
          
});
    
    //Set Midfielders layout
bot.onText(/\/setmidfielderslayout/, (msg) => {
    bot.sendMessage(msg.chat.id, "setmidfielderslayout", {
    "reply_markup": {
        "keyboard": [["1 Linea de centrocampistas"],["2 Lineas de Centrocampistas"],["3 Lineas de Centrocampistas"]]
        }
   });
            
});
      
    //Set Midfielders
bot.onText(/\/setmidfielders/, (msg) => {
    bot.sendMessage(msg.chat.id, "setmidfielders", {
    "reply_markup": {
        "keyboard": [["1 Centrocampista"],["2 Centrocampistas"],["3 Centrocampistas"], ["4 Centrocampistas"], ["5 Centrocampistas"]]
        }
    });
            
});

    //Set Attackers
bot.onText(/\/setattackers/, (msg) => {
    bot.sendMessage(msg.chat.id, "setattackers", {
    "reply_markup": {
        "keyboard": [["1 Delantero"],["2 Delanteros"],["3 Delanteros"]]
            }
    });
            
});
