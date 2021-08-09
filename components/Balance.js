import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, Keyboard, ScrollView} from 'react-native';
import firebase from 'firebase';
import {theme, fonts, padding, dimensions} from '../styles.js'

export class Balance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            balance: 0
        };
      }

    componentDidUpdate = () => {
        
    }

    render() {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 20, fontWeight: "600", fontFamily: "", color: theme.colors.mainBlue, borderWidth: 2, width: 300, marginTop: 20}}>Balance</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 20, fontFamily: "", color: "white" }}></Text>
                    </View>
            </View>
        )
    }
}

export default Balance
