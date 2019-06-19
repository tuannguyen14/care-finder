import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Platform, Animated, Modal } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import Toast, { DURATION } from "react-native-easy-toast";
import { Button, Header, Divider } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import { AppColors } from '../styles/AppColors.js';
import axios from 'axios';
const ImagePicker = require("react-native-image-picker");
import { IPServer } from "../Server/IPServer.js";
import Spinner from 'react-native-loading-spinner-overlay';
import { Font } from '../styles/Font.js';
import Icon from 'react-native-vector-icons/Entypo';
import Styles from '../styles/Styles.js';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const options = {
    title: "Chọn ảnh từ:",
    quality: 1,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class MyComponent extends Component {
    render() {
        return (
            <View style={{ alignItems: "center", paddingVertical: "4%" }}>
                <Text style={{ fontFamily: Font.textFont, }}>{this.props.name}</Text>
            </View>
        );
    }
}


export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: global.user,
            avatar: global.user.avatar,
            slideAnim: new Animated.Value(-200),
            zIndex: 1,
            visible: false,
            avatar: global.user.avatar,
            spinner: false
        };
    }

    changeAvatar = () => {
        ImagePicker.showImagePicker(options, response => {
            this.setState({
                spinner: !this.state.spinner
            }, () => {
                if (response.didCancel) {
                    console.log("User cancelled image picker");
                } else if (response.error) {
                    console.log("ImagePicker Error: ", response.error);
                } else if (response.customButton) {
                    console.log("User tapped custom button: ", response.customButton);
                } else {
                    this.setState({
                        avatar: response.uri
                    })
                    const body = new FormData();
                    body.append('avatar', {
                        uri: response.uri,
                        type: 'image/jpg',
                        name: 'image.jpg'
                    })

                    axios.patch(IPServer.ip + '/user', body, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${global.token}`
                        }
                    }).then(response => {
                        let objectUser = response.data.doc;
                        objectUser.userId = global.userId;
                        global.user = objectUser;
                        this.setState({ user: global.user, spinner: !this.state.spinner });
                    }).catch(err => {
                        console.log(err)
                    });
                }
            });
        });
    }

    viewAvatar = () => {
        this.setState({
            visible: true
        })
    }

    selectOptions = () => {
        this.setState({
            zIndex: 3
        })
        Animated.timing(this.state.slideAnim, {
            toValue: 0,
            duration: 500
        }).start();
    }

    slideDownAnim = () => {
        Animated.timing(this.state.slideAnim, {
            toValue: -200,
            duration: 1000
        }).start();
        this.setState({
            zIndex: 1
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        let bottom = this.state.slideAnim;
        return (
            <View style={styles.container}>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => this.setState({ visible: false })}>
                    <ImageViewer
                        imageUrls={[{ url: this.state.avatar }]}
                        index={this.state.index} />
                </Modal>
                <View style={{ height: "100%", zIndex: 2, backgroundColor: "#E0F7FA" }}>
                    <Header
                        innerContainerStyles={{ alignItems: 'center' }}
                        outerContainerStyles={{ borderBottomWidth: 0 }}
                        backgroundColor={AppColors.color}
                        leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => navigate('RootDrawer') }}
                        centerComponent={{ text: 'THÔNG TIN NGƯỜI DÙNG', style: [Styles.header, { color: '#fff' }] }}
                    />
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <TouchableOpacity >
                        <ImageBackground
                            source={{ uri: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg' }}
                            style={styles.coverPhoto}
                        >
                            <View style={styles.containerName}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }}>{this.state.user.lastName} {this.state.user.firstName}</Text>
                                {
                                    this.state.user.permission === 'DOCTOR' ?
                                        // <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "green", marginBottom: '1%' }}>Bác sĩ</Text>
                                        /* <Entypo name={'check'} size={23} color={'green'} /> */
                                        /* </View> */
                                        : null
                                }
                            </View>
                            <View style={styles.containerTextImage}>
                                <TouchableOpacity onPress={this.selectOptions}>
                                    <Image
                                        source={{ uri: this.state.user.avatar }}
                                        style={styles.avatar}
                                    />
                                    <Entypo style={{ position: "absolute", bottom: 0, right: 0 }} name={'edit'} size={31} color={AppColors.backgroundColor} />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>

                        <View style={styles.containerText}>
                            <Text style={styles.textHeader}> Email: </Text>
                            <Text style={styles.textState}>{this.state.user.email}</Text>
                        </View>
                        <View style={styles.containerText}>
                            <Text style={styles.textHeader}> Điện thoại: </Text>
                            <Text style={styles.textState}>{this.state.user.phoneNumber}</Text>
                        </View>
                        <View style={styles.containerText}>
                            <Text style={styles.textHeader}> Giới tính: </Text>
                            <Text style={styles.textState}>{this.state.user.gender}</Text>
                        </View>
                        <View style={{ height: '0.7%', backgroundColor: 'grey' }} />
                        <TouchableOpacity style={{ paddingTop: '1%', paddingBottom: '2%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '3%', marginRight: '3%' }} onPress={() => navigate('ChangeInformationUserScreen')}>
                            <View style={{ flexDirection: 'row' }}>
                                <Entypo name={'edit'} size={23} color={AppColors.backgroundColor} />
                                <Text style={{ fontSize: 19, color: AppColors.backgroundColor, marginLeft: '7%' }}>Đổi thông tin</Text>
                            </View>
                            <MaterialCommunityIcons name={'chevron-right'} size={27} color={AppColors.backgroundColor} style={{ alignSelf: 'flex-end' }} />
                        </TouchableOpacity>
                        <View style={{ height: '0.7%', backgroundColor: 'grey' }} />
                        {
                            this.state.user.permission === 'DOCTOR' ? null :
                                <View>
                                    <TouchableOpacity style={{ paddingTop: '1%', paddingBottom: '2%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginLeft: '3%', marginRight: '3%' }} onPress={() => navigate('VerifyDoctorScreen')}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Entypo name={'check'} size={23} color={AppColors.backgroundColor} />
                                            <Text style={{ fontSize: 19, color: AppColors.backgroundColor, marginLeft: '5%' }}>Xác thực tài khoản bác sĩ</Text>
                                        </View>
                                        <MaterialCommunityIcons name={'chevron-right'} size={27} color={AppColors.backgroundColor} style={{ alignSelf: 'flex-end' }} />
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            this.state.user.permission === 'DOCTOR' ? null :
                                <View style={{ height: '0.7%', backgroundColor: 'grey' }} />
                        }

                    </View>

                </View>
                <TouchableOpacity onPress={this.slideDownAnim} style={{ position: "absolute", zIndex: this.state.zIndex, backgroundColor: "#00000050", height: "100%", width: "100%", marginTop: "17%" }}>
                    <View >
                    </View>
                </TouchableOpacity>

                <Animated.View style={{
                    backgroundColor: "#ffffff",
                    zIndex: 4,
                    bottom,
                    position: "absolute",
                    width: "100%"
                }}>
                    <TouchableOpacity onPress={this.changeAvatar}>
                        <MyComponent name="Thay đổi ảnh đại diện" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.viewAvatar}>
                        <MyComponent name="Xem hình ảnh" color="#ffffcc" />
                    </TouchableOpacity>
                </Animated.View>
                <Toast ref="toast" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    line: {
        borderColor: "#E0E0E0",
        borderWidth: 1
    },
    logoBackButton: {
        width: 17,
        height: 17,
        marginLeft: 15
    },
    avatar: {
        borderWidth: 1,
        width: 140,
        height: 140,
        ...Platform.select({
            ios: {
                borderRadius: 30.5
            },
            android: {
                borderRadius: 70
            }
        })
    },
    coverPhoto: {
        width: "100%",
        height: 260,
        justifyContent: "center"
    },
    containerTextImage: {
        alignItems: "center"

    },
    editImage: {
        width: 5,
        height: 5,
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: "3%"
    },
    containerName: {
        alignItems: 'center',
        position: "absolute",
        alignSelf: "center",
        bottom: 0,
        marginBottom: "0%",
    },
    containerBelow: {
        marginTop: "1.6%",
        margin: "3%"
    },
    containerText: {
        flexDirection: "row"
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 1
    },
    textState: {
        fontSize: 16,
        flex: 3
    },
    touchable: {
        marginTop: "6%",
        padding: "3%",
        borderRadius: 15,
    },
    button: {
        textAlign: "center",
        fontWeight: "700",
        fontSize: 18,
        color: "#fff"
    }
});