import React, { Component } from "react";
import {
    View,
    StyleSheet,
    ImageBackground
} from "react-native";
import { Text, Avatar, ListItem } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';

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
        // console.log(this.state.user)
    }

    componentWillMount() {
        this.setState({ user: global.user });
        const listDefaultItemTemp = [
            {
                icon: 'person',
                name: 'Thông tin người dùng',
                navigation: 'InformationUserScreen'
            },
            {
                icon: 'sentiment-dissatisfied',
                name: 'Đăng xuất'
            }
        ]
        const listUtilitiesItem = [
            {
                icon: 'check',
                name: 'Xác thực tài khoản bác sĩ',
                navigation: 'VerifyDoctorScreen'
            }
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
                });
        }
        this.setState({
            listSettingsItem: listDefaultItemTemp,
            listUtilitiesItem: listUtilitiesItem
        })
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.componentWillMount();
            }
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View>
                    <ImageBackground
                        source={{ uri: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg' }}
                        style={styles.coverPhoto}
                    >
                        <View style={styles.containerTextImage}>
                            <Avatar
                                large
                                rounded
                                source={{ uri: this.state.user.avatar.includes('localhost') ? this.state.user.avatar.replace('http://localhost:3000', IPServer.ip) : this.state.user.avatar }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
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
                                        onPress={() => navigate(l.navigation)}
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
                                        onPress={() => navigate(l.navigation)}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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