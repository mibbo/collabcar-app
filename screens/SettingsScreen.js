import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import colors from '../assets/colors'
import CustomButton from '../components/CustomButton'
import GLOBAL from '../components/global.js'



class SettingsScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
      };
   }


   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 200, marginHorizontal: 40, backgroundColor: colors.bgSecondaryBackground }}>
               <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Settings</Text>

               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgPrimary,
                     borderWidth: 0.5,
                     borderColor: colors.bgLogo,
                  }}
                  title="Back"
                  onPress={() => this.props.navigation.navigate("HomeScreen")}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Go back</Text>
               </CustomButton>
            </View>
         </View>
      );
   }
}
export default SettingsScreen;
