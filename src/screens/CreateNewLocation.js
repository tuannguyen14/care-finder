import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, Picker } from "react-native";
import { InputGroup, Input } from 'native-base';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-easy-toast'
import { IPServer } from '../Server/IPServer.js';
import { Sae } from 'react-native-textinput-effects';
import axios from 'axios';
let { width, height } = Dimensions.get("window");
import { Dropdown } from 'react-native-material-dropdown';
import { AppColors } from '../styles/AppColors.js';

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
            dataCities: [],
            dataDistricts: [],
            dataWards: [],
            city: "",
            district: "",
            ward: "",
            indexCity: 0,
            indexDistricts: 0,
            ready: false,
            street: ""
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch(IPServer.ip + '/city');
        const json = await response.json();
        this.setState({ dataCities: json.doc, ready: true })
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
        let address = {};
        address.street = this.state.street;
        address.ward = this.state.ward;
        address.district = this.state.district;
        address.city = this.state.city;
        body.append('_idDoctor', '5b94ce2b6b34ae003a557c33')
        body.append('name', this.state.name);
        body.append('address', address);
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

    getAllCities = () => {
        const a = this.state.dataCities.map((e, i) => {
            conso
            return { value: e.name }
        })
    }

    render() {
        const { navigate } = this.props.navigation;
        console.log("aaa", this.state.dataCities[this.state.indexCity])
        return (
            <ScrollView >
                <View style={styles.backgroundImage}>
                    <TouchableOpacity onPress={() => navigate("RootDrawer")}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'#BDBDBD'} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require("../img/hospitalLogo.png")}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <View>
                            <Sae
                                label={'Tên địa điểm'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'#2979FF'}
                                returnKeyType={"next"}
                                onChangeText={name => this.setState({ name })}
                            />
                            <Sae
                                label={'Số điện thoại'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'#2979FF'}
                                keyboardType="numeric"
                                returnKeyType={"next"}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                            <Sae
                                label={'Website'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'#2979FF'}
                                returnKeyType={"next"}
                                onChangeText={website => this.setState({ website })}
                            />
                            <Sae
                                label={'Số nhà + Tên đường'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={FontAwesomeIcon}
                                iconName={'pencil'}
                                iconColor={'#2979FF'}
                                returnKeyType={"next"}
                                onChangeText={street => this.setState({ street })}
                            />
                            {!this.state.ready ? null :
                                <View>
                                    <Picker
                                        selectedValue={this.state.city}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ city: itemValue, indexCity: itemIndex })}>
                                        {this.state.dataCities.map((e, i) => {
                                            return <Picker.Item label={e.name} value={e.name} />
                                        })}
                                    </Picker>
                                    <Picker
                                        selectedValue={this.state.district}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ district: itemValue, indexDistricts: itemIndex })}>
                                        {this.state.dataCities[this.state.indexCity].districts.map((e, i) => {
                                            return <Picker.Item label={e.name} value={e.name} />
                                        })}
                                    </Picker>
                                    <Picker
                                        selectedValue={this.state.ward}
                                        style={styles.pickerStyle}
                                        onValueChange={(itemValue, itemIndex) => this.setState({ ward: itemValue })}>
                                        {this.state.dataCities[this.state.indexCity].districts[this.state.indexDistricts].wards.map((e, i) => {
                                            return <Picker.Item label={e.name} value={e.name} />
                                        })}
                                    </Picker>
                                </View>
                            }
                        </View>

                        <View>
                            <FlatList
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

                        </View>
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
                    <View style={[styles.containerLogo]} >
                        <Button
                            onPress={() => this.uploadPhoto()}
                            title='Thêm hình'
                            buttonStyle={{
                                backgroundColor: "#E57373",
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
                                backgroundColor: "#E57373",
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5,
                            }}
                        />
                    </View>

                    <Toast ref="toast" />
                </View >
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    rowView: {
        flexDirection: 'row'
    },
    backButtonContainer: {
        marginLeft: "5%",
        marginTop: "1%"
    },
    inputGroup: {
        marginLeft: "6.2%",
        marginRight: "6.2%",
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
        backgroundColor: "white"
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
    imageUpload: {
        width: width * 0.5,
        height: height * 0.3
    },
    pickerStyle: {
        height: 50,
        width: (width * 90) / 100,
        color: "#424242",
        alignSelf: "center",
    }
});