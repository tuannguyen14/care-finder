import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    login() {
        this.props.navigation.navigate("MainTabScreen");
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
                    <View style={styles.containerLine}>
                        <Text style={{ color: "white", fontSize: 17 }}>_____________        Login       _____________</Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <InputGroup>
                            <Icon name={'mail'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,255)"
                                value={this.state.email} />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'lock'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Mật khẩu"
                                placeholderTextColor="rgba(255,255,255,255)"
                                value={this.state.password} />
                        </InputGroup>
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button
                            title='Đăng nhập'
                            buttonStyle={{
                                backgroundColor: "#E57373",
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
    containerLine: {
        marginLeft: "13%",
        marginRight: "13%",
        marginTop: "46%",
    },
    inputGroup: {
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "10%"
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