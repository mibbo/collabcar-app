import React, { Component, TouchableOpacity} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Platform,
    Button
} from 'react-native';

import { DrawerItems, DrawerNavigatorItems } from 'react-navigation-drawer';
import colors from '../assets/colors';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton'
import firebase from 'firebase';

class CustomDrawerNavigator extends Component {
    render() {
        return (
            <ScrollView>
                <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
                <View
                    style={{
                        height: 150,
                        backgroundColor: colors.bgMain,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: Platform.OS == 'android' ? 20 : 0
                    }}
                >
                    <Ionicons name="ios-car" size={100} color={colors.logoColor} />
                    <Text style={{ fontSize: 24, color: 'white', fontWeight: '100', marginBottom: 20 }}>
                        CollabCar
                    </Text>
                </View>
                <DrawerNavigatorItems {...this.props} />
            </ScrollView>
            
        );
    }
}
export default CustomDrawerNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
