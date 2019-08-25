'use strict'
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config.json');
const bot = new TelegramBot(config.token, {polling: true});
// Library to manage images
var Jimp = require("jimp");
var tools = require('./line_ups.js');
// Asynchronous calls
var Waterfall = require('async-waterfall');
var picLink = "http://images.all-free-download.com/images/graphiclarge/soccer_field_311115.jpg";
var alineacionWithNames = [];
var counter; //counter for the 11 players
var storeNames = false; 
var goalkeeperImage = "Images/goalkeeper.jpg"; 
var goalkeeperImagetoPrint = goalkeeperImage;
let loadedImage;
let imageLoaded ;
const imagesToPrint = ["Images/goalkeeper.jpg","Images/4_defenders.png","Images/3_midfilders.png","Images/3_attackers.png"];
const midfildersImages = ["Images/3_midfilders.png"];
var createImage = [];
var alineacionInMessage;
var defendersNumber;
var midfildersNumber;
var attackersNumber;


//get all the images into the array
for(let i=0; i< imagesToPrint.length; i++)
{
    createImage.push(Jimp.read(imagesToPrint[i]));
}

bot.onText(/\/start/, (msg) => {
    //Restart the array with the line up
   alineacionWithNames = []; counter = 11; 
    bot.sendMessage(msg.chat.id, "Welcome to the football line up creator!", {
    "reply_markup": {
        "keyboard": [["/getplayers"],["/4_3_3"],["/printlineup"],["/test"]],
        "resize_keyboard" : true,
        "one_time_keyboard" : true
        }
    });
    bot.sendMessage(msg.chat.id,"Por favor eliga una alineacion:");  

});

 bot.onText(/\/4_3_3/, (msg) => {
    let chatId = msg.chat.id
    bot.sendMessage(chatId,"Por favor introduzca los nombres en el orden indicado en la imagen")
        .then(() => {
            return bot.sendPhoto(chatId,"Images/"+getLastMessage(msg).substring(1)+"_numbers.png")
        })
        .then(() => {
            alineacionInMessage = getLastMessage(msg).substring(1);
            return bot.sendMessage(chatId,"Haga click en el mensaje  para continuar");
        })
        .then(() => {
            return bot.sendMessage(chatId,"/getplayers");
        })
        .then(() => {
            joinImages(getLastMessage(msg).substring(1));
            console.log("alineacion: "+ alineacionInMessage);
            msgToVariables(alineacionInMessage);
        })
        .catch((err) => {
            console.error(err)
        });
});

bot.onText(/\/printlineup/, (msg) => {
    let chatId = msg.chat.id
    for (let index = 0; index < alineacionWithNames.length; index++) 
    {
        bot.sendMessage(chatId, alineacionWithNames[index])
            .catch((err) => {
                console.error(err)
            })
    }
});

bot.onText(/\/getplayers/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
    storeNames = true;
});


bot.onText(/\/test/, (msg) => {  
    bot.sendMessage(msg.chat.id, "Por favor introduzca el nombre de los futbolistas (1 nombre por mensaje)");
    printGoalkeeperNameOnImage("juan", 75,222);
});

//Gets the name of the players
bot.on('message', (msg) => {
    const notCommand = "/";
    const chatId = msg.chat.id;
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
            bot.sendMessage(chatId, "Alineacion completa!")
                .then(() => {
                    tools.data.addCoordinatesDefenders(defendersNumber);
                    tools.data.addCoordinatesMidfilders(midfildersNumber);
                    tools.data.addCoordinatesAttackers(attackersNumber);
                    counter --;
                    let aux1 = tools.data.getFullXArray();
                    let aux2 = tools.data.getFullYArray();
                    printNamesOnImage(aux1,aux2,msg);
                })
                .catch((err) => {
                    console.error(err)
                })
        }
        else if (counter === 0)
        {
            bot.sendMessage(chatId, "Alineacion completa!");
        }
});

function getLastMessage(msg){
    return msg.text;
}


// Jimp function that prints the name of the goalkeeper
function printGoalkeeperNameOnImage(testName,x,y){
    for (let index = 0; index < 120; index+=40) { 

        Jimp.read(goalkeeperImagetoPrint)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, x + index, y, testName)
                       .write(goalkeeperImagetoPrint);
        })
        .catch(function (err) {
            console.error(err);
        });
    }

    
}

function joinImages()
{
    Promise.all(createImage).then(function(data){
        return Promise.all(createImage);
    }).then(function(data){
        data[0].composite(data[1],0,0);
        data[0].composite(data[2],0,0);
        data[0].composite(data[3],0,0);
        data[0].write("Images/fullImage.jpg");
        imageLoaded = "Images/fullImage.jpg";
    });
}

function printNamesOnImage( fullXArray , fullYArray , msg){

     for (let index = 0; index < fullXArray.length; index++)
    {
        let cordX = fullXArray[index];
        console.log("Coordinate X:", cordX);
        let cordY = fullYArray[index];
        console.log("Coordinate Y:", cordY);
        let nameToPrint = alineacionWithNames[index].toString();
        console.log("Name to print:", nameToPrint);

        Jimp.read(imageLoaded)
        .then(function (image) {
            loadedImage = image;
            return Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        })
        .then(function (font) {
            loadedImage.print(font, cordX, cordY, nameToPrint)
                       .write("Images/fullImage.jpg");
        })
        .catch(function (err) {
            console.error(err);
        });
    }
    bot.sendPhoto(msg.chat.id, imageLoaded);
}

//Store lineup chosen into an Array
function msgToVariables(messageToVariables)
{
    defendersNumber = messageToVariables.substring(0,1);
    midfildersNumber = messageToVariables.substring(2,3);
    attackersNumber = messageToVariables.substring(4,5);
}