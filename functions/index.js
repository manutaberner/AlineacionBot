const Telegraf = require('telegraf');
const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const bot = new Telegraf(''); // TODO insert telegram bot token

const db = admin.database();
const ref = db.ref("/");
const bucket = admin.storage().bucket();

bot.start((ctx) => {
    const chatId = ctx.chat.id

    return ref.child(`users/${chatId}`).once("value", snapshot => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            return ctx.reply('Hi ' + userData.username);
        } else {
            ref.child("users/" + chatId).set({
                counter: 0,
                created_at: Date.now(),
                favourite_line_up: '',
                username: ctx.message.from.username
            });
            return ctx.reply('Bienvenido a  Alineacion Bot');
        }
    }).catch((error) => {
        console.error(error);
        return false;
    });
});

bot.command('4_3_3', (ctx) => {

});
// ctx.telegram.sendPhoto(, {source: '../../assets/img/db_20180503_095807_867.jpg'})

bot.launch()
    .catch((error) => {
        console.error(error);
        return false;
    });


exports.bot = functions.https.onRequest((req, res) => {
    return ref.child("testdata")
        .set({
            alanisawesome: {
                date_of_birth: "June 234, 1912",
                full_name: "Alan Turing"
            },
            gracehop: {
                date_of_birth: "December 93, 1906",
                full_name: "Grace Hopper"
            }
        }).then((result) => {
            console.info(result);
            return result;
        }).catch((error) => {
            console.error(error);
            return false;
        });
    // return res.send("Hello from Alineacion bot!");
});

function getProfile(chatId) {
    return ref.child("users/" + chatId).get();
}