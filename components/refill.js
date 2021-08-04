import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView} from 'react-native';
import firebase from 'firebase';
import CustomButton from './CustomButton'
import colors from '../assets/colors'
import GLOBAL from './global.js'

class Refill extends Component {

   constructor(props) {
      super(props);
      this.state = {
         refill: '',
      };
   }

   
  
   sendRefill = () => {
      firebase
         .database()
         .ref('/refill/')
         .push()
         .set({
            uid: firebase.auth().currentUser.uid,
            refillAmount: this.state.refill,
            created: Date.now()
         })
         .then(result => {
            console.log("Successfully sent refill!", result)
            this.setState(() => ({ successMessage: "Succesfully sent refill"}));
         })
         .catch(err => {
            console.log(err)
            this.setState(() => ({ valueError: "Sending refill failed: " + err}));
         })
   }

   handleRefillChange = (refill) => {
      this.setState({refill: refill})
   }

   emptyInputs = () => {
      this.setState({refill: ''})
   }

   handleSubmit = () => {
      if (this.state.refill.trim() === "") {
         this.setState(() => ({ valueError: "Value is required" }));

      } else {
         this.setState(() => ({ valueError: null }));
         this.sendRefill();
         this.emptyInputs();
      }
   }


    render() {
        return (

            <View style={{paddingBottom: 100}}>
            <Text style={{color: 'white', fontSize: 25}}>Refill</Text>
            <TextInput
               style={{}}
               placeholder="Enter refill amount"
               placeholderTextColor="gray"
               keyboardType="numeric"
               value={this.state.consumption}
               onChangeText={this.handleRefillChange}
               >
            </TextInput>
            <CustomButton   
               style={{
                  width: 200,
                  marginTop: 20,
                  backgroundColor: colors.bgPrimary,
                  borderWidth: 0.5,
                  borderColor: colors.bgError,
               }}
               title="Submit"
               onPress={this.handleSubmit}
            >
            <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Submit</Text>
            </CustomButton>

            {!!this.state.valueError && (
            <Text style={{ color: "red" }}>{this.state.valueError}</Text>
            )}

            {!!this.state.successMessage && (
            <Text style={{ color: "green" }}>{this.state.successMessage}</Text>
            )}             

         </View>
        );
    }
}

export default Refill;
