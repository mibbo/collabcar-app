/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 'use strict';

 // [START all]
 // [START import]
 // The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
 const functions = require('firebase-functions');
 
 // The Firebase Admin SDK to access the Firebase Realtime Database.
 const admin = require('firebase-admin');
 admin.initializeApp();
 // [END import]
 
 // [START addMessage]
 // Take the text parameter passed to this HTTP endpoint and insert it into the
 // Realtime Database under the path /messages/:pushId/original
 // [START addMessageTrigger]
 exports.addMessage = functions.https.onRequest(async (req, res) => {
 // [END addMessageTrigger]
   // Grab the text parameter.
   const original = req.query.text;
   // [START adminSdkPush]
   // Push the new message into the Realtime Database using the Firebase Admin SDK.
   const snapshot = await admin.database().ref('/messages').push({original: original});
   // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
   res.redirect(303, snapshot.ref.toString());
   // [END adminSdkPush]
 });
 // [END addMessage]
 
 // Listens for new trips added to /trips and creates and
 // updates the users data accordingly
 exports.saveTrip = functions.database.ref('/trip/{pushId}')
     .onCreate((snapshot, context) => {
       // Grab the current value of what was written to the Realtime Database.
       var d = new Date(snapshot.val().created);
       var consumption = snapshot.val().tripConsumption;
       var dBalance = consumption * (-1);
       var mileage = snapshot.val().mileage;
       functions.logger.log('New trip', context.params.pushId);
       functions.logger.log('created', d);

       var user = admin.database().ref('/users/' + snapshot.val().uid);

       // add consumption to history
       const snap = user.child('/history').push({'type': 'trip','amount': dBalance, 'created': snapshot.val().created, 'avgConsumption': snapshot.val().avgConsumption});
       
       // Update user balance, total mileage and total consumption
       let balance = 0;
       let totalMileage = 0;
       let totalConsumption = 0;
       var value = user.child('/balance').on('value', (snap) => {
         if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
           balance = snap.val()
         };
        });
       value = user.child('/totalMileage').on('value', (snap) => {
         if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
           totalMileage = snap.val()
         };
       });
       value = user.child('/totalConsumption').on('value', (snap) => {
        if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
          totalConsumption = snap.val()
        };
      });
       // Update database
       user.child('/totalMileage').set(totalMileage + mileage);
       user.child('/totalConsumption').set(totalConsumption + consumption);
       return user.child('/balance').set(balance + dBalance);
     });

// Listens for new refills added to /refill and creates and
// updates the users data accordingly
 exports.saveRefill = functions.database.ref('/refill/{pushId}')
     .onCreate((snapshot, context) => {
       // Grab the current value of what was written to the Realtime Database.
       var d = new Date(snapshot.val().created);
       var refillAmount = snapshot.val().refillAmount;
       functions.logger.log('New refill', context.params.pushId, refillAmount);
       functions.logger.log('created', d);

       var user = admin.database().ref('/users/' + snapshot.val().uid);

       // add consumption to history
       const snap = user.child('/history').push({'type': 'refill','amount': refillAmount, 'created': snapshot.val().created});
       
       // Update user balance and total refilled
       let balance = 0;
       let totalRefilled = 0;
       var value = user.child('/balance').on('value', (snap) => {
         if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
           balance = snap.val()
         };
        });
       value = user.child('/totalRefilled').on('value', (snap) => {
         if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
          totalRefilled = snap.val()
         };
       });
       // Update database
       user.child('/totalRefilled').set(totalRefilled + refillAmount);
       return user.child('/balance').set(balance + refillAmount);
     });
