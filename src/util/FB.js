const config = {
    apiKey: "AIzaSyA4yGZO8B5skSEwrdB2AwwgaOjbMFOceZ8",
    authDomain: "cinenav-65573.firebaseapp.com",
    databaseURL: "https://cinenav-65573.firebaseio.com",
    projectId: "cinenav-65573",
    storageBucket: "cinenav-65573.appspot.com",
    messagingSenderId: "843320942463",
    appId: "1:843320942463:web:36db3fd47edebc14e5444a"
}

var firebase = require("firebase");
firebase.initializeApp(config);
var database = firebase.firestore();
var auth = firebase.auth();


export { database, auth };