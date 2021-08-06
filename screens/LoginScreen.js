import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
// for standalone app
//import * as GoogleSignIn from 'expo-google-sign-in';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons'
import GLOBAL from '../global.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

class LoginScreen extends Component {

   constructor() {
      super();
      this.state = {
         gmail: '',
         profile_picture: {},
         first_name: '',
         last_name: ''
      }
      this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this);
      GLOBAL.profileScreen = this;
   }

   isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
         var providerData = firebaseUser.providerData;
         for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
               providerData[i].uid === googleUser.getBasicProfile().getId()) {
               // We don't need to reauth the Firebase connection.
               return true;
            }
         }
      }
      return false;
   }

   onSignIn = googleUser => {
      console.log('LoginScreen: GOOGLE USER');
      console.log('Google Auth Response', googleUser.user.name);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
         unsubscribe();
         // Check if we are already signed-in Firebase with the correct user.
         if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
               googleUser.idToken,
               googleUser.accessToken
            )
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
               //----------------lisätty itse---------------------------
               .then(function (result) {
                  console.log('user signed in');
                  if (result.additionalUserInfo.isNewUser) {
                     firebase
                        .database().ref('/users/' + result.user.uid)
                        .set({
                           gmail: result.user.email,
                           profile_picture: result.additionalUserInfo.profile.picture,
                           locale: result.additionalUserInfo.profile.locale,
                           // full_name: result.user.displayName,
                           first_name: result.additionalUserInfo.profile.given_name,
                           last_name: result.additionalUserInfo.profile.family_name,
                           created_at: Date.now()
                        })
                  } else {
                     firebase
                        .database().ref('/users/' + result.user.uid)
                        .update({
                           last_logged_in: Date.now()
                        })
                  }
                  // Save current user data into global
                  console.log('------------------------------------------------------------------------');
                  console.log('LoginScreen: TAVAARAA GLOBAALII');
                  console.log(result.user);
                  console.log('------------------------------------------------------------------------');

                  var userData = {
                     fullName: result.user.displayName,
                     email: result.user.email,
                     profilePicture: result.user.photoURL
                  }
                  const storeData = async (value) => {
                     try {
                        const jsonValue = JSON.stringify(value)
                        await AsyncStorage.setItem('@userData', jsonValue)
                     } catch (error) {
                        console.log(error);
                     }
                     console.log(`Succesfully added ${userData.fullName}'s data in asyncStorage.`);
                  }
                  storeData(userData)

                  console.log('----------------------------------------------');
                  console.log(result.user.photoURL);
                  console.log('----------------------------------------------');


                  GLOBAL.profileScreen.setState({
                     // first_name: result.additionalUserInfo.profile.given_name,
                     // last_name: result.additionalUserInfo.profile.family_name,
                     // gmail: result.user.email,
                     // profile_picture: {
                     //    uri: result.additionalUserInfo.profile.picture
                     // }
                     full_name: result.user.displayName,
                     gmail: result.user.email,
                     profile_picture: {
                        uri: result.user.photoURL
                     }
                  });
               })
               //---------------------------------------------------------
               .catch((error) => {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
               });
         } else {
            console.log('User already signed-in Firebase.');
         }
      });
   }

   signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId: '258768037462-5i5oeq9l458tqdng0kjn9s1v3vtac0s3.apps.googleusercontent.com',
            iosClientId: '258768037462-ggntq49j42dorockmtj3ueu3mbvc6o69.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
         });
         if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
         } else {
            return { cancelled: true };
         }
      } catch (e) {
         return { error: true };
      }
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View
               style={{
                  flex: 1,
                  marginTop: 150,
                  borderColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center'
               }}>
               <Ionicons name="ios-car" size={150} color={colors.logoColor} />
               <Text style={{ fontSize: 50, fontFamily: "", fontWeight: '100', color: 'white' }}>
                  CollabCar
                  </Text>
            </View>
            <View
               style={{ flex: 1, alignItems: 'center' }}>
               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: 'transparent',
                     borderWidth: 0.5,
                     borderColor: colors.bgGoogle
                  }}
                  onPress={() => this.signInWithGoogleAsync()}>
                  <Text style={{ fontWeight: '100', fontFamily: "", color: 'white' }}>Sign up with Google</Text>
               </CustomButton>
            </View>
         </View>
      );
   }
}
export default LoginScreen;
