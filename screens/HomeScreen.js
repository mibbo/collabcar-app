import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView } from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton'
import colors from '../assets/colors'
import MileageModal from '../components/MileageModal'
import RefillModal from '../components/RefillModal'
import Balance from '../components/Balance';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component {

   constructor(props) {
      super(props);
      this.state = {
         showMileage: false,
         fullName: '',
         email: '',
         profilePicture: {}
      };
   }

   // componentDidMount() {
   //    this.checkIfLoggedIn();
   // }

   // getData = async () => {
   //    try {
   //       const jsonValue = await AsyncStorage.getItem('@userData')
   //       return jsonValue != null ? JSON.parse(jsonValue) : null;
   //    } catch (error) {
   //       console.log(error)
   //    }
   //    console.log('Done.')
   // }

   // // tätä pitää viä funtsii, että tarviiko tsekata aina homescreenissä. Mutta jos ei tsekata niin sitten pitää olla 100% varma, että kirjautumisen credentiaalit ei katoo mihinkään.
   // checkIfLoggedIn = async () => {
   //    firebase.auth().onAuthStateChanged(
   //       async function (user) {
   //          console.log('HomeScreen: AUTH STATE CHANGED CALLED ')
   //          if (user) {
   //             console.log('HomeScreen: User connected');
   //             console.log('HomeScreen: userData AsyncStoragesta HomeScreenin stateihin')
   //             var storageUserData = await this.getData();
   //             console.log(storageUserData);
   //             this.setState({
   //                fullName: storageUserData.fullName,
   //                email: storageUserData.email,
   //                picture: storageUserData.profilePicture
   //             })
   //             // Eli tää ei toimi sen takia, koska se yrittää päivittää ProfileScreenin stateja, mutta koska appi on vasta käynnistetty ja ProfileScreen on UnMounted tilassa eli sen stateja ei voi päivittää
   //             // elikkäselikkäs pitää miettiä joku muu ratkasu tälle globaalihommalle, tai ei ainakaan voida samallailla muitten komponenttien stateja muutella ihan millon halutaan
   //             // elieli niinkun Pauli sanois: pelataan sitä omaa peliä ei kavereitten peliä
   //             // GLOBAL.profileScreen.setState({
   //             //    full_name: user.displayName,
   //             //    gmail: user.email,
   //             //    profile_picture: { uri: user.photoURL }
   //             // });
   //          } else {
   //             console.log('HomeScreen: User not connected --> switching to LoginScreen');
   //             this.props.navigation.navigate('LoginScreen');
   //          }
   //       }.bind(this)
   //    );
   // };

   toggleManualMileage = () => {
      this.setState({ showMileage: !this.state.showMileage });
   }

   render() {
      return (
         <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
            <View
               style={{
                  flex: 1,
                  borderColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
               }}
            >
               
               <View style={{
                  backgroundColor: 'white',
                  borderRadius: 12,
                  width: 350,
                  height:100,
                  marginBottom: 20
                  }}>
                  {/* Balance */}
                  <Balance></Balance>
               </View>


               {/* Mileage */}
               <MileageModal></MileageModal>


               {/* Refill */}
               <RefillModal></RefillModal>

               <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgFailure,
                     borderWidth: 0.5,
                     borderColor: colors.bgFailure,
                     margin: 5,
                  }}
                  title="Login in"
                  onPress={() => firebase.auth().signOut()}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Sign Out</Text>
               </CustomButton>

               {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Feed Screen</Text>
                  <Button
                     title="Open drawer"
                     onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                  />
                  <Button
                     title="Toggle drawer"
                     onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                  />
               </View> */}

               {/* <CustomButton
                  style={{
                     width: 200,
                     backgroundColor: colors.bgPrimary,
                     borderWidth: 0.5,
                     borderColor: colors.bgError,
                     margin: 5,
                  }}
                  title="Profile"
                  onPress={() => this.props.navigation.navigate("ProfileScreen")}
               >
                  <Text style={{ fontWeight: "100", fontFamily: "", color: "white" }}>Profile</Text>
               </CustomButton> */}


               {/* <CustomButton
                  position='top-left'
                  style={{
                     width: 20,
                     backgroundColor: "black",
                     borderWidth: 0.5,
                     borderColor: colors.bgError,
                  }}
                  title="!"
                  onPress={() => this.props.navigation.navigate("LoginScreen")}
               >
                  <Text style={{ fontWeight: "100", color: "white" }}>!</Text>
               </CustomButton> */}
            </View>
            <Text>HomeScreen</Text>

         </View>
      )
   }
}
export default HomeScreen;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   }
});