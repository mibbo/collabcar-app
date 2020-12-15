import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';

class LoginScreen extends Component {

   signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            behavior: 'web',
            androidClientId: '258768037462-5i5oeq9l458tqdng0kjn9s1v3vtac0s3.apps.googleusercontent.com',
            iosClientId: '258768037462-ggntq49j42dorockmtj3ueu3mbvc6o69.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
         });

         if (result.type === 'success') {
            console.log("USER: " + result.user);
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
         <View style={styles.container}>
            <Button
               title="Sign In With Google"
               onPress={() => this.signInWithGoogleAsync()}
            />
         </View>
      );
   }
}
export default LoginScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});