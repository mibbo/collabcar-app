import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView} from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import GLOBAL from '../components/global.js'
import Modal from 'react-native-modal';
import {theme, fonts, padding, dimensions} from '../styles.js'

class Mileage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           mileage: '',
           consumption: '',
           isVisible: false
        };
      }
      
    toggleMileageModal = () => {
        this.setState({isVisible: !this.state.isVisible})
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

        <View style={{marginBottom: 50}}>
            
            <Modal
                transpartent={true}
                coverScreen={true}
                style={styles.modal}
                isVisible={this.state.isVisible}
                onBackdropPress={this.toggleMileageModal}
                hideModalContentWhileAnimating={false}>

                <View style={styles.container}>
                    <Text style={styles.title}>Mileage</Text>
                    <TextInput
                        style={{}}
                        placeholder="Enter mileage"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={this.state.mileage}
                        onChangeText={this.handleMileageChange}
                        >
                    </TextInput>

                    <Text style={styles.title}>Consumption</Text>
                    <TextInput
                        style={{}}
                        placeholder="Enter consumption"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={this.state.consumption}
                        onChangeText={this.handleConsumptionChange}
                    >
                    </TextInput>

                    <View style={{flexDirection: 'row', marginTop: 50}}>
                        <CustomButton 
                        style={styles.cancelButton}
                        title="Cancel"
                        onPress={this.toggleMileageModal}
                        >
                        <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Cancel</Text>
                        </CustomButton>

                        <CustomButton   
                        style={styles.submitButton}
                        title="Submit"
                        onPress={this.handleSubmit}
                        >
                        <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Submit</Text>
                        </CustomButton>
                    </View>

                    {!!this.state.valueError && (
                    <Text style={{ color: "red" }}>{this.state.valueError}</Text>
                    )}

                    {!!this.state.successMessage && (
                    <Text style={{ color: "green" }}>{this.state.successMessage}</Text>
                    )}

                </View>
            </Modal>
            
            <CustomButton
                style={styles.openModalButton}
                title="Show modal"
                onPress={this.toggleMileageModal}
                
                >
                <Text style={styles.title}>Add new trip</Text>
                </CustomButton>
        </View>
        );
    }
}

export default Mileage;

const styles = StyleSheet.create({
    modal: {
        margin: 20,
        opacity: 0.95,
    },
    container: {
        borderRadius: 15,
        height: '50%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:theme.colors.primary
    },
    submitButton: {
        borderRadius: 12,
        backgroundColor: theme.colors.accept,
        opacity: 1,
        top: 5,
        left: 5,
        width: 124,
        height: 45,
        marginRight: 10
    },
    cancelButton: {
        borderRadius: 12,
        backgroundColor: theme.colors.cancel,
        opacity: 1,
        top: 5,
        left: 5,
        width: 124,
        height: 45,
        marginRight: 10
    },
    openModalButton: {
        borderRadius: 12,
        backgroundColor: theme.colors.secondary,
        opacity: 1,
        top: 5,
        left: 5,
        width: 300,
        height: 75,
        marginRight: 10
    },
    title: {
        fontFamily: theme.textVariants.header.fontFamily,
        color: theme.textVariants.header.color, 
        fontSize: theme.textVariants.header.fontSize,
        fontWeight: theme.textVariants.header.fontWeight,
        letterSpacing: theme.textVariants.header.letterSpacing
    }
 });