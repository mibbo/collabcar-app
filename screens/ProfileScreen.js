import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import firebase from 'firebase';
import colors from '../assets/colors'
import CustomButton from '../components/CustomButton'
import GLOBAL from '../components/global.js'



class ProfileScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         first_name: '',
         last_name: '',
         email:'',
         picture: {}
      };
    }

   //const [profile, setProfileData] = useState({})

   //componentDidMount = () => {
      //this.getCurrentUser()
      //console.log(GLOBAL.profileScreen)
   //} 

  /* getCurrentUser = () => {
      var user_id = firebase.auth().currentUser.uid
                     firebase
                     .database()
                     .ref('/users/' + user_id)
                     .once('value')
                     .then(snapshot => {
                        console.log(snapshot.val())
                        this.setState(prevState => ({
                           ...prevState,
                           first_name: snapshot.val().first_name,
                           picture: {uri: snapshot.val().profile_picture}
                        }));
                     })
                     
      //var name = userData.first_name
      //console.log("name:", name)
      //setProfileData({'name': name, 'email': email, 'photoUrl': photoUrl})
   } */

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: 200, marginHorizontal: 40, backgroundColor: colors.bgGoogle }}>
               <Text>Profile</Text>
               <Text>{GLOBAL.profileScreen.state.first_name + " " + GLOBAL.profileScreen.state.last_name}</Text>
               <Text>{GLOBAL.profileScreen.state.gmail}</Text>
               <Image source={GLOBAL.profileScreen.state.profile_picture} style = {{height: 100, width: 100, resizeMode : 'stretch', margin: 5 }}></Image>
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