import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, ImageBackground, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import axios from 'axios';
import Toast from 'react-native-easy-toast'
import LinearGradient from 'react-native-linear-gradient';
// import Register from './Register':
import AwesomeButton from 'react-native-really-awesome-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import { IPServer } from '../Server/IPServer.js';
import io from 'socket.io-client';

var jwtDecode = require('jwt-decode');

let { width, height } = Dimensions.get("window");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "tuan123@gmail.com",
            password: "admin123",
            tabLogicColor: 'white',
            tabRegisterColor: AppColors.color,
            isLoginOrRegister: false,
            spinner: false
        }
    }

    // componentDidMount() {
    //     this.socket = io('http://localhost:3000');
    // }

    login = async () => {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            const body = {
                email: this.state.email,
                password: this.state.password,
            }
            axios.post(IPServer.ip + '/login', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    global.token = response.data.token;
                    axios.get(IPServer.ip + '/me', {
                        headers: {
                            "Authorization": `Bearer ${global.token}`
                        },
                    }).then(response => {
                        let objectUser = response.data;
                        objectUser.userId = jwtDecode(global.token).userId;
                        global.user = objectUser;
                        // const socket = io('http://10.20.195.218:3000');
                        // socket.on('connect', () => {
                        // });
                        global.isLogin = true;
                        this.setState({
                            spinner: !this.state.spinner
                        }, () => {
                            this.props.navigation.navigate("RootDrawer");
                        });
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(err => {
                    this.setState({
                        spinner: !this.state.spinner
                    }, () => {
                        this.refs.toast.show('Đăng nhập thất bại');
                    });
                    console.log(err)
                })
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={['#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336']} style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <View style={styles.containerLogo}>
                        <Text style={styles.logo}> Care Finder </Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%', marginTop: '1%' }]}>
                        <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white' }} />
                        <Text style={{ fontFamily: 'Berkshireswash-Regular', color: 'white', fontSize: 26 }}>Đăng nhập</Text>
                        <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                    </View>
                    <View style={styles.inputGroupContainer}>
                        <Fumi
                            keyboardType="email-address"
                            fontFamily={'Billabong'}
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
                            secureTextEntry
                            style={styles.fumi}
                            label={'Mật khẩu'}
                            labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                            inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                            autoCorrect={false}
                            iconClass={Icon}
                            iconName={'lock'}
                            iconColor={AppColors.color}
                            returnKeyType={"next"}
                            iconSize={21}
                            onChangeText={password => this.setState({ password })}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <AwesomeButton
                            width={width * 0.8}
                            backgroundColor={'white'}
                            borderRadius={7}
                            onPress={() => this.login()}>
                            <Text style={{ fontSize: 16, fontFamily: Font.textFont, fontWeight: 'bold' }}>Đăng nhập</Text>
                        </AwesomeButton>
                        <View style={[styles.rowView, { justifyContent: 'center', marginTop: '1%' }]}>
                            <TouchableOpacity style={{ marginTop: '1%' }}>
                                <Text style={{ color: "white", fontFamily: Font.textFont, fontSize: 15 }} > Quên mật khẩu?</Text>
                            </TouchableOpacity>
                            <View style={{ marginLeft: '5%' }}>
                                <Text style={[styles.text]}>|</Text>
                            </View>
                            <TouchableOpacity onPress={() => navigate("RegisterScreen")} style={{ marginTop: '1%', marginRight: '4%' }}>
                                <Text style={{ color: "white", fontFamily: Font.textFont, fontSize: 15 }}>Tạo tài khoản</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: '37%' }} />
                    <Toast ref="toast" />
                </LinearGradient>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        backgroundColor: AppColors.color,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        flex: 1
    },
    containerLogo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontSize: 90,
        color: 'white',
        fontFamily: 'Billabong',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 50
    },
    rowView: {
        flexDirection: 'row',
    },
    inputGroupContainer: {
        marginLeft: "15%",
        marginRight: "15%"
    },
    buttonGroup: {
        marginTop: "7%",
        alignItems: 'center'
    },
    text: {
        color: "white",
        marginLeft: "6%",
        marginTop: "3%"
    },
    icon: {
        marginLeft: '5%'
    },
    fumi: {
        width: width * 0.8,
        height: 70,
        marginTop: '5%',
        borderRadius: 100,
        fontFamily: 'Billabong'
    }
});