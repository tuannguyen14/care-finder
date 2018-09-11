import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { InputGroup, Input, CheckBox, Body, ListItem } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
let { width, height } = Dimensions.get("window");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "nusafafsaf",
            email: "nusfafasfasf@gmail.com",
            password: "admin123",
            phoneNumber: "admin123",
            male: false,
            female: false
        }
    }

<<<<<<< HEAD
    register() {
        fetch(' http://localhost:3000/register', {
            method: 'POST',
=======
    register= async () => {
        var body= {
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.male ? 'Nam' : 'Nữ'
        }
        axios.post('http://192.168.1.3:3000/register', body,{
>>>>>>> c0b6f6da3af05efc53c127147ee4eff32665a1ed
            headers: {
                'Content-Type': 'application/json',
<<<<<<< HEAD
            },
            body: JSON.stringify({
                name: this.state.name,
                phoneNumber: this.state.phoneNumber,
                email: this.state.email,
                password: this.state.password,
                gender: this.state.male ? 'Nam' : 'Nữ'
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson.movies;
            })
            .catch((error) => {
                console.error(error);
            });
    }
=======
            }
            
        })
        .then(response => {
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
      }
>>>>>>> c0b6f6da3af05efc53c127147ee4eff32665a1ed

    checkMale() {
        this.setState({
            male: !this.state.male
        })
    }

    checkFeMale() {
        this.setState({
            female: !this.state.female
        })
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container} >
                <ScrollView>
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
                            <View style={styles.inputGroup}>
                                <InputGroup>
                                    <Icon name={'user'} size={27} color={'white'} />
                                    <Input
                                        style={{ color: "white", marginLeft: "3%" }}
                                        placeholder="Họ và Tên"
                                        placeholderTextColor="rgba(255,255,255,255)"
                                        autoCorrect={false}
                                        onChangeText={name => this.setState({ name })}
                                        value={this.state.name}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.emailInput._root.focus() }} />
                                </InputGroup>

                                <InputGroup>
                                    <Icon name={'mail'} size={27} color={'white'} />
                                    <Input
                                        style={{ color: "white", marginLeft: "3%" }}
                                        placeholder="Email"
                                        placeholderTextColor="rgba(255,255,255,255)"
                                        autoCorrect={false}
                                        onChangeText={email => this.setState({ email })}
                                        value={this.state.email}
                                        ref={(input) => { this.emailInput = input; }}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.passwordInput._root.focus() }} />
                                </InputGroup>

                                <InputGroup>
                                    <Icon name={'lock'} size={27} color={'white'} />
                                    <Input
                                        style={{ color: "white", marginLeft: "3%" }}
                                        placeholder="Mật khẩu"
                                        secureTextEntry
                                        placeholderTextColor="rgba(255,255,255,255)"
                                        onChangeText={password => this.setState({ password })}
                                        value={this.state.password}
                                        autoCorrect={false}
                                        ref={(input) => { this.passwordInput = input; }}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.submitPasswordInput._root.focus() }} />
                                </InputGroup>

                                <InputGroup>
                                    <Icon name={'lock'} size={27} color={'white'} />
                                    <Input
                                        style={{ color: "white", marginLeft: "3%" }}
                                        placeholder="Xác nhận mật khẩu"
                                        secureTextEntry
                                        placeholderTextColor="rgba(255,255,255,255)"
                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                        value={this.state.confirmPassword}
                                        autoCorrect={false}
                                        ref={(input) => { this.submitPasswordInput = input; }}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.phoneNumberInput._root.focus() }} />
                                </InputGroup>

                                <InputGroup>
                                    <Icon name={'phone'} size={27} color={'white'} />
                                    <Input
                                        style={{ color: "white", marginLeft: "3%" }}
                                        placeholder="Số điện thoại"
                                        placeholderTextColor="rgba(255,255,255,255)"
                                        onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                        value={this.state.phoneNumber}
                                        keyboardType="numeric"
                                        autoCorrect={false}
                                        ref={(input) => { this.phoneNumberInput = input; }}
                                        returnKeyType={"next"}
                                    />
                                </InputGroup>
                            </View>

                            <View style={styles.containerGender}>
                                <ListItem>
                                    <IconFontAwesome name={'male'} size={27} color={'white'} style={{ marginLeft: "3%" }} />
                                    <CheckBox onPress={() => this.checkMale()} checked={this.state.male} color="white" style={{ marginLeft: "0.5%" }} />
                                    <Body style={{ marginLeft: "3%" }}>
                                        <Text style={{ color: 'white' }}>Nam</Text>
                                    </Body>

                                    <IconFontAwesome name={'female'} size={27} color={'white'} style={{ marginLeft: "3%" }} />
                                    <CheckBox onPress={() => this.checkFeMale()} checked={this.state.female} color="white" style={{ marginLeft: "0.5%" }} />
                                    <Body style={{ marginLeft: "3%" }}>
                                        <Text style={{ color: 'white' }}>Nữ</Text>
                                    </Body>
                                </ListItem>
                            </View>

                            <View style={styles.buttonGroup}>
                                <Button
                                    onPress={() => this.register()}
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
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backButtonContainer: {
        margin: "5%"
    },
    inputGroup: {
        marginLeft: "15%",
        marginRight: "15%",

    },
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: '10%'
    },
    buttonGroup: {
        marginTop: "7%",
        marginLeft: "10%",
        marginBottom: '30%'
    },
    backgroundImage: {
        width: width,
        height: height
    },
    containerGender: {
        marginLeft: "10%",
        marginRight: "15%"
    }
});