import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input, CheckBox, Body, ListItem } from 'native-base';
import { Button } from 'react-native-elements';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            phoneNumber: "",
            male: false,
            female: false
        }
    }

    register() {
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require("../img/hospitalLogo.png")}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.containerLine}>
                        <Text style={{ color: "white", fontSize: 17 }}>_____________        Register       _____________</Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <InputGroup>
                            <Icon name={'user'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Họ và Tên"
                                placeholderTextColor="rgba(255,255,255,255)" />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'mail'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Email"
                                placeholderTextColor="rgba(255,255,255,255)" />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'lock'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Mật khẩu"
                                placeholderTextColor="rgba(255,255,255,255)" />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'lock'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Xác nhận mật khẩu"
                                placeholderTextColor="rgba(255,255,255,255)" />
                        </InputGroup>

                        <InputGroup>
                            <Icon name={'phone'} size={27} color={'white'} />
                            <Input
                                style={{ color: "white", marginLeft: "3%" }}
                                placeholder="Số điện thoại"
                                placeholderTextColor="rgba(255,255,255,255)" />
                        </InputGroup>
                    </View>

                    <View style={styles.containerGender}>
                        <ListItem>
                            <CheckBox checked={this.state.male} color="white" style={{ marginLeft: "10%" }} />
                            <Body style={{ marginLeft: "3%" }}>
                                <Text>Male</Text>
                            </Body>

                            <CheckBox checked={this.state.female} color="white" style={{ marginLeft: "19%" }} />
                            <Body style={{ marginLeft: "3%" }}>
                                <Text>Female</Text>
                            </Body>
                        </ListItem>
                    </View>

                    <View style={styles.buttonGroup}>
                        <Button
                            title='Đăng ký'
                            buttonStyle={{
                                backgroundColor: "#E57373",
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                </View>
            </ImageBackground >
        );
    }
}

const styles = StyleSheet.create({
    containerLine: {
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: "25%",
    },
    backButtonContainer: {
        margin: "5%"
    },
    inputGroup: {
        marginLeft: "15%",
        marginRight: "15%",
        marginTop: "5%"
    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: "21%",
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
    containerGender: {
        marginLeft: "10%",
        marginRight: "15%"
    }
});