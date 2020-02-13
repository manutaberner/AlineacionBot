const functions = require('firebase-functions');
// Connect to firebase
const firebase = require("firebase/app");
const auth = require("firebase/auth");
const firestore = require("firebase/firestore");
const admin = require("firebase-admin");
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "alineacion-bot",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};
const db = admin.database();
const ref = db.ref("server/saving-data/fireblog");
const usersRef = ref.child("users");

exports.bot = functions.https.onRequest((req, res) => {
    return usersRef.set({
        alanisawesome: {
            date_of_birth: "June 23, 1912",
            full_name: "Alan Turing"
        },
        gracehop: {
            date_of_birth: "December 9, 1906",
            full_name: "Grace Hopper"
        }
    }).then((result) => {
        console.info(result);
    }).catch((error) => {
        console.error(error);
    });
})