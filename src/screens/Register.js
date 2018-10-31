import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { InputGroup, Input, ListItem } from 'native-base';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Toast, { DURATION } from 'react-native-easy-toast'
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';

let { width, height } = Dimensions.get("window");

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Tuan",
            lastName: "Nguyen",
            email: "tuan123@gmail.com",
            password: "admin123",
            phoneNumber: "0963448001",
            male: false,
            female: false,
            showToast: false,
        }
    }

    register = async () => {
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            password: this.state.password,
            gender: this.state.male ? 'Nam' : 'Nữ'
        }
        console.log(body)
        axios.post(IPServer.ip + '/register', body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                this.refs.toast.show('Đăng ký thành công');
                this.timeoutHandle = setTimeout(() => {
                    let user = response.data.createdUser;
                    this.props.navigation.navigate('VerifyScreen', { user });
                }, 1000)
                console.log(response)
            }).catch(err => {
                this.refs.toast.show('Đăng ký thất bại');
                console.log(err)
            })
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                {/* <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}> */}
                <View>
                    <TouchableOpacity onPress={() => goBack()}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={AppColors.color} />
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.containerLogo}>
                        <Image
                            source={require("../img/hospitalLogo.png")}
                            style={styles.logo}
                        />
                    </View> */}
                    <View style={styles.inputGroup}>
                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'user'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Họ"
                                placeholderTextColor="rgba(255,255,255,255)"
                                autoCorrect={false}
                                onChangeText={lastName => this.setState({ lastName })}
                                value={this.state.lastName}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.emailInput._root.focus() }} />
                        </InputGroup>
                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'user'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Tên"
                                placeholderTextColor="rgba(255,255,255,255)"
                                autoCorrect={false}
                                onChangeText={firstName => this.setState({ firstName })}
                                value={this.state.firstName}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.emailInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'mail'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Email"
                                placeholderTextColor={AppColors.color}
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                ref={(input) => { this.emailInput = input; }}
                                keyboardType="email-address"
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.passwordInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'lock'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Mật khẩu"
                                secureTextEntry
                                placeholderTextColor={AppColors.color}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                autoCorrect={false}
                                ref={(input) => { this.passwordInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.submitPasswordInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'lock'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Xác nhận mật khẩu"
                                secureTextEntry
                                placeholderTextColor={AppColors.color}
                                onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                value={this.state.confirmPassword}
                                autoCorrect={false}
                                ref={(input) => { this.submitPasswordInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.phoneNumberInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup borderColor={AppColors.color}>
                            <Icon name={'phone'} size={27} color={AppColors.color} />
                            <Input
                                style={{ color: "black", marginLeft: "3%" }}
                                placeholder="Số điện thoại"
                                placeholderTextColor={AppColors.color}
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
                            <IconFontAwesome name={'male'} size={27} color={AppColors.color} style={{ marginLeft: "3%" }} />
                            <CheckBox
                                center
                                title='Nam'
                                checkedIcon='check-circle-o'
                                uncheckedIcon='circle-o'
                                style={{ marginLeft: "0.5%" }}
                                checked={this.state.male}
                                onPress={() => this.setState({ male: !this.state.male, female: false })}
                            />

                            <IconFontAwesome name={'female'} size={27} color={AppColors.color} style={{ marginLeft: "3%" }} />
                            <CheckBox
                                center
                                title='Nữ'
                                checkedIcon='check-circle-o'
                                uncheckedIcon='circle-o'
                                style={{ marginLeft: "0.5%" }}
                                checked={this.state.female}
                                onPress={() => this.setState({ female: !this.state.female, male: false })}
                            />
                        </ListItem>
                    </View>

                    <View style={styles.buttonGroup}>
                        <Button
                            onPress={() => this.register()}
                            title='Đăng ký'
                            buttonStyle={{
                                backgroundColor: AppColors.color,
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                </View>
                <Toast ref="toast" />
                {/* </ImageBackground > */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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