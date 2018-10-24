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
import axios from 'axios';
const ImagePicker = require("react-native-image-picker");
import { IPServer } from "../Server/IPServer.js";
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
          firstName:"",
          lastName:"",
          gender: "",
          phoneNumber: "",
          email:"",
          follows:[],
          avatar:""
        };
    }

    componentWillMount() {
      axios.get(IPServer.ip +'/me',{
        headers: {
          "Authorization":`Bearer ${global.token}`
        },
      },).then(response => {
          const {firstName, phoneNumber,lastName, gender,follows,email,avatar} = response.data;
          console.log(response.data)
          this.setState({
            firstName,
            lastName,
            gender,
            phoneNumber,
            email,
            follows,
            avatar
          })
      }).catch(err => {
        console.log(err)
      })
    }

    changeAvatar() {
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

        }
    });
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        console.log(this.state.avatar)
        return (
            <ScrollView style={styles.container}>
                <Header
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'Thông tin người dùng', style: { color: '#fff', fontSize: 20 } }}
                />
                <TouchableOpacity >
                    <ImageBackground
                        source={{ uri: 'http://yodobi.com/4k-Wallpapers/4k-wallpapers-phone-Is-4K-Wallpaper.jpg' }}
                        style={styles.coverPhoto}
                    >
                      
                      <Text style={styles.textEditCoverPhoto}>{this.state.firstName} {this.state.lastName}</Text>
                      <View style={styles.containerTextImage}>
                          <TouchableOpacity onPress={() => this.changeAvatar()}>
                              <Image
                                  source={{ uri: !this.state.avatar?'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/27073235_1979315985729409_2921398959634109576_n.jpg?_nc_cat=108&_nc_ht=scontent.fsgn5-5.fna&oh=b316788eaf32322fc78fccbdca94c1e8&oe=5C484D2D':this.state.avatar.replace('http://localhost:3000',IPServer.ip) }}
                                  style={styles.avatar}
                              >
                              </Image>
                          </TouchableOpacity>
                      </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View>
                    
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Email </Text>
                        <Text style={styles.textState}>{this.state.email}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Điện thoại </Text>
                        <Text style={styles.textState}>{this.state.phoneNumber}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Giới tính </Text>
                        <Text style={styles.textState}>{this.state.gender}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Lượt theo dõi </Text>
                        <Text style={styles.textState}>{this.state.follows.length}</Text>
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
      alignItems:"center"

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
        alignSelf:"center",
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
        width:110
    },
    textState: {
        fontSize: 16
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