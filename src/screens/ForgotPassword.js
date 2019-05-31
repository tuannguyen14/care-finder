import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import axios from 'axios';
import Toast from 'react-native-easy-toast';
import AwesomeButton from 'react-native-really-awesome-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import { IPServer } from '../Server/IPServer.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "tuan123@gmail.com",
            phoneNumber: "0902807067",
            spinner: false
        }
    }

    onSendSMS() {
        const body =
        {
            email: this.state.email,
            phoneNumber: this.state.phoneNumber
        };
        axios.post(IPServer.ip + '/user/password', body).then((response) => {
            this.props.navigation.navigate('VerifyScreen', { 'user': response.data, root: 'ForgotPassword' })
        }).catch(err => {
            this.refs.toast.show('Sai email!');
        });
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <TouchableOpacity onPress={() => goBack()}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%' }]}>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white' }} />
                            <Text style={{ fontFamily: 'Berkshireswash-Regular', color: 'white', fontSize: 26 }}>Quên mật khẩu</Text>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                        </View>
                        <View >
                            <Fumi
                                keyboardType="email-address"
                                style={styles.fumi}
                                label={'Email'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'mail'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                onChangeText={email => this.setState({ email })}
                            />

                            <Fumi
                                keyboardType="numeric"
                                style={styles.fumi}
                                label={'Số điện thoại'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'phone'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                        </View>

                        <AwesomeButton
                            style={{ marginBottom: '1.5%', marginTop: '6%' }}
                            width={width * 0.8}
                            backgroundColor={'white'}
                            borderRadius={7}
                            progress={this.state.buttonProgress}
                            onPress={() => this.onSendSMS()}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Gửi mã xác nhận</Text>
                        </AwesomeButton>
                    </View>
                    <Toast ref="toast" />
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.backgroundColor,
    },
    backButtonContainer: {
        margin: "5%"
    },
    containerLogo: {
        alignItems: 'center',
        marginBottom: '6%'
    },
    rowView: {
        flexDirection: 'row'
    },
    logo: {
        color: 'white',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 60
    },
    backgroundImage: {
        width: width,
        height: height
    },
    containerGender: {
        marginLeft: "10%",
        marginRight: "15%"
    },
    fumi: {
        width: width * 0.8,
        height: 70,
        marginTop: '5%',
        borderRadius: 100
    }
});