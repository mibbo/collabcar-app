import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

import * as firebase from 'firebase';
import { firebaseConfig } from './config';
import colors from './assets/colors';


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
      header: null,
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
  }
});

// const Stack = createStackNavigator();



// function MyStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={HomeScreen}
//         screenOptions={{
//           headerTintColor: 'black',
//           headerStyle: { backgroundColor: 'tomato' },
//         }}
//       />
//       <Stack.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ cardStyleInterpolator: forFade }}
//       />
//     </Stack.Navigator>
//   );
// }

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  HomeStackNavigator
})


const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;

