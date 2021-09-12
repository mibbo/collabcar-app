import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback} from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import Modal from 'react-native-modal';
import {theme, fonts, padding, dimensions} from '../styles.js'

class Mileage extends Component {

    constructor(props) {
        super(props);
        this.state = {
           mileage: null,
           avgConsumption: 0,
           tripConsumption: 0,
           isVisible: false,
           isCalculated: false
        };
      }
      
    toggleMileageModal = () => {
        this.emptyInputs()
        this.setState({isVisible: !this.state.isVisible})
    }

    calcTripConsumption = () => {
        let trip_consumption = parseFloat((this.state.mileage * (this.state.avgConsumption / 100)).toFixed(2))
        //console.log(parseFloat(trip_consumption.toFixed(2)))
        this.setState({tripConsumption: trip_consumption, isCalculated: true})

        console.log(typeof(this.state.tripConsumption))
    }

    sendMileage = () => {
        firebase
           .database()
           .ref('/trip/')
           .push()
           .set({
              uid: firebase.auth().currentUser.uid,
              mileage: parseFloat(this.state.mileage),
              avgConsumption: parseFloat(this.state.avgConsumption),
              tripConsumption: this.state.tripConsumption,
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
        if (mileage === '') {
            this.setState({
                avgConsumption: '',
                tripConsumption: 0,
                isCalculated: false
            })
        }
        this.setState({mileage: mileage})

        //this.calcTripConsumption()
     }
  
     handleConsumptionChange = (avgConsumption) => {
        if (avgConsumption === '') {
            this.setState({
                tripConsumption: 0,
                isCalculated: false
            })
        }
        this.setState({avgConsumption: avgConsumption})
        //this.calcTripConsumption()
     }
  
     emptyInputs = () => {
        this.setState({
            avgConsumption: '',
            mileage: '',
            tripConsumption: 0,
            isCalculated: false
        })
     }
  
     handleSubmit = () => {
        if (this.state.mileage.trim() === "" || this.state.avgConsumption.trim() === "") {
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
                
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={{width: 250}}>
                        <Text style={styles.title}>Mileage</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter mileage"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            value={this.state.mileage}
                            onChangeText={this.handleMileageChange}
                            onSubmitEditing={() => {
                                if (this.state.mileage !== '')
                                    this.secondTextInput.focus();
                            }}
                            blurOnSubmit={false}
                            >
                        </TextInput>

                        <Text style={styles.title}>Consumption</Text>
                        <TextInput
                            style={!this.state.mileage ? {...styles.input, ...styles.disabled} : styles.input}
                            placeholder="Enter consumption"
                            placeholderTextColor="gray"
                            keyboardType="numeric"
                            value={this.state.avgConsumption}
                            editable={!this.state.mileage ? false : true}
                            ref={(input) => { this.secondTextInput = input; }}
                            onBlur={this.calcTripConsumption}
                            onChangeText={this.handleConsumptionChange}
                        >
                        </TextInput>
                    </View>

                    {/*Trip consumption*/}
                    <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Total</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 20, fontFamily: "", color: "white" }}>{this.state.tripConsumption}</Text>
                        <Text style={{ fontSize: 20, fontFamily: "", color: "white" }}> l</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30}}>
                        <CustomButton 
                        style={styles.cancelButton}
                        title="Cancel"
                        onPress={this.toggleMileageModal}
                        >
                        <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Cancel</Text>
                        </CustomButton>

                        <CustomButton   
                        style={!this.state.isCalculated ? {...styles.submitButton, ...styles.disabled} : styles.submitButton}
                        title="Submit"
                        onPress={this.handleSubmit}
                        disabled={!this.state.isCalculated ? true : false}
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
                </TouchableWithoutFeedback>
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
        height: 400,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.primary
    },
    disabled: {
        opacity: 0.3
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
    input: {
        backgroundColor: '#454F63',
        color: 'white',
        height: 50,
        paddingLeft: 10,
        fontSize: theme.textVariants.body.fontSize,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8
    },
    openModalButton: {
        borderRadius: 12,
        backgroundColor: theme.colors.mainBlue,
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