'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
var alineacion = []; 
var alineacionWithNames = [];
var messagesToSend = ["/setmidfielders","/setattackers"];
var lastMessageNumber; //used to get the last number sent
var lastMessage; //save the last number
var pointer = 0; //Pointer in the positions array
var goalkeeper = 1; //Number of names for the goalkeeper
var goalkeeperTurn = false;
var positionsInArray = [0,1,2,3]; //Array to use when asking for the players names
bot.onText(/\/start/, (msg) => {
    //Restart the array with the line up
    alineacion = [];
    alineacion.push(1); //Include the goolkepeer
    pointer=0;
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

//If the message has the word "Defensas" = Defenders
bot.on('message', (msg) => {
    
    var defenders = "defensas";
    var midfielders = "centrocampista";
    if (msg.text.toString().toLowerCase().includes(defenders)) {
        alineacion.push(getLastMessageNumber(msg));
        bot.sendMessage(msg.chat.id,"Haga click en el mensaje  para continuar");
        bot.sendMessage(msg.chat.id,"/setmidfielders"); 
    } 
    
    if (msg.text.toString().toLowerCase().includes(midfielders)) {
        alineacion.push(getLastMessageNumber(msg));
        fillLineUp(msg);
        } 
    });

function sendNextMessage(msg)
{
    //Return the 1st message that has to be send to make the lineup
    bot.sendMessage(msg.chat.id,messagesToSend[0]);
    //remove the element already sent
    messagesToSend.unshift();

}

function getLastMessageNumber(msg){
    var fullText = msg.text;
    //get the number of the to add to the Array
    lastMessageNumber = parseInt(fullText.substring(0,1),10);
    return lastMessageNumber;
}

function getLastMessage(msg){
    return msg.text;
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
    //getPlayerNames(msg);
    sendPlayerPosition(msg);
}


//Useless
function sendPlayerPosition(msg)
{
    
    switch (positionsInArray[pointer]) 
    {
        case (0) : 
        bot.sendMessage(msg.chat.id,"Introduce el nombre del Portero:");
        break;
        case(1) :
        bot.sendMessage(msg.chat.id,"Introduce el nombre del Defensa:");
        break;
        case(2) :
        bot.sendMessage(msg.chat.id,"Introduce el nombre del Centrocampista:");
        break;
        case(3):
        bot.sendMessage(msg.chat.id,"Introduce el nombre del Delantero:");
        break;
    }
    getPlayerNames(msg,pointer);
    
}

function getPlayerNames(msg,pointer)
{
    var counter = alineacion[pointer];
    var ended = false;
    goalkeeperTurn = true;
}

bot.on('message', (msg) => {
    
    //Goalkeeper
    if(goalkeeperTurn)
    {    
        alineacionWithNames.push(getLastMessage(msg));
        console.log(+"Dentro de bon on"+getLastMessage(msg));
    }
});