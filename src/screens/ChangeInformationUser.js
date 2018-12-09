import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ListItem } from 'native-base';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { Fumi } from 'react-native-textinput-effects';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import AwesomeButton from 'react-native-really-awesome-button';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';
import Toast from 'react-native-easy-toast'
import Dialog, { SlideAnimation, DialogContent, DialogButton } from 'react-native-popup-dialog';

let { width, height } = Dimensions.get("window");

export default class ChangeInformationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            newPassword: "",
            confirmPassword: "",
            phoneNumber: "",
            oldPassword: "",
            male: false,
            female: false,
            showToast: false,
            spinner: false,
            user: global.user,
            visible: false,
            informationButton:false,
            passwordButton: false,
            passwordErrorMessage: false,
            informationErrorMessage: false
        };
    }

    onChangeInformation() {
        this.setState({ spinner: !this.state.spinner }, () => {
            let body = {}
            console.log(this.state.visible)
            if(this.state.firstName !=="") {
              body.firstName = this.state.firstName
            }
            if(this.state.lastName !== "") {
              body.lastName = this.state.lastName
            }

            if(this.state.phoneNumber !== "") {
              body.phoneNumber = this.state.phoneNumber
            }
            
            if(this.state.email !== "") {
              body.email = this.state.email
            }

            body.gender = this.state.male ? 'Nam': 'Nữ'
            
            axios.patch(IPServer.ip + '/user/' + this.state.user.userId, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${global.token}`
                }
            })
                .then(response => {
                   let objectUser = response.data.doc;
                    objectUser.userId = this.state.user.userId;
                    global.user = objectUser;
                    console.log(global.user)
                    this.setState({
                        spinner: !this.state.spinner,
                        visible: true,
                        informationButton: true
                    }, () => {
                      
                    });
                    
                }).catch(err => {
                    this.setState({
                        spinner: !this.state.spinner
                    }, () => {

                    });
                    console.log(err)
                });
            }
        );
    }

    onChangePassWord() {
        this.setState({ spinner: !this.state.spinner }, () => {
            let body = {
                oldPassword: this.state.oldPassword,
                newPassword: this.state.newPassword
            };
            if (this.state.newPassword === this.state.confirmPassword) {
                axios.patch(IPServer.ip + '/user/password/' + this.state.user.userId, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${global.token}`
                    }
                })
                    .then(response => {
                        
                        this.setState({
                            spinner: !this.state.spinner,
                            visible: true,
                            passwordButton: true
                        }, () => {
                        });
                    }).catch(err => {
                        this.setState({
                            spinner: !this.state.spinner,
                            passwordErrorMessage: true
                        }, () => {
                              
                        });
                        
                    });
            }
        });
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <TouchableOpacity onPress={() => goBack()}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%' }]}>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white' }} />
                            <Text style={{ fontFamily: 'Berkshireswash-Regular', color: 'white', fontSize: 26 }}>Thông tin cơ bản</Text>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                        </View>
                        <View >
                            <Fumi
                                style={styles.fumi}
                                label={'Họ'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'user'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                onChangeText={lastName => this.setState({ lastName })}
                            />

                            <Fumi
                                style={styles.fumi}
                                label={'Tên'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'user'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                onChangeText={firstName => this.setState({ firstName })}
                            />

                            <Fumi
                                keyboardType="email-address"
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
                                keyboardType="numeric"
                                style={styles.fumi}
                                label={'Số điện thoại'}
                                labelStyle={{ color: "#757575", fontFamily: Font.textFont }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'phone'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                iconSize={21}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                        </View>

                        <View style={styles.containerGender}>
                            <ListItem>
                                <IconFontAwesome name={'male'} size={27} color={'white'} style={{ marginLeft: "3%" }} />
                                <CheckBox
                                    center
                                    title='Nam'
                                    checkedIcon='check-circle-o'
                                    uncheckedIcon='circle-o'
                                    style={{ marginLeft: "0.5%" }}
                                    checked={this.state.male}
                                    onPress={() => this.setState({ male: !this.state.male, female: false })}
                                />

                                <IconFontAwesome name={'female'} size={27} color={'white'} style={{ marginLeft: "3%" }} />
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

                        <AwesomeButton
                            style={{ marginBottom: '1.5 %' }}
                            width={width * 0.8}
                            backgroundColor={'white'}
                            borderRadius={7}
                            progress={this.state.buttonProgress}
                            onPress={() => this.onChangeInformation()}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đổi thông tin</Text>
                        </AwesomeButton>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <View style={[styles.rowView, { alignItems: 'center', marginBottom: '3%' }]}>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginRight: '1.5%', borderBottomColor: 'white' }} />
                            <Text style={{ fontFamily: 'Berkshireswash-Regular', color: 'white', fontSize: 26 }}>Đổi mật khẩu</Text>
                            <View style={{ width: height * 0.15, borderBottomWidth: 1, marginLeft: '1.5%', borderBottomColor: 'white' }} />
                        </View>
                        <View>
                          {this.state.passwordErrorMessage ? 
                            <Text style={{color: 'red'}}>Mật khẩu cũ sai</Text>
                            : null  
                          }
                        </View>
                        <View >
                            <Fumi
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
                            />

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
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đổi mật khẩu</Text>
                            </AwesomeButton>

                        </View>
                        
                    </View>
                    <Dialog
                      width="0.8"
                      visible={this.state.visible}
                      dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                      })}
                      actions={[
                        <DialogButton
                          text="Tiếp tục sửa thông tin"
                          textStyle={styles.dialogButtonText}
                          onPress={() => this.setState({visible:false, informationButton: false, passwordButton: false})}
                        />,
                        <DialogButton
                          text="Quay về màn hình chính"
                          textStyle={[styles.dialogButtonText, {color: 'blue'}]}
                          onPress={() => {this.setState({visible:false, informationButton: false, passwordButton: false}, () => {
                            navigate('RootDrawer')
                          })}}
                        />,
                      ]}
                    >
                      <DialogContent>
                        {this.state.informationButton? <Text style={styles.dialogContent}>Thay đổi thông tin user thành công</Text> : null}
                        {this.state.passwordButton? <Text style={styles.dialogContent}>Thay đổi password thành công</Text> : null}
                      </DialogContent>
                    </Dialog>
                </ScrollView>
               
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.color,
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
    containerGender: {
        marginLeft: "10%",
        marginRight: "15%"
    },
    fumi: {
        width: width * 0.8,
        height: 70,
        marginTop: '5%',
        borderRadius: 100
    },
    dialogContent: {
      fontSize: 20,
      marginTop: 15,
    },
    dialogButtonText: {
      color: 'black',
      margin: 2
    }
});