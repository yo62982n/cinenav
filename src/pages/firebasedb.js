import React from 'react';
import firebase from 'firebase';

// firebase.initializeApp({
//     apiKey: "AIzaSyA4yGZO8B5skSEwrdB2AwwgaOjbMFOceZ8",
//     authDomain: "cinenav-65573.firebaseapp.com",
//     projectId: "cinenav-65573",
// });

// const db = firebase.firestore();

export function userRatings(userId) {
    firebase.initializeApp({
        apiKey: "AIzaSyA4yGZO8B5skSEwrdB2AwwgaOjbMFOceZ8",
        authDomain: "cinenav-65573.firebaseapp.com",
        projectId: "cinenav-65573",
    });
    
    const db = firebase.firestore();

    userId = 'LZqitbbtOkFY6NoJA5CS';
    db.collection('users')
        .doc(userId)
        .get()
        .then(snap => {
            return snap.data();
        })
        .catch((err) =>{
            return err;
        })
}

export function zz(){
    return "zzz";
}