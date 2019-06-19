import React, { Component } from "react";
import { Dimensions, View, StyleSheet, ImageBackground, Image } from "react-native";
import { Text, Avatar, ListItem } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';
import AwesomeButton from 'react-native-really-awesome-button';
import Toast from 'react-native-easy-toast';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';
import axios from 'axios';

let { width, height } = Dimensions.get("window");

// create a component
class MainDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            id: '',
            listSettingsItem: {
                name: '',
                icon: ''
            },
            listUtilitiesItem: {
                name: '',
                icon: ''
            },
        };
    }

    componentWillMount() {
        if (global.isLogin) {
            this.setState({ user: global.user });
            const listDefaultItemTemp = [
                {
                    icon: 'person',
                    name: 'Thông tin người dùng',
                    navigation: 'InformationUserScreen'
                },
                {
                    icon: 'sentiment-dissatisfied',
                    name: 'Đăng xuất',
                    navigation: 'WelcomeScreen'
                }
            ]
            const listUtilitiesItem = [

            ];
            if (this.state.user.permission === 'DOCTOR') {
                listUtilitiesItem.push(
                    {
                        icon: 'assistant-photo',
                        name: 'Tạo địa điểm',
                        navigation: 'CreateNewLocationScreen'
                    },
                    {
                        icon: 'edit-location',
                        name: 'Quản lý địa điểm',
                        navigation: 'LocationManagerScreen'
                    },
                    {
                        icon: 'event-note',
                        name: 'Danh sách bệnh nhân',
                        navigation: 'ListPatientScreen'
                    },
                );
            } else {
                listUtilitiesItem.push(
                    {
                        icon: 'query-builder',
                        name: 'Số thứ tự',
                        navigation: 'ChooseClinicQRCodeScreen'
                    }
                )
            }
            this.setState({
                listSettingsItem: listDefaultItemTemp,
                listUtilitiesItem: listUtilitiesItem
            })
        }
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.componentWillMount();
            }
        );
    }

    onQRCode(navigation) {
        if (global.user.ticketInfo.length == 0) {
            this.refs.toast.show('Không có lịch để xem!');
        } else {
            this.props.navigation.navigate(navigation);
        }
    }

    createUILogged = () => {
        const { navigate, replace } = this.props.navigation;
        return (
            <View>
                <View>
                    <ImageBackground
                        source={{ uri: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg' }}
                        style={styles.coverPhoto}
                    >
                        <View style={styles.containerTextImage}>
                            <Image
                                source={{ uri: this.state.user.avatar.includes('localhost') ? this.state.user.avatar.replace('http://localhost:3000', IPServer.ip) : this.state.user.avatar }}
                                style={styles.avatar} />
                            <Text style={[styles.textShadow, { color: 'white', fontSize: 19 }]}>
                                {this.state.user.lastName + " " + this.state.user.firstName}
                            </Text>
                            <Text style={[styles.textShadow, { color: '#E0E0E0', fontSize: 19 }]}>
                                {this.state.user.email}
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                <View>
                    <View>
                        <Text style={[styles.title, styles.textShadow]}>Tiện ích</Text>
                        <View>
                            {
                                this.state.listUtilitiesItem.map((l, i) => (
                                    <ListItem
                                        containerStyle={{ borderBottomWidth: 1.5 }}
                                        key={i}
                                        hideChevron={true}
                                        title={l.name}
                                        leftIcon={{ name: l.icon, color: AppColors.color, style: { marginLeft: '10%' } }}
                                        onPress={() => l.navigation != 'QRCodeScreen' ? navigate(l.navigation) : this.onQRCode(l.navigation)}
                                    />
                                ))
                            }
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.title, styles.textShadow]}>Cài Đặt</Text>
                        <View>
                            {
                                this.state.listSettingsItem.map((l, i) => (
                                    <ListItem
                                        containerStyle={{ borderBottomWidth: 1.5 }}
                                        key={i}
                                        hideChevron={true}
                                        title={l.name}
                                        leftIcon={{ name: l.icon, color: AppColors.color, style: { marginLeft: '10%' } }}
                                        onPress={() => l.navigation == 'WelcomeScreen' ? replace(l.navigation) : navigate(l.navigation)}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </View>
                <Toast ref="toast" />
            </View>
        );
    }


    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {
                    global.isLogin ?
                        this.createUILogged()
                        :
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6%' }}>
                            <AwesomeButton
                                width={width * 0.5}
                                backgroundColor={AppColors.backgroundColor}
                                borderRadius={7}
                                onPress={() => navigate('LoginScreen')}>
                                <Text style={{ fontSize: 16, fontFamily: Font.textFont, fontWeight: 'bold' }}>Đăng nhập</Text>
                            </AwesomeButton>
                        </View>
                }
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    }, avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    coverPhoto: {
        width: "100%",
        height: 260
    },
    containerTextImage: {
        marginTop: "33%",
        marginLeft: '1.5%'
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1
    },
    title: {
        fontSize: 21,
        color: '#9E9E9E',
        marginLeft: '5%'
    }
});

//make this component available to the app
export default MainDrawer;