import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import colors from '../assets/colors'
import CustomButton from '../components/CustomButton'

class ProfileScreen extends Component {
   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 200, marginHorizontal: 40, backgroundColor: colors.bgGoogle }}>
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
export default ProfileScreen;