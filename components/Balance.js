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
            <View style={{}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
                    <Text style={
                        [styles.text,
                            {
                                borderWidth: 0,
                                flex: 1,
                                marginLeft: 20
                            }
                        ]}
                        >Balance
                    </Text>
                    <Text style={
                        [styles.text, 
                            {
                                marginRight: 20
                            }
                        ]}
                    >{this.state.balance}
                    </Text>
                </View>


                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}></Text>
                    </View>
            </View>
        )
    }
}

export default Balance

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "",
        color: theme.colors.mainBlue,
    }

})