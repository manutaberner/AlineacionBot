'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
var alineacion = []; 
//Include the goolkepeer to the array
alineacion.push(1);
var messagesToSend = ["/setmidfielders","/setattackers"];
var lastMessage;
bot.onText(/\/start/, (msg) => {
    
    bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
        "keyboard": [["/setdefenders", "Second sample"],   ["Keyboard"], ["I'm robot"]],
        "resize_keyboard" : true,
        "one_time_keyboard" : true
        }
    });        
});
    
       //Set Defenders
bot.onText(/\/setdefenders/, (msg) => {
    bot.sendMessage(msg.chat.id, "Indicar el numero de Defensas deseado:", {
        "reply_markup": {
            "keyboard": [["3 Defensas"],["4 Defensas"], ["5 Defensas"]],
            "resize_keyboard" : true,
            "one_time_keyboard" : true
        }
    });
});

  //Set Midfielders
  bot.onText(/\/setmidfielders/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Indicar el numero de Centrocampistas deseado:", {
        "reply_markup": {
            "keyboard": [
                ["1 Centrocampista"],
                ["2 Centrocampistas"],
                ["3 Centrocampistas"],
                ["4 Centrocampistas"],
                ["5 Centrocampistas"]],
            "resize_keyboard" : true,
            "one_time_keyboard" : true
        }
    });
});

//Set Attackers - Not useful anymore
bot.onText(/\/setattackers/, (msg) => {
    bot.sendMessage(msg.chat.id, "Indicar el numero de Delanteros deseado:", {
        "reply_markup": {
            "keyboard": [["1 Delanteros"],["2 Delanteros"], ["3 Delanteros"]],
            "resize_keyboard" : true,
            "one_time_keyboard" : true
        }
    });
    getLastMessage(msg);
    console.log(alineacion);
});
//If the message has the word "Defensas" = Defenders
bot.on('message', (msg) => {
    
    var defenders = "defensas";
    var midfielders = "centrocampista";
    if (msg.text.toString().toLowerCase().includes(defenders)) {
        getLastMessage(msg);
        bot.sendMessage(msg.chat.id,"Haga click en el mensaje  para continuar");
        bot.sendMessage(msg.chat.id,"/setmidfielders"); 
    } 
    
    if (msg.text.toString().toLowerCase().includes(midfielders)) {
        getLastMessage(msg);
        fillLineUp(msg);
        //bot.sendMessage(msg.chat.id,"Haga click en el mensaje para continuar");
        //bot.sendMessage(msg.chat.id,"/setattackers"); 
        
        } 
    });

function sendNextMessage(msg)
{
    //Return the 1st message that has to be send to make the lineup
    bot.sendMessage(msg.chat.id,messagesToSend[0]);
    //remove the element already sent
    messagesToSend.unshift();

}

function getLastMessage(msg){
    var fullText = msg.text;
    //get the number of the to add to the Array
    lastMessage = parseInt(fullText.substring(0,1),10);
    alineacion.push(lastMessage);
}

function fillLineUp(msg)
{
    var total = 11;
    var lineUpWithLines="Alineacion: ";
    for(var i = 0; i < alineacion.length ; i ++)
    {
        lineUpWithLines += alineacion[i] + "-";
        total -= alineacion[i];
    }
    lineUpWithLines += total;
    bot.sendMessage(msg.chat.id,lineUpWithLines);
    alineacion.push(total);
}


//Useless
function getLineUp(msg)
{
    bot.sendMessage(msg.chat.id,alineacion);
    for(var i = 0; i < alineacion.length ; i ++)
    {
        for( var j = 0 ; j <alineacion[i] ; j++)
        {

        }
    }
}
