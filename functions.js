import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';


export const setBalance = () => {
    console.log("balanssia!!!!!!!!!!")

}

// 1. Toimii  https://stackoverflow.com/questions/49830415/access-function-return-values-with-firebase-database
export const getFirebaseData = async () => {
    return firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid)
        .once('value')
        .then(function(snapshot) {
            return (snapshot.val())
        })
}
// 2. Toimii  https://stackoverflow.com/questions/54963700/how-to-get-value-instead-of-promise-from-firebase
export const getFirebaseData2 = async () => {
    const data = await firebase
        .database()
        .ref('/users/' + firebase.auth().currentUser.uid)
        .once('value')

    return data.val()
}

export const getStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@userData')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
     } catch (error) {
        console.log(error)
     }
}