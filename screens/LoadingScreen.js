import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../firebase';

class LoadingScreen extends Component {
   componentDidMount() {
      this.checkIfLoggedIn();
   }

   checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(
         function (user) {
            console.log('LoadingScreen: AUTH STATE CHANGED CALLED ')
            if (user) {
               console.log('LoadingScreen: User connected --> switching to HomeScreen');
               this.props.navigation.navigate('AppDrawerNavigator');
               console.log('logaako tämän?');

            } else {
               console.log('LoadingScreen: User not connected --> switching to LoginScreen');
               this.props.navigation.navigate('LoginScreen');
            }
         }.bind(this)
      );
   };

   render() {
      return (
         <View style={styles.container}>
            <ActivityIndicator color="#000000" size="large" />
         </View>
      );
   }
}
export default LoadingScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});