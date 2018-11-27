import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Platform,
    ScrollView,
    Animated,
    Modal
} from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import Toast, { DURATION } from "react-native-easy-toast";
import { Button, Header } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';
import { change_url_image } from '../utils/Utils';
import axios from 'axios';
const ImagePicker = require("react-native-image-picker");
import { IPServer } from "../Server/IPServer.js";
import Spinner from 'react-native-loading-spinner-overlay';
import { Font } from '../styles/Font.js';
import Icon from 'react-native-vector-icons/Entypo';
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
            slideAnim: new Animated.Value(-200),
            zIndex: 1,
            visible: false
        };
    }

    changeAvatar = () => {
        ImagePicker.showImagePicker(options, response => {
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
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${global.token}`
                    }
                })
            }
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

        console.log('aaa')
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
        const { navigate, goBack } = this.props.navigation;
        let bottom = this.state.slideAnim;

        console.log(this.state.user.avatar)
        return (
            <View style={styles.container}>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => this.setState({ visible: false })}>
                    <ImageViewer
                        imageUrls={[{ url: this.state.avatar }]}
                        index={this.state.index} />
                </Modal>
                <View style={{ height: "100%", zIndex: 2, backgroundColor: "#80DEEA" }}>
                    <Header
                        outerContainerStyles={{ borderBottomWidth: 0 }}
                        backgroundColor={AppColors.color}
                        leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                        centerComponent={{ text: 'Thông tin người dùng', style: { color: '#fff', fontSize: 20 } }}
                    />
                    <TouchableOpacity >
                        <ImageBackground
                            source={{ uri: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg' }}
                            style={styles.coverPhoto}
                        >
                            <Text style={styles.textEditCoverPhoto}>{this.state.user.firstName} {this.state.user.lastName}</Text>
                            <View style={styles.containerTextImage}>
                                <TouchableOpacity onPress={this.selectOptions}>
                                    <Image
                                        source={{ uri: this.state.user.avatar.includes('localhost') ? this.state.user.avatar.replace('http://localhost:3000', IPServer.ip) : this.state.user.avatar }}
                                        style={styles.avatar}
                                    />
                                    <Icon style={{ position: "absolute", bottom: 0, right: 0 }} name={'edit'} size={31} color={'white'} />
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
                        <View style={styles.containerText}>
                            <Text style={styles.textHeader}> Số địa điểm đang theo dõi: </Text>
                            <Text style={styles.textState}>{this.state.user.follows.length}</Text>
                        </View>

                        {/* <View style={{ marginTop: '5%', justifyContent: 'center', alignItems: 'center' }}>
                            <Button
                                title='Đổi thông tin'
                                buttonStyle={{
                                    backgroundColor: AppColors.color,
                                    width: 300,
                                    height: 45,
                                    borderColor: "transparent",
                                    borderWidth: 0,
                                    borderRadius: 5
                                }}
                                onPress={() => navigate("ChangeInformationUserScreen")}
                            />
                        </View> */}
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

        backgroundColor: "red",
        position: "relative"
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
    textEditCoverPhoto: {
        position: "absolute",
        alignSelf: "center",
        bottom: 0,
        marginBottom: "3%",
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
        backgroundColor: 'transparent',
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
        flex: 2
    },
    textState: {
        fontSize: 16,
        flex: 2
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