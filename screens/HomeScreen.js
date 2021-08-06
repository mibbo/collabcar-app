import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView } from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import colors from '../assets/colors'
import MileageModal from '../components/MileageModal'
import RefillModal from '../components/RefillModal'
import GLOBAL from '../global.js'

class HomeScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         showMileage: false,
      };
   }

   componentDidMount() {
      this.checkIfLoggedIn();
   }

   checkIfLoggedIn = () => {
      firebase.auth().onAuthStateChanged(
         function (user) {
            // Save current user data into global
            console.log('AUTH STATE CHANGED CALLED ')
            if (user) {
               console.log('------------------toimii------------------------------------------------');
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

   toggleManualMileage = () => {
      this.setState({ showMileage: !this.state.showMileage });
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View
               style={{
                  flex: 1,
                  borderColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >

               {/* Balance */}

               <Text>HomeScreen</Text>
               <View>
                  <Text style={{ color: 'white', marginBottom: 20 }}>Balance: </Text>
               </View>

               {/* Mileage */}
               <MileageModal></MileageModal>


               {/* Refill */}
               <RefillModal></RefillModal>

               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgFailure,
                     borderWidth: 0.5,
                     borderColor: colors.bgFailure,
                     margin: 5,
                  }}
                  title="Login in"
                  onPress={() => firebase.auth().signOut()}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Sign Out</Text>
               </CustomButton>


               {/* <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgPrimary,
                     borderWidth: 0.5,
                     borderColor: colors.bgError,
                     margin: 5,
                  }}
                  title="Profile"
                  onPress={() => this.props.navigation.navigate("ProfileScreen")}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Profile</Text>
               </CustomButton> */}


               {/* <CustomButton
                  position='top-left'
                  style={{
                     width: 20,
                     backgroundColor: "black",
                     borderWidth: 0.5,
                     borderColor: colors.bgError,
                  }}
                  title="!"
                  onPress={() => this.props.navigation.navigate("LoginScreen")}
               >
                  <Text style={{ fontWeight: "100", color: "white" }}>!</Text>
               </CustomButton> */}
            </View>
            <Text>HomeScreen</Text>

         </View>
      )
   }
}
export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});