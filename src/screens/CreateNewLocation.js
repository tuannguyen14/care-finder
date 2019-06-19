import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, FlatList } from "react-native";
import { Text, CheckBox, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Picker } from 'native-base';
import materialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast'
import { Fumi } from 'react-native-textinput-effects';
import Spinner from 'react-native-loading-spinner-overlay';
import MapView from 'react-native-maps';
import AwesomeButton from 'react-native-really-awesome-button';
import { AppColors } from '../styles/AppColors.js';
import MultiSelect from 'react-native-multiple-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
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

export default class CreateNewLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Test",
            phoneNumber: "0902807067",
            website: "test.com",
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
            street: "",
            spinner: false,
            selectedItems: [],
            departments: [],
            items: [],
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
            timeStart: '00:00',
            timeEnd: '00:00',

            isCloseAllDay: false,
            monday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            tuesday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            wednesday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            thursday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            friday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            saturday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            sunday: {
                from: '00:00',
                to: '00:00',

                isCloseAllDay: false
            },
            booleanMonday: true,
            booleanTuesday: false,
            booleanWednesday: false,
            booleanThursday: false,
            booleanFriday: false,
            booleanSaturday: false,
            booleanSunday: false,
            isCreateSuccess: false
        };
    }

    componentWillMount() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
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

    _showDateTimePickerStart = () => this.setState({ isDateTimePickerStartVisible: true });

    _hideDateTimePickerStart = () => this.setState({ isDateTimePickerStartVisible: false });

    _showDateTimePickerEnd = () => this.setState({ isDateTimePickerEndVisible: true });

    _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerEndVisible: false });

    _handleDatePickedStart = (date) => {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (hours.length == 1) {
            hours = '0' + hours;
        }
        if (minutes.length == 1) {
            minutes = '0' + minutes;
        }
        this.setState({ timeStart: hours + ":" + minutes });
        this._hideDateTimePickerStart();
    };

    _handleDatePickedEnd = (date) => {
        let hours = date.getHours().toString();
        let minutes = date.getMinutes().toString();
        if (hours.length == 1) {
            hours = '0' + hours;
        }
        if (minutes.length == 1) {
            minutes = '0' + minutes;
        }
        this.setState({ timeEnd: hours + ":" + minutes }, () => this.onPickDateTime());
        this._hideDateTimePickerEnd();
    };

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
            }
        });
    }

    createLocation = async () => {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            const body = new FormData();
            body.append('_idDoctor', global.user.userId);
            body.append('name', this.state.name);
            body.append('street', this.state.street);
            body.append('ward', this.state.ward);
            body.append('district', this.state.district);
            body.append('city', this.state.city);
            body.append('phoneNumber', this.state.phoneNumber);
            body.append('website', this.state.website);

            this.state.departments.forEach(e => {
                body.append('departments', e)
            })
            body.append('timeOpen', JSON.stringify([
                [this.state.sunday], // chủ nhật
                [this.state.monday], // thứ 2
                [this.state.tuesday], // thứ 3
                [this.state.wednesday], // thứ 4
                [this.state.thursday],// thứ 5
                [this.state.friday],// thứ 6
                [this.state.saturday] // thứ 7
            ]))
            this.state.listUploadImage.map(e => {
                body.append('imageUrls', {
                    uri: Object.values(e.uri)[0],
                    type: 'image/jpg',
                    name: 'image.jpg'
                })
            });
            body.append('latitude', this.state.markerNewLocation.latitude)
            body.append('longitude', this.state.markerNewLocation.longitude)
            fetch(IPServer.ip + '/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, body
            }).then(response => {
                global.allLocations.push(response);
                this.setState({
                    spinner: !this.state.spinner,
                    isCreateSuccess: true
                }, () => console.log(global.allLocations));
            }).catch(err => {
                this.setState({
                    spinner: !this.state.spinner
                })
                this.refs.toast.show('Tạo thất bại');
                console.log(err)
            });
        });
    }

    onMapPress(e) {
        this.setState({
            markerNewLocation: e.nativeEvent.coordinate
        });
    }

    onPickDateTime() {
        if (this.state.booleanMonday) {
            this.setState({
                monday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        } else if (this.state.booleanTuesday) {
            this.setState({
                tuesday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
        else if (this.state.booleanWednesday) {
            this.setState({
                wednesday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
        else if (this.state.booleanThursday) {
            this.setState({
                thursday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
        else if (this.state.booleanFriday) {
            this.setState({
                friday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
        else if (this.state.booleanSaturday) {
            this.setState({
                saturday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
        else if (this.state.booleanSunday) {
            this.setState({
                sunday: {
                    from: this.state.timeStart,
                    to: this.state.timeEnd,
                    isCloseAllDay: false
                }
            });
        }
    }

    onCheckCloseOrOpenAllDay() {
        if (this.state.booleanMonday) {
            this.setState({
                monday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        } else if (this.state.booleanTuesday) {
            this.setState({
                tuesday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
        else if (this.state.booleanWednesday) {
            this.setState({
                wednesday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
        else if (this.state.booleanThursday) {
            this.setState({
                thursday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
        else if (this.state.booleanFriday) {
            this.setState({
                friday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
        else if (this.state.booleanSaturday) {
            this.setState({
                saturday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
        else if (this.state.booleanSunday) {
            this.setState({
                sunday: {
                    from: '00:00',
                    to: '00:00',
                    isCloseAllDay: this.state.isCloseAllDay
                }
            });
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        const selectedItems = this.state.selectedItems;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: AppColors.backgroundColor }}>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'TẠO ĐỊA ĐIỂM CỦA BẠN', style: [Styles.header, { color: '#fff' }] }}
                />
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.spinner}
                        textContent={'Đang xử lý'}
                        textStyle={{ color: 'white' }}
                    />

                    <View>
                        <Text h4 style={{ fontFamily: Font.textFont }}>Thông tin cơ bản</Text>
                        <View style={{ alignItems: 'center' }}>
                            <Fumi
                                style={styles.fumi}
                                label={'Tên địa điểm'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
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
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
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
                            <Fumi
                                style={styles.fumi}
                                label={'Website'}
                                labelStyle={{ color: "#757575", fontWeight: "" }}
                                inputStyle={{ color: "#424242", fontFamily: Font.textFont }}
                                autoCorrect={false}
                                iconClass={Icon}
                                iconName={'globe'}
                                iconColor={AppColors.color}
                                returnKeyType={"next"}
                                onChangeText={website => this.setState({ website })}
                            />

                        </View>
                        <View style={{ marginTop: '3%', marginLeft: '3%', marginRight: '3%' }}>
                            <MultiSelect
                                hideTags
                                items={this.state.items}
                                uniqueKey="id"
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={this.onSelectedItemsChange}
                                selectedItems={selectedItems}
                                selectText="Chuyên khoa"
                                searchInputPlaceholderText="Chọn chuyên khoa"
                                onChangeInput={(text) => console.log(text)}
                                altFontFamily={Font.textFont}
                                tagRemoveIconColor="#0097A7"
                                tagBorderColor="black"
                                tagTextColor="#424242"
                                selectedItemTextColor={AppColors.color}
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#grey' }}
                                submitButtonColor={AppColors.color}
                                submitButtonText="Đồng ý"
                            />

                            <View>
                                {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                            </View>

                        </View>
                        <View>
                            <Text h4 style={{ fontFamily: Font.textFont }}>Giờ hoạt động</Text>
                            <View>
                                <ScrollView horizontal={true}>
                                    {
                                        this.state.booleanMonday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.monday.isCloseAllDay, booleanMonday: true, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.monday.from, timeEnd: this.state.monday.to, })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ hai</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity> :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.monday.isCloseAllDay, booleanMonday: true, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.monday.from, timeEnd: this.state.monday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ hai</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanTuesday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.tuesday.isCloseAllDay, booleanMonday: false, booleanTuesday: true, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.tuesday.from, timeEnd: this.state.tuesday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Ba</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.tuesday.isCloseAllDay, booleanMonday: false, booleanTuesday: true, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.tuesday.from, timeEnd: this.state.tuesday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Ba</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanWednesday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.wednesday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: true, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.wednesday.from, timeEnd: this.state.wednesday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Tư</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.wednesday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: true, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.wednesday.from, timeEnd: this.state.wednesday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Tư</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanThursday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.thursday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: true, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.thursday.from, timeEnd: this.state.thursday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Năm</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.thursday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: true, booleanFriday: false, booleanSaturday: false, booleanSunday: false, timeStart: this.state.thursday.from, timeEnd: this.state.thursday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Năm</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanFriday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.friday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: true, booleanSaturday: false, booleanSunday: false, timeStart: this.state.friday.from, timeEnd: this.state.friday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Sáu</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.friday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: true, booleanSaturday: false, booleanSunday: false, timeStart: this.state.friday.from, timeEnd: this.state.friday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Sáu</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanSaturday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.saturday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: true, booleanSunday: false, timeStart: this.state.saturday.from, timeEnd: this.state.saturday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Bảy</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.saturday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: true, booleanSunday: false, timeStart: this.state.saturday.from, timeEnd: this.state.saturday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Thứ Bảy</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }

                                    {
                                        this.state.booleanSunday ?
                                            <TouchableOpacity style={styles.backgroundDatePicker} onPress={() => this.setState({ isCloseAllDay: this.state.sunday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: true, timeStart: this.state.sunday.from, timeEnd: this.state.sunday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Chủ Nhật</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => this.setState({ isCloseAllDay: this.state.sunday.isCloseAllDay, booleanMonday: false, booleanTuesday: false, booleanWednesday: false, booleanThursday: false, booleanFriday: false, booleanSaturday: false, booleanSunday: true, timeStart: this.state.sunday.from, timeEnd: this.state.sunday.to })}>
                                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]}>
                                                    <Text style={styles.text}>Chủ Nhật</Text>
                                                    <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                                </View>
                                            </TouchableOpacity>
                                    }
                                </ScrollView>
                                <View style={[styles.rowView, { height: 30 }]}>
                                    <View style={[styles.rowView, { flex: 2, alignItems: 'center', justifyContent: 'center' }]}>
                                        <Text style={[styles.text, { fontSize: 17 }]}>Từ</Text>
                                        <View style={{ marginLeft: '3%', marginRight: '1.3%' }}>
                                            <TouchableOpacity style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]} onPress={this._showDateTimePickerStart}>
                                                <Text style={styles.text}>{this.state.timeStart}</Text>
                                                <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                mode='time'
                                                isVisible={this.state.isDateTimePickerStartVisible}
                                                onConfirm={this._handleDatePickedStart}
                                                onCancel={this._hideDateTimePickerStart}
                                            />
                                        </View>
                                        <Text style={styles.text}>giờ</Text>
                                    </View>
                                    <View style={[styles.rowView, { flex: 2, alignItems: 'center', justifyContent: 'center' }]}>
                                        <Text style={styles.text}>đến</Text>
                                        <View style={{ marginLeft: '3%', marginRight: '1.3%' }}>
                                            <TouchableOpacity style={[styles.rowView, { alignItems: 'center', justifyContent: 'center' }]} onPress={this._showDateTimePickerEnd}>
                                                <Text style={styles.text}>{this.state.timeEnd}</Text>
                                                <IconMaterialIcons name={'expand-more'} size={27} color={'black'} />
                                            </TouchableOpacity>
                                            <DateTimePicker
                                                mode='time'
                                                isVisible={this.state.isDateTimePickerEndVisible}
                                                onConfirm={this._handleDatePickedEnd}
                                                onCancel={this._hideDateTimePickerEnd}
                                            />
                                        </View>
                                        <Text style={styles.text}>giờ</Text>
                                    </View>
                                </View>
                                <Text style={[styles.text]}>Hoặc chọn</Text>
                                <View>
                                    <CheckBox
                                        center
                                        title='Đóng cửa'
                                        iconRight
                                        iconType='material'
                                        checkedIcon='clear'
                                        uncheckedIcon='add'
                                        checkedColor='red'
                                        checked={this.state.isCloseAllDay}
                                        onPress={() => this.setState({ isCloseAllDay: !this.state.isCloseAllDay }, () => this.onCheckCloseOrOpenAllDay())}
                                    />
                                </View>
                            </View>
                        </View>
                        {!this.state.ready ? null :
                            <View>
                                <Text h4 style={{ fontFamily: Font.textFont }}>Địa điểm</Text>
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
                                                    source={rowData.uri} />
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
                                    onPress={() => this.createLocation()}>
                                    <Text style={{ fontFamily: Font.textFont, fontSize: 17, fontWeight: 'bold' }}>Đồng ý</Text>
                                </AwesomeButton>
                            </View>
                            {
                                this.state.isCreateSuccess ?
                                    <View style={{ marginBottom: '3%', alignContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ color: 'green', fontFamily: Font.textFont, fontSize: 19 }}>Tạo thành công</Text>
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