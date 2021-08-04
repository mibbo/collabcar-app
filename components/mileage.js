import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView} from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import colors from '../assets/colors'
import GLOBAL from '../components/global.js'

class Mileage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           mileage: '',
           consumption: ''
        };
      }
  
     sendMileage = () => {
        firebase
           .database()
           .ref('/data/')
           .push()
           .set({
              uid: firebase.auth().currentUser.uid,
              mileage: this.state.mileage,
              consumption: this.state.consumption,
              created: Date.now()
           })
           .then(result => {
              console.log("Successfully sent mileage!", result)
              this.setState(() => ({ successMessage: "Succesfully sent mileage"}));
           })
           .catch(err => {
              console.log(err)
              this.setState(() => ({ valueError: "Sending mileage failed: " + err}));
           })
     }
  
     handleMileageChange = (mileage) => {
        this.setState({mileage: mileage})
     }
  
     handleConsumptionChange = (consumption) => {
        this.setState({consumption: consumption})
     }
  
     emptyInputs = () => {
        this.setState({consumption: '', mileage: ''})
     }
  
     handleSubmit = () => {
        if (this.state.mileage.trim() === "" || this.state.consumption.trim() === "") {
           this.setState(() => ({ valueError: "Values are required" }));
  
         } else {
           this.setState(() => ({ valueError: null }));
           this.sendMileage();
           this.emptyInputs();
         }
     }


    render() {
        return (

            <View style={{paddingBottom: 100}}>
            <Text style={{color: 'white', fontSize: 25}}>Mileage</Text>
            <TextInput
               style={{}}
               placeholder="Enter mileage"
               placeholderTextColor="gray"
               keyboardType="numeric"
               value={this.state.mileage}
               onChangeText={this.handleMileageChange}
               >
            </TextInput>

            <Text style={{color: 'white', fontSize: 25}}>Consumption</Text>
            <TextInput
               style={{}}
               placeholder="Enter consumption"
               placeholderTextColor="gray"
               keyboardType="numeric"
               value={this.state.consumption}
               onChangeText={this.handleConsumptionChange}
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

export default Mileage;
