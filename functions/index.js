const Telegraf = require('telegraf');
const functions = require('firebase-functions');

const bot = new Telegraf('518691232:AAGa8l0fTzvMNHcUhMdLc7rznPrj6JQRZsc');

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

exports.bot = functions.https.onRequest((req, res) => {
    return bot.handleUpdate(req.body, res);
    // return res.send("Hello from Alineacion bot!");
})