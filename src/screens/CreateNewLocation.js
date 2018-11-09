import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-easy-toast'
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ImagePicker = require("react-native-image-picker");

const options = {
    title: "Chọn ảnh từ:",
    quality: 1,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

export default class CreateNewLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Test",
            address: "Test address",
            phoneNumber: "09020309",
            website: "muahaha.com",
            listUploadImage: [{
                uri: require('../img/NoImageAvailable.png')
            }, {
                uri: require('../img/NoImageAvailable.png')
            }, {
                uri: require('../img/NoImageAvailable.png')
            }],
        };
    }

    uploadPhoto() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                const listUploadImage = this.state.listUploadImage;
                let listUploadImageTemp = listUploadImage;
                for (const o in listUploadImage) {
                    if (listUploadImage[o].uri < Number.MAX_SAFE_INTEGER) {
                        listUploadImageTemp = []
                    }
                    this.setState({
                        listUploadImage: []
                    });
                    break;
                }
                const uriTemp = { uri: response.uri };
                listUploadImageTemp.push({ uri: uriTemp });
                this.setState({ listUploadImage: listUploadImageTemp });
                console.log(this.state.listUploadImage)
            }
        });
    }

    createLocation = async () => {
        const body = new FormData();
        body.append('_idDoctor', '5b94ce2b6b34ae003a557c33')
        body.append('name', this.state.name);
        body.append('address', this.state.address);
        body.append('department', this.state.website);
        body.append('phoneNumber', this.state.phoneNumber);
        this.state.listUploadImage.map(e => {
            body.append('imageUrls', {
                uri: Object.values(e.uri)[0],
                type: 'image/jpg',
                name: 'image.jpg'
            })
        })
        console.log(body)
        fetch(IPServer.ip + '/location', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            }, body
        }).then(response => {
            this.refs.toast.show('Thành công');
            global.allLocations.push()
        }).catch(err => {
            this.refs.toast.show('Thất bại');
            console.log(err)
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                {/* <ImageBackground source={require('../img/backgroundLogin.png')} style={styles.backgroundImage}> */}
                <TouchableOpacity onPress={() => navigate("RootDrawer")}>
                    <View style={styles.backButtonContainer}>
                        <Icon name={'arrow-long-left'} size={27} color={'grey'} />
                    </View>
                </TouchableOpacity>

                <View style={styles.containerInputGroup}>
                    <View>
                        <InputGroup style={styles.inputGroup}>
                            <Icon name={'user'} size={27} color={AppColors.color} />
                            <Input
                                style={styles.input}
                                placeholder="Tên địa điểm"
                                placeholderTextColor={AppColors.color}
                                autoCorrect={false}
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.addressInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup style={styles.inputGroup}>
                            <Icon name={'address'} size={27} color={AppColors.color} />
                            <Input
                                style={styles.input}
                                placeholder="Địa chỉ"
                                placeholderTextColor={AppColors.color}
                                autoCorrect={false}
                                onChangeText={address => this.setState({ address })}
                                value={this.state.address}
                                ref={(input) => { this.addressInput = input; }}
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.phoneNumberInput._root.focus() }} />
                        </InputGroup>

                        <InputGroup style={styles.inputGroup}>
                            <Icon name={'phone'} size={27} color={AppColors.color} />
                            <Input
                                style={styles.input}
                                placeholder="Số điện thoại"
                                placeholderTextColor={AppColors.color}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                                value={this.state.phoneNumber}
                                keyboardType="numeric"
                                autoCorrect={false}
                                ref={(input) => { this.phoneNumberInput = input; }}
                                onSubmitEditing={() => { this.emailInput._root.focus() }}
                            />
                        </InputGroup>

                        <InputGroup style={styles.inputGroup}>
                            <IconMaterialIcons name={'public'} size={27} color={AppColors.color} />
                            <Input
                                style={styles.input}
                                placeholder="Website"
                                placeholderTextColor={AppColors.color}
                                onChangeText={website => this.setState({ website })}
                                value={this.state.website}
                                autoCorrect={false}
                                ref={(input) => { this.websiteInput = input; }}
                            />
                        </InputGroup>
                    </View>

                    <FlatList
                        style={{ marginTop: '3%', height: height * 0.33 }}
                        data={this.state.listUploadImage}
                        horizontal={true}
                        renderItem={({ item: rowData }) => {
                            return (
                                <View style={[styles.rowView, { borderWidth: 1 }]}>
                                    <Image
                                        style={styles.imageUpload}
                                        source={rowData.uri} />
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View style={[styles.containerLogo, { marginTop: '3%' }]} >
                        <Button
                            onPress={() => this.uploadPhoto()}
                            title='Thêm hình'
                            buttonStyle={{
                                backgroundColor: AppColors.color,
                                width: 150,
                                height: 30,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                        />
                    </View>
                    <View style={styles.buttonGroup}>
                        <Button
                            onPress={() => this.createLocation()}
                            title='Thêm địa điểm'
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
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    rowView: {
        flexDirection: 'row'
    },
    backButtonContainer: {
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "5%"
    },
    containerInputGroup: {
        marginLeft: "6%",
        marginRight: "6%"
    },
    containerLogo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: '10%'
    },
    buttonGroup: {
        marginTop: "7%",
        marginLeft: "4%",
        marginBottom: '30%'
    },
    backgroundImage: {
        width: width,
        height: height
    },
    text: {
        color: 'white',
        fontSize: 18
    },
    line: {
        backgroundColor: '#E0E0E0',
        height: height * 0.001,
        marginTop: '3%'
    },
    lineVertical: {
        backgroundColor: 'black',
        width: height * 0.005
    },
    imageUpload: {
        width: width * 0.5,
        height: height * 0.3
    },
    input: {
        color: 'black',
        marginLeft: "3%"
    },
    inputGroup: {
        borderColor: '#BDBDBD',
        borderBottomWidth: 1.5
    },
});