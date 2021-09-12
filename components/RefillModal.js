import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView } from 'react-native';
import firebase from 'firebase';
import CustomButton from './CustomButton'
import Modal from 'react-native-modal';
import { theme, fonts, padding, dimensions } from '../styles.js'

class RefillModal extends Component {

   constructor(props) {
      super(props);
      this.state = {
         refill: '',
         isVisible: false
      };
   }

   toggleRefillModal = () => {
      this.setState({ isVisible: !this.state.isVisible })
   }

   sendRefill = () => {
      firebase
         .database()
         .ref('/refill/')
         .push()
         .set({
            uid: firebase.auth().currentUser.uid,
            refillAmount: parseFloat(this.state.refill),
            created: Date.now()
         })
         .then(result => {
            console.log("Successfully sent refill!", result)
            this.setState(() => ({ successMessage: "Succesfully sent refill" }));
         })
         .catch(err => {
            console.log(err)
            this.setState(() => ({ valueError: "Sending refill failed: " + err }));
         })
   }

   handleRefillChange = (refill) => {
      this.setState({ refill: refill })
   }

   emptyInputs = () => {
      this.setState({ refill: '' })
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

         <View style={{ marginBottom: 50 }}>

            <Modal
               transpartent={true}
               coverScreen={true}
               style={styles.modal}
               isVisible={this.state.isVisible}
               onBackdropPress={this.toggleRefillModal}
               hideModalContentWhileAnimating={false}>

               <View style={styles.container}>
                  <View style={{ width: 250 }}>
                     <Text style={styles.title}>Refill amount</Text>
                     <TextInput
                        style={{ backgroundColor: '#454F63', color: 'gray', height: 50, paddingLeft: 10, fontSize: theme.textVariants.body.fontSize, marginBottom: 10, marginTop: 10, borderRadius: 8 }}
                        placeholder="Enter amount"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        value={this.state.mileage}
                        onChangeText={this.handleRefillChange}
                     >
                     </TextInput>
                  </View>

                  <View style={{ flexDirection: 'row', marginTop: 50 }}>
                     <CustomButton
                        style={styles.cancelButton}
                        title="Cancel"
                        onPress={this.toggleRefillModal}
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
               onPress={this.toggleRefillModal}
            >
               <Text style={styles.title}>Add refill</Text>
            </CustomButton>
         </View>
      );
   }
}

export default RefillModal;

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