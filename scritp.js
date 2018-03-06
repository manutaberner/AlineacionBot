const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
    
// bot.on('message', (msg) => {
//   //anything
//   var chatId = msg.chat.id;
//   bot.sendMessage(chatId,"Hola Mundito");
// });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Creation", {
  "reply_markup": {
      "keyboard": [["Crear Alineacion"],["Mis Alineaciones"], ["Bye!"]]
      }
  });
      
  });

  // Define functionality according to the start commands
  // bot.on('message', (msg) => {
  //   var create = "Create Alineacion";
  //   if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
  //       bot.sendMessage(msg.chat.id, "/setdefenders");
  //   }
  //   var bye = "Bye!";
  //   if (msg.text.toString().toLowerCase().includes(bye)) {
  //       bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  //   }    
  //   var robot = "My Alineaciones";
  //   if (msg.text.indexOf(robot) === 0) {
  //       bot.sendMessage(msg.chat.id, "Yes I'm robot but not in that way!");
  //   }
  //});


    //Set Defenders
    bot.onText(/\/setdefenders/, (msg) => {
      bot.sendMessage(msg.chat.id, "setdefenders", {
      "reply_markup": {
          "keyboard": [["3 Defensas"], ["4 Defensas"], ["5 Defensas"]]
          }
      });
          
      });