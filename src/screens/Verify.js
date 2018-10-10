import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { AppColors } from '../styles/AppColors.js';
import CodeInput from 'react-native-confirmation-code-input';
import { IPServer } from '../Server/IPServer.js';

export default class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "ntd180295@gmail.com",
            password: "hahaha"
        }
    }

    _onFinishCheckingCode(code, user) {
        let body = {
            'code': code,
            'phoneNumber': user.phoneNumber,
            'userId': user._id
        }
        axios.post(IPServer.ip + '/register/verify', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response)
                this.props.navigation.navigate('LoginScreen');
            }).catch(err => {
                this.refs.toast.show('Code sai');
                console.log(err)
            })
        console.log(code)
    }

    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('user', 'NO-USER');
        return (
            <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}>
                <CodeInput
                    codeLength="4"
                    ref="codeInputRef2"
                    activeColor='rgba(49, 180, 4, 1)'
                    inactiveColor='rgba(49, 180, 4, 1.3)'
                    autoFocus={false}
                    ignoreCase={true}
                    inputPosition='center'
                    size={50}
                    onFulfill={(code) => this._onFinishCheckingCode(code, user)}
                    containerStyle={{ marginTop: 30 }}
                    codeInputStyle={{ borderWidth: 1.5 }}
                />
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    inputGroup: {
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "50%"
    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    containerText: {
        flexDirection: 'row',
    },
    logo: {
        marginTop: "50%",
        width: 100,
        height: 100
    },
    buttonGroup: {
        marginTop: "7%",
        marginLeft: "10%"
    },
    backgroundImage: {
        flex: 1
    },
    text: {
        color: "white",
        marginLeft: "6%",
        marginTop: "3%"
    }
});