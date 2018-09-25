import React, { Component } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { InputGroup, Input, CheckBox, Body, ListItem } from 'native-base';
import { Button, Header } from 'react-native-elements';
import Toast, { DURATION } from 'react-native-easy-toast'
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class ChangeInformationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAwareScrollView style={styles.container}>
                    <Header
                        backgroundColor={AppColors.color}
                        leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                        centerComponent={{ text: 'Đổi thông tin', style: { color: '#fff', fontSize: 20 } }}
                    />
                    <View style={styles.container}>

                        <View style={styles.inputGroup}>
                            <InputGroup>
                                <Icon name={'user'} size={27} color={AppColors.color} />
                                <Input
                                    style={styles.input}
                                    placeholder="Họ và Tên"
                                    placeholderTextColor={AppColors.color}
                                    underlineColorAndroid={AppColors.color}
                                    autoCorrect={false}
                                    onChangeText={name => this.setState({ name })}
                                    value={this.state.name}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.emailInput._root.focus() }} />
                            </InputGroup>

                            <InputGroup>
                                <Icon name={'mail'} size={27} color={AppColors.color} />
                                <Input
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor={AppColors.color}
                                    underlineColorAndroid={AppColors.color}
                                    autoCorrect={false}
                                    onChangeText={email => this.setState({ email })}
                                    value={this.state.email}
                                    ref={(input) => { this.emailInput = input; }}
                                    keyboardType="email-address"
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.passwordInput._root.focus() }} />
                            </InputGroup>

                            <InputGroup>
                                <Icon name={'lock'} size={27} color={AppColors.color} />
                                <Input
                                    style={styles.input}
                                    placeholder="Mật khẩu"
                                    secureTextEntry
                                    placeholderTextColor={AppColors.color}
                                    underlineColorAndroid={AppColors.color}
                                    onChangeText={password => this.setState({ password })}
                                    value={this.state.password}
                                    autoCorrect={false}
                                    ref={(input) => { this.passwordInput = input; }}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.submitPasswordInput._root.focus() }} />
                            </InputGroup>

                            <InputGroup>
                                <Icon name={'lock'} size={27} color={AppColors.color} />
                                <Input
                                    style={styles.input}
                                    placeholder="Xác nhận mật khẩu"
                                    secureTextEntry
                                    placeholderTextColor={AppColors.color}
                                    underlineColorAndroid={AppColors.color}
                                    onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                    value={this.state.confirmPassword}
                                    autoCorrect={false}
                                    ref={(input) => { this.submitPasswordInput = input; }}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.phoneNumberInput._root.focus() }} />
                            </InputGroup>

                            <InputGroup>
                                <Icon name={'phone'} size={27} color={AppColors.color} />
                                <Input
                                    style={styles.input}
                                    placeholder="Số điện thoại"
                                    placeholderTextColor={AppColors.color}
                                    underlineColorAndroid={AppColors.color}
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
                                <CheckBox onPress={() => this.checkMale()} checked={this.state.male} color={AppColors.color} style={{ marginLeft: "0.5%" }} />
                                <Body style={{ marginLeft: "3%" }}>
                                    <Text style={{ color: AppColors.color }}>Nam</Text>
                                </Body>

                                <IconFontAwesome name={'female'} size={27} color={AppColors.color} style={{ marginLeft: "3%" }} />
                                <CheckBox onPress={() => this.checkFeMale()} checked={this.state.female} color={AppColors.color} style={{ marginLeft: "0.5%" }} />
                                <Body style={{ marginLeft: "3%" }}>
                                    <Text style={{ color: AppColors.color }}>Nữ</Text>
                                </Body>
                            </ListItem>
                        </View>

                        <View style={styles.buttonGroup}>
                            <Button
                                // onPress={() => naviga}
                                title='Đổi thông tin'
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
                    <Toast ref="toast" />
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
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
    },
    input: {
        color: AppColors.color,
        marginLeft: "3%"
    }
});