import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../firebase';

class LoadingScreen extends Component {
   componentDidMount() {
        firebase.auth().signOut();
   }

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