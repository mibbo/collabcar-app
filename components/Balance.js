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
            <View>
                <Text style={{ fontSize: 20, fontWeight: "100", fontFamily: "", color: "white" }}>Balance</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{ fontSize: 20, fontFamily: "", color: "white" }}></Text>
                    </View>
            </View>
        )
    }
}

export default Balance
