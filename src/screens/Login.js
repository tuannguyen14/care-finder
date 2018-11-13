import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, ImageBackground, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { Text } from 'react-native-elements';
import { Fumi } from 'react-native-textinput-effects';
import axios from 'axios';
import Toast from 'react-native-easy-toast'
// import Register from './Register':
import AwesomeButton from 'react-native-really-awesome-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';

var jwtDecode = require('jwt-decode');

let { width, height } = Dimensions.get("window");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "tuan123@gmail.com",
            password: "admin123",
            checkedDoctor: true,
            checkedUser: false,
            tabLogicColor: 'white',
            tabRegisterColor: AppColors.color,
            isLoginOrRegister: false,
            spinner: false
        }
    }

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
                    if (this.state.checkedDoctor) {
                        global.doctor = true;
                    }

                    axios.get(IPServer.ip + '/me', {
                        headers: {
                            "Authorization": `Bearer ${global.token}`
                        },
                    }).then(response => {
                        let objectUser = response.data;
                        objectUser.userId = jwtDecode(global.token).userId;
                        global.user = objectUser;
                    }).catch(err => {
                        console.log(err)
                    })
                    this.setState({
                        spinner: !this.state.spinner
                    }, () => {
                        this.props.navigation.navigate("RootDrawer");
                    });
                }).catch(err => {
                    this.refs.toast.show('Đăng nhập thất bại');
                    console.log(err)
                })
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            // <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Đang xử lý'}
                    textStyle={{ color: 'white' }}
                />
                <View style={styles.containerLogo}>
                    <Text h1 style={styles.logo}>Care Finder</Text>
                </View>
                {/* <View style={[styles.rowView]} >
                    <TouchableOpacity style={[styles.tabContainer, { borderBottomColor: this.state.tabLogicColor }]} onPress={() => this.setState({ tabRegisterColor: AppColors.color, tabLogicColor: 'white' })}>
                        <Text h5>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabContainer, { borderBottomColor: this.state.tabRegisterColor }]} onPress={() => this.setState({ tabRegisterColor: 'white', tabLogicColor: AppColors.color })}>
                        <Text h5>ĐĂNG KÝ</Text>
                    </TouchableOpacity>
                </View> */}
                {
                }
                <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%', marginTop: '1%' }]}>
                    <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white' }} />
                    <Text style={{ color: 'white', fontSize: 17 }}>Đăng nhập</Text>
                    <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                </View>
                <View style={styles.inputGroupContainer}>
                    <Fumi
                        style={styles.fumi}
                        label={'Email'}
                        labelStyle={{ color: "#757575", }}
                        inputStyle={{ color: "#424242" }}
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
                        labelStyle={{ color: "#757575", }}
                        inputStyle={{ color: "#424242" }}
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
                        onPress={(next) => {
                            this.login();
                            next();
                        }}
                        onPress={() => this.login()}>
                        <Text>Đăng nhập</Text>
                    </AwesomeButton>
                    <View style={styles.rowView}>
                        <TouchableOpacity style={{ marginTop: "3%" }}>
                            <Text style={{ color: "black" }} > Forgot password?</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>|</Text>
                        <TouchableOpacity onPress={() => navigate("RegisterScreen")} style={{ marginTop: "3%", marginLeft: "6%" }}>
                            <Text style={{ color: "black" }}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref="toast" />
            </View >
            // </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.color,
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
        marginBottom: '6%'
    },
    logo: {
        color: 'white',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
        fontSize: 60
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
        alignItems: 'center',
        marginBottom: '25%'
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
        borderRadius: 100
    }
});