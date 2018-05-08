'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
//library to manage images
var Jimp = require("jimp");
var tools = require('./line_ups.js');
//library to manage asynchronity
var Waterfall = require('async-waterfall');
var picLink = "http://images.all-free-download.com/images/graphiclarge/soccer_field_311115.jpg";
var alineacionWithNames = [];
var counter; //counter for the 11 players
var storeNames = false; 
var goalkeeperImage = "Images/goalkeeper.jpg"; 
var goalkeeperImagetoPrint = goalkeeperImage;
var loadedImage;
var imagesToPrint = ["Images/goalkeeper.jpg","Images/4_defenders.png","Images/3_midfilders.png","Images/3_attackers.png"];
var midfildersImages = ["Images/3_midfilders.png"];
var createImage = [];
var alineacionInMessage;
var defendersNumber; var midfildersNumber; var attackersNumber;


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
        "keyboard": [["/getplayers"],["/4_3_3"],["/printlineup"]],
        "resize_keyboard" : true,
        "one_time_keyboard" : true
        }
    });
    bot.sendMessage(msg.chat.id,"Por favor eliga una alineacion:");  

});

 bot.onText(/\/4_3_3/, (msg) => {  
    bot.sendMessage(msg.chat.id,"Por favor introduzca los nombres en el orden indicado en la imagen")
    bot.sendPhoto(msg.chat.id,"Images/"+getLastMessage(msg).substring(1)+"_numbers.png");
    alineacionInMessage = getLastMessage(msg).substring(1);
    bot.sendMessage(msg.chat.id,"Haga click en el mensaje  para continuar");
    bot.sendMessage(msg.chat.id,"/getplayers"); 
    joinImages(getLastMessage(msg).substring(1));
    console.log("alineacion: "+ alineacionInMessage);
    msgToVariables(alineacionInMessage);
    
});

bot.onText(/\/printlineup/, (msg) => {
    for (let index = 0; index < alineacionWithNames.length; index++) 
    {
        bot.sendMessage(msg.chat.id,alineacionWithNames[index]);
    }
});

bot.onText(/\/getplayers/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
    storeNames = true;
});

//Gets the name of the players
bot.on('message', (msg) => {
    var notCommand = "/";
    if (msg.text.toString().toLowerCase().includes(notCommand) && !storeNames) 
        {
            console.log("It's a command");
        } else if(counter > 1 && storeNames)
        {
            alineacionWithNames.push(getLastMessage(msg));
            counter --;
        }
        else if(counter === 1)
        {
            alineacionWithNames.push(getLastMessage(msg));
            storeNames = false;
            bot.sendMessage(msg.chat.id, "Alineacion completa!");
            tools.data.addCoordinatesDefenders(defendersNumber);
            tools.data.addCoordinatesMidfilders(midfildersNumber);
            tools.data.addCoordinatesAttackers(attackersNumber);
            counter --;
            let aux1 = tools.data.getFullXArray();
            let aux2 = tools.data.getFullYArray();
            printNamesOnImage(aux1,aux2,msg);

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

function joinImages()
{
    Promise.all(createImage).then(function(data){
        return Promise.all(createImage);
    }).then(function(data){
        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);
        data[0].write("Images/fullImage.png");
        loadedImage = "Images/fullImage.png";
    });
}

function printNamesOnImage( fullXArray , fullYArray , msg){

     for (let index = 0; index < fullXArray.length; index++) 
    {
        Jimp.read(loadedImage)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, fullXArray[index], fullYArray[index], alineacionWithNames[index].toString())
                       .write(loadedImage);
        })
        .catch(function (err) {
            console.error(err);
        });       
    }   
    bot.sendPhoto(msg.chat.id, loadedImage);
}

//Store lineup chosen into an Array
function msgToVariables(messageToVariables)
{
    defendersNumber = messageToVariables.substring(0,1);
    midfildersNumber = messageToVariables.substring(2,3);
    attackersNumber = messageToVariables.substring(4,5);
}