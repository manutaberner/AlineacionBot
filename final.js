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
var imagesToPrint = ["Images/goalkeeper.jpg","Images/4_defenders.png","Images/3_midfilders.png","Images/3_attackers.png"];
var midfildersImages = ["Images/3_midfilders.png"];
var createImage = [];

//get all the images into the array
for(var i=0; i< imagesToPrint.length; i++)
{
    createImage.push(Jimp.read(imagesToPrint[i]));
}

bot.onText(/\/start/, (msg) => {
    //Restart the array with the line up
   alineacionWithNames = []; counter = 11;
    bot.sendMessage(msg.chat.id, "Welcome to the football line up creator!", {
    "reply_markup": {
        "keyboard": [["/getplayers"],["/4_3_3"],["/printlineup"],["/sendGoalkeeperPic"]],
        "resize_keyboard" : true,
        "one_time_keyboard" : true
        }
    });
    bot.sendMessage(msg.chat.id,"Please select a line up");
    joinImages();     
});

bot.onText(/\/getplayers/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
    //bot send image with numbers to show how to write them
    
});

 bot.onText(/\/4_3_3/, (msg) => {  
    console.log("Portero: "+alineacionWithNames[0]);
    bot.sendPhoto(msg.chat.id,"Images/fullImage.png");
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
    return fullText;
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

function printMidfildersName(midfildersNumber)
{
    //first clone the image

}

function printAttackersName(attackersNumber)
{

    //Change to suit the midfilders switch for each case
    for(var i = 0; i<attackersNumber; i++)
    {
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
}

function joinImages(){
Promise.all(createImage).then(function(data){
    return Promise.all(createImage);
}).then(function(data){
    data[0].composite(data[1],0,0);
    data[0].composite(data[2],0,0);
    data[0].composite(data[3],0,0);
    data[0].write("Images/fullImage.png");
});
}