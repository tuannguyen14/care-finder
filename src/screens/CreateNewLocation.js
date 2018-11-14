import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Dimensions, ScrollView, FlatList, Picker } from "react-native";
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import materialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast'
import { IPServer } from '../Server/IPServer.js';
import { Fumi } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';
let { width, height } = Dimensions.get("window");
import { AppColors } from '../styles/AppColors.js';
import MultiSelect from 'react-native-multiple-select';

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
            phoneNumber: "09020309",
            department: "muahaha.com",
            listUploadImage: [{
                uri: require('../img/NoImageAvailable.png')
            }, {
                uri: require('../img/NoImageAvailable.png')
            }, {
                uri: require('../img/NoImageAvailable.png')
            }],
            website: "",
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
            selectedItems : [],
            departments:[],
            items: []
        };
        
    }

    
    componentDidMount() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            this.fetchData();
        });
    }

    onSelectedItemsChange = selectedItems => {
      const departments = selectedItems.map((e,i) => {
        return this.state.items.find(x => x.id === e).name
      })
      this.setState({ selectedItems, departments });
    };
  

    fetchData = async () => {
        const response = await fetch(IPServer.ip + '/city');
        const json = await response.json();
        const responseDepartment = await fetch(IPServer.ip + '/department')
        const jsonDepartment = await responseDepartment.json();
        const departmentItems = jsonDepartment.doc.map((e,i) => {
          const {_id, name} = e;
          return {id:_id, name}
        })
        console.log(departmentItems)
        this.setState({ dataCities: json.doc,items: departmentItems, ready: true, spinner: !this.state.spinner });
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
        body.append('street', this.state.street);
        body.append('ward', this.state.ward);
        body.append('district', this.state.district);
        body.append('city', this.state.city);
        body.append('website', this.state.website)
        body.append('phoneNumber', this.state.phoneNumber);
        this.state.departments.forEach(e => {
          body.append('departments', e)
        })
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
        const selectedItems = this.state.selectedItems;

        return (
            <ScrollView style={{flex:1, backgroundColor: AppColors.color }}>
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />
                    <TouchableOpacity onPress={() => navigate("RootDrawer")}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>

                    <View>
                        <Text h4>Thông tin cơ bản</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Fumi
                                style={styles.fumi}
                                label={'Tên địa điểm'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={materialCommunityIconsIcon}
                                iconName={'hospital-building'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                onChangeText={name => this.setState({ name })}
                            />
                            <Fumi
                                style={styles.fumi}
                                label={'Số điện thoại'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={materialCommunityIconsIcon}
                                iconName={'phone'}
                                iconColor={AppColors.color}
                                keyboardType="numeric"
                                returnKeyType={"next"}
                                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                            />
                            <Fumi
                                style={styles.fumi}
                                label={'Website'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={materialCommunityIconsIcon}
                                iconName={'pencil'}
                                iconColor={'#2979FF'}
                                returnKeyType={"next"}
                                onChangeText={website => this.setState({ website })}
                            />
                            <Fumi
                                style={styles.fumi}
                                label={'Số nhà + Tên đường'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242" }}
                                autoCorrect={false}
                                iconClass={materialCommunityIconsIcon}
                                iconName={'map-marker'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                onChangeText={street => this.setState({ street })}
                            />
                        </View>
                        {!this.state.ready ? null :
                            <View style={{ marginTop: '3%' }}>
                                <Text h4>Địa điểm</Text>
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
                                <MultiSelect
                                  hideTags
                                  items={this.state.items}
                                  uniqueKey="id"
                                  ref={(component) => { this.multiSelect = component }}
                                  onSelectedItemsChange={this.onSelectedItemsChange}
                                  selectedItems={selectedItems}
                                  selectText="Chuyên khoa"
                                  searchInputPlaceholderText="Chọn chuyên khoa"
                                  onChangeInput={ (text)=> console.log(text)}
                                  altFontFamily="ProximaNova-Light"
                                  tagRemoveIconColor="#CCC"
                                  tagBorderColor="#CCC"
                                  tagTextColor="#CCC"
                                  selectedItemTextColor="#CCC"
                                  selectedItemIconColor="#CCC"
                                  itemTextColor="#000"
                                  displayKey="name"
                                  searchInputStyle={{ color: '#CCC' }}
                                  submitButtonColor="#CCC"
                                  submitButtonText="Submit"
                                />
                                <View>
                                  {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                                </View>
                            </View>
                        }

                        <View style={{ borderWidth: 1 }}>
                            <FlatList
                                data={this.state.listUploadImage}
                                horizontal={true}
                                renderItem={({ item: rowData }) => {
                                    return (
                                        <View style={[styles.rowView]}>
                                            <Image
                                                style={styles.imageUpload}
                                                source={rowData.uri} />
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <View style={[styles.containerLogo, { marginTop: '3%' }]} >
                                <Button
                                    onPress={() => this.uploadPhoto()}
                                    title='Thêm hình'
                                    textStyle={{ color: AppColors.color }}
                                    buttonStyle={{
                                        backgroundColor: 'white',
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
                                    textStyle={{ color: AppColors.color }}
                                    buttonStyle={{
                                        backgroundColor: 'white',
                                        width: 300,
                                        height: 45,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5,
                                    }}
                                />
                            </View>
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
        marginLeft: "6.2%",
        marginRight: "6.2%",
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
        marginTop: '7%',
        marginBottom: '30%'
    },
    text: {
        color: 'white',
        fontSize: 18
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
    },
    fumi: {
        width: width * 0.9,
        height: 70,
        borderRadius: 100,
        marginTop: '1%'
    }
});