import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createSwitchNavigator } from 'f';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => <AppContainer />;

// const LoginStackNavigator = createStackNavigator({
//   // WelcomeScreen: {
//   //   screen: WelcomeScreen,
//   //   navigationOptions: {
//   //     header: null,
//   //   },
//   // }
//   // SignUpScreen,
// });

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  HomeScreen: HomeScreen,
  ProfileScreen: ProfileScreen
})


const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;

