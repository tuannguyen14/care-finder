import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ImageBackground,
    Platform,
    ScrollView
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { Button, Header } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';

const options = {
    title: "Chọn ảnh từ:",
    quality: 0.01,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <Header
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'Thông tin người dùng', style: { color: '#fff', fontSize: 20 } }}
                />
                <TouchableOpacity onPress={() => this.changeCoverPhoto()}>
                    <ImageBackground
                        source={{ uri: this.state.coverPhoto }}
                        style={styles.coverPhoto}
                    >
                        <Text style={styles.textEditCoverPhoto}>Cập nhật ảnh bìa</Text>
                        <Image
                            source={require("../img/Edit.png")}
                            style={styles.editImage}
                        />
                        <View style={styles.containerTextImage}>
                            <TouchableOpacity onPress={() => this.changeAvatar()}>
                                <Image
                                    source={{ uri: this.state.avatar }}
                                    style={styles.avatar}
                                >
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={styles.containerBelow}>
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Tên: </Text>
                        <Text style={styles.textState}>{this.state.name}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Email: </Text>
                        <Text style={styles.textState}>{this.state.email}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Số điện thoại: </Text>
                        <Text style={styles.textState}>{this.state.phoneNumber}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Giới tính: </Text>
                        <Text style={styles.textState}>{this.state.sex}</Text>
                    </View>

                    <View style={{ marginTop: '5%', justifyContent: 'center', alignItems: 'center' }}>
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
                    </View>
                </View>
                <Toast ref="toast" />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
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
        width: 60,
        height: 60,
        ...Platform.select({
            ios: {
                borderRadius: 30.5
            },
            android: {
                borderRadius: 55
            }
        })
    },
    coverPhoto: {
        width: "100%",
        height: 260
    },
    containerTextImage: {
        marginTop: "43%",
        marginLeft: "3%",
        width: 60,
        height: 60
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
        right: 0,
        bottom: 0,
        marginRight: "9%",
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
        fontSize: 21
    },
    textState: {
        fontSize: 21
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