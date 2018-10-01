import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "ntd180295@gmail.com",
            password: "hahaha"
        }
    }

    login = async () => {
        const body = {
            email: this.state.email,
            password: this.state.password,
        }
<<<<<<< HEAD
        axios.post(IPServer.ip + '/login', body, {
=======
        axios.post('http://192.168.137.28:3000/login', body, {
>>>>>>> 63914378efd5d697865c830661b2ba88f5e476d7
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                this.props.navigation.navigate("RootDrawer");
            }).catch(err => {
                this.refs.toast.show('Đăng nhập thất bại');
                console.log(err)
            })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require("../img/hospitalLogo.png")}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <InputGroup>
                            <Icon name={'mail'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,255)"
                                value={this.state.email}
                                autoCorrect={false}
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                                onSubmitEditing={() => { this.passWordInput._root.focus() }}
                                returnKeyType={"next"} />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'lock'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Mật khẩu"
                                placeholderTextColor="rgba(255,255,255,255)"
                                value={this.state.password}
                                secureTextEntry
                                onChangeText={password => this.setState({ password })}
                                ref={(input) => { this.passWordInput = input; }}
                                autoCorrect={false} />
                        </InputGroup>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button
                            title='Đăng nhập'
                            buttonStyle={{
                                backgroundColor: AppColors.color,
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                            onPress={() => this.login()}
                        />
                        <View style={styles.containerText}>
                            <TouchableOpacity style={{ marginTop: "3%", marginLeft: "6%" }}>
                                <Text style={{ color: "white" }} > Forgot password?</Text>
                            </TouchableOpacity>
                            <Text style={styles.text}>|</Text>
                            <TouchableOpacity onPress={() => navigate("RegisterScreen")} style={{ marginTop: "3%", marginLeft: "6%" }}>
                                <Text style={{ color: "white" }}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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