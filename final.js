'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
var picLink = "http://images.all-free-download.com/images/graphiclarge/soccer_field_311115.jpg";
var alineacionWithNames = [];
var counter;
bot.onText(/\/start/, (msg) => {
    //Restart the array with the line up
   alineacionWithNames = []; counter = 11;
    bot.sendMessage(msg.chat.id, "Welcome to the football line up creator!", {
    "reply_markup": {
        "keyboard": [["/getplayers"],  ["/sendpic"],["/printlineup"]],
        "resize_keyboard" : true,
        "one_time_keyboard" : true
        }
    });        
});

bot.onText(/\/getplayers/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
    //bot send image with numbers to show how to write them
});

 //Send image
bot.onText(/\/sendpic/, (msg) => {  
    bot.sendPhoto(msg.chat.id, picLink);
});
bot.onText(/\/printlineup/, (msg) => {
    //for()  each to print the line up
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
});




bot.on('message', (msg) => {
    var notCommand = "/";
    if (msg.text.toString().toLowerCase().includes(notCommand)) 
        {
            console.log("It's a command");
        } else if(counter > 0)
        {
            console.log("Entro con counter");
            alineacionWithNames.push(getLastMessage(msg));
            counter --;
        }
        else if (counter === 0)
        {
            bot.sendMessage(msg.chat.id, "Alineacion completa!");
        }
});

function getLastMessage(msg){
    var fullText = msg.text;
    return fullText;
}