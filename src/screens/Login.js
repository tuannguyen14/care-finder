import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input } from 'native-base';
import { CheckBox, Button } from 'react-native-elements';
import axios from 'axios';
import Toast from 'react-native-easy-toast'
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "tuan123@gmail.com",
            password: "admin123",
            checkedDoctor: false,
            checkedUser: true
        }
    }

    login = async () => {
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
                this.props.navigation.navigate("RootDrawer");
            }).catch(err => {
                this.refs.toast.show('Đăng nhập thất bại');
                console.log(err)
            })
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            // <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={styles.containerTypeUser}>
                    <View style={styles.childContainerTypeUser}>
                        <Image
                            source={require("../img/boy.png")}
                            style={styles.logo}
                        />

                        <CheckBox
                            center
                            title='Bệnh nhân'
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checkedUser}
                            onPress={() => this.setState({ checkedUser: !this.state.checkedUser, checkedDoctor: false })}
                        />
                    </View>
                    <View style={styles.childContainerTypeUser}>
                        <Image
                            source={require("../img/doctor.png")}
                            style={styles.logo}
                        />
                        <CheckBox
                            center
                            title='Bác sĩ'
                            checkedIcon='check-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.checkedDoctor}
                            onPress={() => this.setState({ checkedDoctor: !this.state.checkedDoctor, checkedUser: false })}
                        />
                    </View>
                </View>
                <View style={styles.inputGroup}>
                    <InputGroup borderColor={AppColors.color}>
                        <Icon name={'mail'} size={27} color={AppColors.color} />
                        <Input
                            style={{ color: "black", marginLeft: "3%" }}
                            placeholder="Email"
                            placeholderTextColor={AppColors.color}
                            value={this.state.email}
                            autoCorrect={false}
                            keyboardType="email-address"
                            onChangeText={email => this.setState({ email })}
                            onSubmitEditing={() => { this.passWordInput._root.focus() }}
                            returnKeyType={"next"} />
                    </InputGroup>

                    <InputGroup borderColor={AppColors.color}>
                        <Icon name={'lock'} size={27} color={AppColors.color} />
                        <Input
                            style={{ color: "black", marginLeft: "3%" }}
                            placeholder="Mật khẩu"
                            placeholderTextColor={AppColors.color}
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
                            <Text style={{ color: "black" }} > Forgot password?</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>|</Text>
                        <TouchableOpacity onPress={() => navigate("RegisterScreen")} style={{ marginTop: "3%", marginLeft: "6%" }}>
                            <Text style={{ color: "black" }}>Create an account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref="toast" />
            </View>
            // </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    containerTypeUser: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: '11%',
        marginRight: '11%'
    },
    childContainerTypeUser: {
        borderColor: AppColors.color,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '15%'
    },
    inputGroup: {
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: '10%'
    },
    containerText: {
        flexDirection: 'row',
    },
    logo: {
        width: 100,
        height: 100,
    },
    buttonGroup: {
        marginTop: "7%",
        marginLeft: "10%"
    },
    text: {
        color: "white",
        marginLeft: "6%",
        marginTop: "3%"
    }
});