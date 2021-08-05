import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView} from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import colors from '../assets/colors'
import Mileage from '../components/Mileage'
import Refill from '../components/Refill'
import GLOBAL from '../global.js'

class HomeScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         showMileage: false,
      };
    }

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
                  <Text style={{color: 'white', marginBottom: 20}}>Balance: </Text>
               </View>

               {/* Mileage */}
               <Mileage></Mileage>


               {/* Refill */}
               <Refill></Refill>


               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgFailure,
                     borderWidth: 0.5,
                     borderColor: colors.bgFailure,
                     marginBottom: 10,
                  }}
                  title="Login in"
                  onPress={() => firebase.auth().signOut()}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Sign Out</Text>
               </CustomButton>
               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgPrimary,
                     borderWidth: 0.5,
                     borderColor: colors.bgError,
                  }}
                  title="Profile"
                  onPress={() => this.props.navigation.navigate("ProfileScreen")}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Profile</Text>
               </CustomButton>

               <CustomButton
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
               </CustomButton>
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