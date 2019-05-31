import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import { AppColors } from '../styles/AppColors.js';
import CodeInput from 'react-native-confirmation-code-input';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';

export default class Verify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            user: this.props.navigation.state.params.user,
            root: this.props.navigation.state.params.root,
            timer: 60
        }
    }

    componentWillMount() {
        this.clockCall = setInterval(() => {
            if (this.state.timer === 0) return clearInterval(this.clockCall)
            this.setState({ timer: this.state.timer - 1 });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.clockCall);
    }

    _onFinishCheckingCode(code) {
        Keyboard.dismiss
        if (this.state.root == 'Register') {
            let body = {
                'code': code,
                'phoneNumber': this.state.user.phoneNumber,
                'userId': this.state.user._id
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
                    this.refs.toast.show('Sai mã xác thực!');
                    console.log(err)
                })
        } else {
            let body = {
                'code': code,
                'phoneNumber': this.state.user.phoneNumber,
                'userId': this.state.user.userId
            }
            console.log(body);
            axios.post(IPServer.ip + '/user/verify', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    console.log(response)
                    this.props.navigation.navigate('ForgotPasswordChangePasswordScreen', { 'user': this.state.user });
                }).catch(err => {
                    this.refs.toast.show('Sai mã xác thực!');
                    console.log(err)
                })
        }
        console.log(code)
    }

    render() {
        const { navigation } = this.props;
        // const user = navigation.getParam('user', 'NO-USER');
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ backgroundColor: 'white', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 18, color: '#000', marginTop: '50%' }}>
                        {this.state.timer === 0 ? 'Gửi lại?' : 'Mã xác thực sẽ gửi trong ' + this.state.timer + 's'}
                    </Text>
                    <Text style={{ fontFamily: Font.textFont, fontSize: 23, fontWeight: 'bold' }}>Nhập mã xác thực</Text>
                    <CodeInput
                        codeLength="4"
                        ref="codeInputRef2"
                        activeColor='grey'
                        inactiveColor='grey'
                        autoFocus={false}
                        ignoreCase={true}
                        inputPosition='center'
                        size={50}
                        onFulfill={(code) => this._onFinishCheckingCode(code)}
                        containerStyle={{}}
                        codeInputStyle={{ borderWidth: 1.5, borderColor: AppColors.color }}
                    />
                    <Toast ref="toast" />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
});