import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerComponent from './components/CustomDrawerComponent';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import colors from './assets/colors';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LogBox } from 'react-native';

// poistaa turhat keltaset warningit
LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Deprecated: Native Google Sign-In has been mov']);

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }
  render() {
    return <AppContainer />
  }
}

//estää pahimmat välähdykset
const noFlash = ({ current: { progress } }) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  },
  overlayStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    }),
  },
});


const HomeStackNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  ProfileScreen: {
    screen: ProfileScreen,
    navigationOptions: {
      // cardStyleInterpolator: forFade,
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.bgPrimary },
      cardStyle: { backgroundColor: 'transparent' },
      cardStyleInterpolator: noFlash
    }
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      // cardStyleInterpolator: forFade,
      headerTintColor: 'white',
      headerStyle: { backgroundColor: colors.bgPrimary },
      cardStyle: { backgroundColor: 'transparent' },
      cardStyleInterpolator: noFlash
    }
  }
});


const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: {
        title: 'Home',
        drawerIcon: () => <Ionicons name="ios-home" size={24} />
      }
    },
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'Profile',
        drawerIcon: () => <FontAwesome5 name="user" size={24} color="black" />
      }
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />
      }
    }
  },
  {
    contentComponent: CustomDrawerComponent
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  AppDrawerNavigator
})


const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;

