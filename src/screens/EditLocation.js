import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView, FlatList } from "react-native";
import { Text, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { Picker } from 'native-base';
import materialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import { Fumi } from 'react-native-textinput-effects';
import MapView from 'react-native-maps';
import AwesomeButton from 'react-native-really-awesome-button';
import { AppColors } from '../styles/AppColors.js';
import axios from 'axios';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.007;
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

export default class EditLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Test",
            phoneNumber: "0902807067",
            website: "test.com",
            listUploadImage: [],
            newListUploadImage: [],
            dataCities: [],
            dataDistricts: [],
            dataWards: [],
            city: "",
            district: "",
            ward: "",
            indexCity: 0,
            indexDistricts: 0,
            ready: false,
            street: "",
            spinner: false,
            selectedItems: [],
            departments: [],
            items: [],
            location: this.props.navigation.state.params.location,
            region: new MapView.AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
            markerNewLocation: {
                latitude: 0,
                longitude: 0
            },
            listLocation: Array.from(global.allLocations),
        };
    }

    componentWillMount() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            let location = this.state.location;
            let listUploadImage = [];
            let markerNewLocation = location.coordinates;
            let street = location.address.street;
            let city = location.address.city;
            let district = location.address.district;
            let ward = location.address.ward;
            location.imageUrls.forEach((e) => {
                console.log(e)
                listUploadImage.push(e);
            });
            this.setState({
                listUploadImage,
                markerNewLocation,
                street,
                city,
                district,
                ward
            });
            this.fetchData();
            this.getCurrentLocation();
        });
    }

    onSelectedItemsChange = selectedItems => {
        const departments = selectedItems.map((e, i) => {
            return this.state.items.find(x => x.id === e).name
        })
        this.setState({ selectedItems, departments });
    };


    fetchData = async () => {
        const response = await fetch(IPServer.ip + '/city');
        const json = await response.json();
        const responseDepartment = await fetch(IPServer.ip + '/department')
        const jsonDepartment = await responseDepartment.json();
        const departmentItems = jsonDepartment.doc.map((e, i) => {
            const { _id, name } = e;
            return { id: _id, name }
        })
        this.setState({ dataCities: json.doc, items: departmentItems, ready: true, spinner: !this.state.spinner });
    }


    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: new MapView.AnimatedRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    })
                });
            },
            error => console.log(error.message),
        );
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
                let newListUploadImage = this.state.newListUploadImage;
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
                listUploadImageTemp.push(response.uri);
                newListUploadImage.push({ uri: uriTemp })
                this.setState({ listUploadImage: listUploadImageTemp, newListUploadImage });
            }
        });
    }

    onMapPress(e) {
        this.setState({
            markerNewLocation: e.nativeEvent.coordinate
        });
    }

    onConfirm() {
        this.setState({
            spinner: true
        }, () => {
            const body = new FormData();
            body.append('street', this.state.street);
            body.append('ward', this.state.ward);
            body.append('district', this.state.district);
            body.append('city', this.state.city);
            console.log('1' + '-------' + this.state.newListUploadImage);
            this.state.newListUploadImage.map(e => {
                console.log(e);
                body.append('imageUrls', {
                    uri: Object.values(e.uri)[0],
                    type: 'image/jpg',
                    name: 'image.jpg'
                });
            });
            body.append('latitude', this.state.markerNewLocation.latitude)
            body.append('longitude', this.state.markerNewLocation.longitude)

            axios.patch(IPServer.ip + '/location/' + this.state.location._id, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data.doc);
                    allLocations = global.allLocations;
                    allLocations.forEach((e, i) => {
                        if (e._id == this.state.location._id) {
                            array.splice(i, 1);
                        }
                    });
                    this.setState({
                        spinner: false,
                        isCreateSuccess: true
                    });
                }).catch(err => {
                    this.setState({
                        spinner: false
                    });
                });
        });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: AppColors.backgroundColor }}>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'SỬA THÔNG TIN ĐỊA ĐIỂM', style: [Styles.header, { color: '#fff' }] }}
                />
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />

                    <View>

                        {!this.state.ready ? null :
                            <View>
                                <Text h4 style={{ fontFamily: Font.textFont }}>Địa điểm</Text>
                                <Fumi
                                    value={this.state.street}
                                    style={styles.fumi}
                                    label={'Số nhà + Tên đường'}
                                    labelStyle={{ color: "#757575", fontWeight: "" }}
                                    inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                    autoCorrect={false}
                                    iconClass={materialCommunityIconsIcon}
                                    iconName={'map-marker'}
                                    iconColor={AppColors.color}
                                    returnKeyType={"next"}
                                    onChangeText={street => this.setState({ street })}
                                />
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

                                <MapView
                                    ref={(el) => (this.map = el)}
                                    onPress={(e) => this.onMapPress(e)}
                                    provider={this.props.provider}
                                    style={styles.map}
                                    initialRegion={this.state.region}
                                    showsUserLocation={true}
                                    loadingEnabled={true}
                                >
                                    <MapView.Marker
                                        coordinate={this.state.markerNewLocation}
                                    />
                                    {this.state.listLocation.map(marker => (
                                        <MapView.Marker
                                            coordinate={marker.coordinates}
                                            image={require('../img/hospitalMarker.png')}
                                        >
                                            <MapView.Callout>
                                                <View style={{ alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: Font.textFont, color: 'black', fontWeight: 'bold', fontSize: 19 }}>{marker.name}</Text>
                                                    <Text style={{ fontFamily: Font.textFont, }}>{marker.address.street + ', ' + marker.address.ward + ', ' + marker.address.district + ', ' + marker.address.city}</Text>
                                                </View>
                                            </MapView.Callout>
                                        </MapView.Marker>
                                    ))}
                                </MapView>
                            </View>
                        }

                        <View>
                            <Text h4 style={{ fontFamily: Font.textFont }}>Hình ảnh</Text>
                            <View style={{ borderWidth: 1 }}>
                                <FlatList
                                    data={this.state.listUploadImage}
                                    horizontal={true}
                                    renderItem={({ item: rowData }) => {
                                        return (
                                            <View style={[styles.rowView]}>
                                                <Image
                                                    style={styles.imageUpload}
                                                    source={{ uri: rowData.includes('localhost') ? rowData.replace('http://localhost:3000', IPServer.ip) : rowData }} />
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ marginTop: '1%' }} >
                                <AwesomeButton
                                    width={width * 0.5}
                                    backgroundColor={'white'}
                                    borderRadius={7}
                                    onPress={() => this.uploadPhoto()}>
                                    <Text style={{ fontFamily: Font.textFont, fontSize: 17, fontWeight: 'bold' }}>Thêm hình</Text>
                                </AwesomeButton>
                            </View>
                            <View style={styles.buttonGroup}>
                                <AwesomeButton
                                    width={width * 0.8}
                                    backgroundColor={'white'}
                                    borderRadius={7}
                                    onPress={() => this.onConfirm()}>
                                    <Text style={{ fontFamily: Font.textFont, fontSize: 17, fontWeight: 'bold' }}>Đồng ý</Text>
                                </AwesomeButton>
                            </View>
                            {
                                this.state.isCreateSuccess ?
                                    <View style={{ marginBottom: '3%', alignContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: 'green', fontFamily: Font.textFont, fontSize: 19 }}>Sửa thành công</Text>
                                        <Icon name={'check'} size={23} color={'green'} />
                                    </View>
                                    :
                                    <View style={{ marginBottom: '3%' }} />
                            }
                        </View>
                    </View>
                    <Toast ref="toast" />
                </View >
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: "3%",
        marginRight: "3%",
        flex: 1,
        maxHeight: 3000
    },
    rowView: {
        flexDirection: 'row'
    },
    backButtonContainer: {
        marginTop: "5%"
    },
    buttonGroup: {
        marginTop: '7%'
    },
    text: {
        fontSize: 17,
        fontFamily: Font.textFont
    },
    imageUpload: {
        width: width * 0.7,
        height: height * 0.3
    },
    pickerStyle: {
        height: 50,
        width: (width * 90) / 100,
        color: "#424242",
        alignSelf: "center",
    },
    fumi: {
        width: width * 0.9,
        height: 70,
        borderRadius: 100,
        marginTop: '1%'
    },
    map: {
        height: height / 2.5
    },
    backgroundDatePicker: {
        borderRadius: 100,
        backgroundColor: '#F5F5F5'
    }
});