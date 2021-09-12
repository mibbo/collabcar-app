import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native'
import {theme} from '../styles'

class CustomInput extends Component {

   constructor(props) {
       super(props);
       this.state = {
         hasFocus: false,
         activeStyle: styles.customInput
       };   
   }

     onFocusChange = () => {
         this.setState({hasFocus: true, activeStyle: {...styles.customInput, ...styles.focused}})
      //this.calcTripConsumption()
     }

      onBlurChange = () => {
         if (this.props.onBlur) {
            this.props.onBlur()
         } 
         this.setState({hasFocus: false, activeStyle: styles.customInput})
      }

   render() {

      const {style, onBlur, inputRef, ...rest} = this.props;

      return (
         <View>
            <TextInput
               style={[this.state.activeStyle, style]}
               {...rest}
               onBlur={this.onBlurChange}
               onFocus={this.onFocusChange}
               ref={inputRef}
            >
            </TextInput>
         </View>
      );
   }
}

export default CustomInput

const styles = StyleSheet.create({
   customInput: {
      backgroundColor: '#454F63',
      color: 'white',
      height: 50,
      paddingLeft: 10,
      fontSize: theme.textVariants.body.fontSize,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 8
   },
   focused: {
      borderColor: theme.colors.accept,
      borderWidth: 3
   }
 });