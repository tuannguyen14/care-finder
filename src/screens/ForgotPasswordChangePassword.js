import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import AwesomeButton from 'react-native-really-awesome-button';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';

let { width, height } = Dimensions.get("window");

export default class ForgotPasswordChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.navigation.state.params.user,
            newPassword: "Admin123",
            confirmPassword: "Admin123",
            informationButton: false,
            passwordErrorMessage: false,
            informationErrorMessage: false
        };
    }

    onChangePassWord() {
        this.setState({ spinner: !this.state.spinner }, () => {
            let body = {
                idUser: this.state.user.userId,
                password: this.state.newPassword
            };
            console.log(body);
            if (this.state.newPassword === this.state.confirmPassword) {
                axios.put(IPServer.ip + '/user/forgotPassword/', body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        this.setState({
                            spinner: !this.state.spinner
                        }, () => {
                            this.props.navigation.replace('LoginScreen');
                        });
                    }).catch(err => {
                        this.setState({
                            spinner: !this.state.spinner
                        });
                    });
            } else {
                this.setState({
                    spinner: !this.state.spinner,
                    passwordErrorMessage: true
                });
            }
        });
    }

    render() {
        const { replace } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <TouchableOpacity onPress={() => replace('LoginScreen')}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%' }]}>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white', marginTop: '7%' }} />
                            <Text style={{ fontFamily: 'Berkshireswash-Regular', color: 'white', fontSize: 26, marginTop: '7%' }}>Đổi mật khẩu</Text>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                        </View>
                        <View>
                            {this.state.passwordErrorMessage ?
                                <Text style={{ color: 'red' }}>Mật khẩu không khớp!</Text>
                                : null
                            }
                        </View>
                        <View>
                            {/* <Fumi
                                style={styles.fumi}
                                label={'Mật khẩu cũ'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'lock'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                secureTextEntry
                                onChangeText={oldPassword => this.setState({ oldPassword })}
                            /> */}

                            <Fumi
                                style={styles.fumi}
                                label={'Mật khẩu mới'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'lock'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                secureTextEntry
                                onChangeText={newPassword => this.setState({ newPassword })}
                            />

                            <Fumi
                                style={styles.fumi}
                                label={'Xác nhận mật khẩu'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'lock'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                secureTextEntry
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                            />

                            <AwesomeButton
                                style={{ marginBottom: '1.5%', marginTop: '5%' }}
                                width={width * 0.8}
                                backgroundColor={'white'}
                                borderRadius={7}
                                progress={this.state.buttonProgress}
                                onPress={() => this.onChangePassWord()}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Xác nhận</Text>
                            </AwesomeButton>

                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
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
    fumi: {
        width: width * 0.8,
        height: 70,
        marginTop: '5%',
        borderRadius: 100
    }
});