import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import colors from '../assets/colors'
import CustomButton from '../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage';


class ProfileScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         fullName: '',
         email: '',
         // TODO: tutki tätä -> tää tarvii jonkun ei tyhjän stringin, muuten ulisee jotai
         profilePicture: 'https://lh3.googleusercontent.com/-CSnB1vmetB4/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmiGwUT4UDeEpmDnrSYsSaa5FrjKQ/s96-c/photo.jpg'
      };
   }

   useAsync(asyncFn, onSuccess) {
      useEffect(() => {
         let isActive = true;
         getData().then(data => {
            if (isActive) onSuccess(data);
         });
         return () => { isActive = false };
      }, [asyncFn, onSuccess]);
   }

   async componentDidMount() {
      console.log('ProfileScreen: Setting states');
      var storageUserData = this.useAsync();
      this.setState({
         fullName: storageUserData.fullName,
         email: storageUserData.email,
         profilePicture: storageUserData.profilePicture
      })
   }

   getData = async () => {
      try {
         const jsonValue = await AsyncStorage.getItem('@userData')
         return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (error) {
         console.log(error)
      }
      console.log('Done.')
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 200, marginHorizontal: 40, backgroundColor: colors.bgSecondaryBackground }}>
               <Text>Profile</Text>
               <Text>{this.state.fullName}</Text>
               <Text>{this.state.email}</Text>
               <Image source={{ uri: this.state.profilePicture }} style={{ height: 100, width: 100, resizeMode: 'stretch', margin: 5 }}></Image>
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

//gmail: result.user.email,
//profile_picture: result.additionalUserInfo.profile.picture,
//locale: result.additionalUserInfo.profile.locale,
//first_name: result.additionalUserInfo.profile.given_name,
//last_name: result.additionalUserInfo.profile.family_name,
//created_at: Date.now()