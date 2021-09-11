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

 // CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
  origin: true,
});
 // [END import]
 
 // [START addMessage]
 // Take the text parameter passed to this HTTP endpoint and insert it into the
 // Realtime Database under the path /messages/:pushId/original
 // [START addMessageTrigger]
//  exports.addMessage = functions.https.onRequest(async (req, res) => {
//  // [END addMessageTrigger]
//    // Grab the text parameter.
//    const original = req.query.text;
//    // [START adminSdkPush]
//    // Push the new message into the Realtime Database using the Firebase Admin SDK.
//    const snapshot = await admin.database().ref('/messages').push({original: original});
//    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//    res.redirect(303, snapshot.ref.toString());
//    // [END adminSdkPush]
//  });
//  // [END addMessage]
 
 // Listens for new trips added to /trips and creates and
 // updates the users data accordingly
 exports.saveTrip = functions.database.ref('/trip/{pushId}')
     .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const d = new Date(snapshot.val().created);
        const consumption = snapshot.val().tripConsumption;
        const dBalance = consumption * (-1);
        const mileage = snapshot.val().mileage;
        const userID = snapshot.val().uid
        functions.logger.log('New trip', context.params.pushId);
        functions.logger.log('created', d);

        // add consumption to history
        admin.database().ref('/users/' + userID).child('/history')
          .push({
            'type': 'trip',
            'amount': dBalance, 
            'created': snapshot.val().created, 
            'avgConsumption': snapshot.val().avgConsumption
        });
       
        // Update user balance, total mileage and total consumption       
        const balancePromise = admin.database().ref('/users/' + userID + '/balance').once('value');
        const totalMileagePromise = admin.database().ref('/users/' + userID + '/totalMileage').once('value');
        const totalConsumptionPromise = admin.database().ref('/users/' + userID + '/totalConsumption').once('value');

        return Promise.all([balancePromise, totalMileagePromise, totalConsumptionPromise]).then(results => {
          const balance = results[0].val();
          functions.logger.log('Balance:', (balance + dBalance));
          const totalMileage = results[1].val();
          functions.logger.log('Total mileage:', (totalMileage + mileage));
          const totalConsumption = results[2].val();
          functions.logger.log('Total consumption:', (totalConsumption + consumption));

          // Update database
          admin.database().ref('/users/' + userID + '/balance').set(Math.round((balance + dBalance + Number.EPSILON) * 100) / 100);
          admin.database().ref('/users/' + userID + '/totalmileage').set(Math.round((totalMileage + mileage + Number.EPSILON) * 100) / 100);
          admin.database().ref('/users/' + userID + '/totalConsumption').set(Math.round((totalConsumption + consumption + Number.EPSILON) * 100) / 100);

        });
     });

// Listens for new refills added to /refill and creates and
// updates the users data accordingly
 exports.saveRefill = functions.database.ref('/refill/{pushId}')
     .onCreate((snapshot, context) => {
       // Grab the current value of what was written to the Realtime Database.
       const d = new Date(snapshot.val().created);
       const refillAmount = snapshot.val().refillAmount;
       const userID = snapshot.val().uid
       functions.logger.log('New refill', context.params.pushId, refillAmount);
       functions.logger.log('created', d);

       var user = admin.database().ref('/users/' + userID);

       // add consumption to history
       const snap = user.child('/history').push({'type': 'refill','amount': refillAmount, 'created': snapshot.val().created});
       
       // Update user balance and total refilled
      //  var value = user.child('/balance').on('value', (snap) => {
      //    if (typeof snap.val() !== 'undefined' || snap.val() !== null) {
      //      balance = snap.val()
      //    };
      //   });
      const balancePromise = admin.database().ref('/users/' + userID + '/balance').once('value');
      const totalRefillPromise = admin.database().ref('/users/' + userID + '/totalRefilled').once('value');
       // Update database
      return Promise.all([balancePromise, totalRefillPromise]).then(results => {
         const balance = results[0].val();
         functions.logger.log('Balance:', (balance + refillAmount));
         const totalRefill = results[1].val();
         functions.logger.log('Total refill:', (totalRefill + refillAmount));

        //  update database
        admin.database().ref('/users/' + userID + '/balance').set(Math.round((balance + refillAmount + Number.EPSILON) * 100) / 100);
        admin.database().ref('/users/' + userID + '/totalRefilled').set(Math.round((totalRefill + refillAmount + Number.EPSILON) * 100) / 100);
       })
     });

  exports.history = functions.https.onRequest((req, res) => {
    if (req.method === 'GET') {
      cors(req, res, () => {
        // [END usingMiddleware]
        // Reading date format from URL query parameter.
        // [START readQueryParam]
        let format = req.body;
        // [END readQueryParam]
        // Reading date format from request body query parameter
        if (!format) {
          // [START readBodyParam]
          format = req.body.format;
          // [END readBodyParam]
        }
        // [START sendResponse]
        const formattedDate = moment().format(`${format}`);
        functions.logger.log('Sending Formatted date:', formattedDate);
        res.status(200).send(formattedDate);
        // [END sendResponse]
      });
      // Grab the current value of what was written to the Realtime Database.
      const userID = data.uid
      const historyPromise = admin.database().ref('/users/' + userID + '/history').once('value');
    }
    else 
    {
      res.status(403).send('Forbidden!');
      return;
    }
  

    });
