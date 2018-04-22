'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
//library to manage images
var Jimp = require("jimp");
//library to manage asynchronity
var Waterfall = require('async-waterfall');
var picLink = "http://images.all-free-download.com/images/graphiclarge/soccer_field_311115.jpg";
var alineacionWithNames = [];
var counter;
var goalkeeperImage = "Images/goalkeeper.jpg"; 
var goalkeeperImagetoPrint = goalkeeperImage;
var goalkeeperPoint = [85,222];
var loadedImage;
var imagesToPrint = ["Images/goalkeeper.jpg","Images/4_defenders.jpg","Images/3_midfilders.jpg","Images/3_attackers.jpg"];
var jimps = [];


bot.onText(/\/start/, (msg) => {
    //Restart the array with the line up
   alineacionWithNames = []; counter = 11;
    bot.sendMessage(msg.chat.id, "Welcome to the football line up creator!", {
    "reply_markup": {
        "keyboard": [["/getplayers"],["/sendpic"],["/printlineup"],["/sendGoalkeeperPic"]],
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

 bot.onText(/\/test/, (msg) => {  
    console.log("Portero: "+alineacionWithNames[0]);
});

bot.onText(/\/sendGoalkeeperPic/, (msg) => {  
    //Check if the Array is empty 
    // if(alineacionWithNames.length==0)
    // {
    //     bot.sendMessage(msg.chat.id,"Please fill 1st the line up");
    // }
    //Llamar a la funcion de imprimir pasando nombre del portero como parametro, alineacionWithNames[0] y msg para poder imprimir el mensaje con la foto.
    printGoalkeeperNameOnImage("Jose Luis");
    bot.sendPhoto(msg.chat.id, goalkeeperImagetoPrint);
});
bot.onText(/\/printlineup/, (msg) => {
    //for()  each to print the line up
    // alineacionWithNames.forEach(element => {
    //     bot.sendMessage(msg.chat.id,alineacionWithNames[element]);
    // });
    for (let index = 0; index < alineacionWithNames.length; index++) 
    {
        bot.sendMessage(msg.chat.id,alineacionWithNames[index]);
    }
});

bot.on('message', (msg) => {
    var notCommand = "/";
    if (msg.text.toString().toLowerCase().includes(notCommand)) 
        {
            console.log("It's a command");
        } else if(counter > 0)
        {
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
    console.log("Guardo en variable:" +fullText);
    return fullText;
}


//get al the images into the array
for(var i=0; i< imagesToPrint.length; i++)
{
    jimps.push(Jimp.read(imagesToPrint[i]));
}

//Jimp fuction that prints the name of the goalkeeper
function printGoalkeeperNameOnImage(testName){
Jimp.read(goalkeeperImagetoPrint)
    .then(function (image) {
        loadedImage = image;
        return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
    })
    .then(function (font) {
        loadedImage.print(font, 75, 222, testName)
                   .write(goalkeeperImagetoPrint);
    })
    .catch(function (err) {
        console.error(err);
    });
    
}

function printMidfildersName()
{
    //first clone the image

}