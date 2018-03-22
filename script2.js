'use strict'
const TelegramBot = require('node-telegram-bot-api'); 
const token = '518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc';
const bot = new TelegramBot(token, {polling: true});
//Ahora no es necesario, crear alineacion directamente
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

/**
 * Logica: 
 * 1.Crear alineacion -> Variable alineacion 
 * 2.Definir defensas (3, 4 o 5) alineacion +=defensas- 
 * 3.Linea de de centrocampistas (1, 2 o 3)
 * 4. For (linea_de_centrocampistas > i) alineacion+= centrocampistas-
 * 5 Centrocampistas (1 a 5)
 * 6.Delanteros (1,2,3) alineacion+= delanteros
 * 7.Check sum = 10 return alineacion // else crear alineacion de nuevo
 * 8/setnombresenorden Nombre por linea-> guardar en Array 
 * 9 Rellenar huecos 
 * Ej 4-3-3
 *              Portero
 * Lateral  Central Central Lateral
 *      Centro   Centro  Centro
 * Delantero    Delantero   Delantero
 * 
 *              Remiro
 * Akapo    Jair    Pulido  Breznacic
 *      Aguilera    Melero  Sastre
 *      Gallar  Cucho   Ferreiro
 * 
 * 
 */
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

    
