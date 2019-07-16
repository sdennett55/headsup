const functions = require('firebase-functions');
const express = require('express');
var apiRouter = require('./routes');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
app.use(apiRouter);
// app.get('/timestamp', (request, response) => {
//   response.send(`${Date.now()}`);
// })

exports.app = functions.https.onRequest(app);