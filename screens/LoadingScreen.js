import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../firebase';
import GLOBAL from '../global'

class LoadingScreen extends Component {
   componentDidMount() {
      this.checkIfLoggedIn();
   }

   checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(
         function (user) {
            // Save current user data into global
            console.log('AUTH STATE CHANGED CALLED ')
            if (user) {
               console.log('------------------------------------------------------------------------------------------------------------------------');
               GLOBAL.profileScreen.setState({
                  first_name: user.additionalUserInfo.profile.given_name,
                  last_name: user.additionalUserInfo.profile.family_name,
                  gmail: user.user.email,
                  profile_picture: { uri: user.additionalUserInfo.profile.picture }
               });
               this.props.navigation.navigate('AppDrawerNavigator');
            } else {
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