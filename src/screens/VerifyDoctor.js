import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeButton from 'react-native-really-awesome-button';
import MultiSelect from 'react-native-multiple-select';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';

const ImagePicker = require("react-native-image-picker");

const options = {
    title: "Chọn ảnh từ:",
    quality: 1,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

let { width, height } = Dimensions.get("window");

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadIdentificationFontImage: 'https://www.thinknextgen.com/edu_image/default-no-image.png',
            uploadIdentificationBackImage: 'https://www.thinknextgen.com/edu_image/default-no-image.png',
            uploadDiplomaImage: 'https://www.thinknextgen.com/edu_image/default-no-image.png',
            spinner: false,
            selectedItems: [],
            departments: []
        };
    }

    componentWillMount() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            this.fetchData();
        });
    }

    fetchData = async () => {
        const responseDepartment = await fetch(IPServer.ip + '/department')
        const jsonDepartment = await responseDepartment.json();
        const departmentItems = jsonDepartment.doc.map((e, i) => {
            const { _id, name } = e;
            return { id: _id, name }
        })
        this.setState({ items: departmentItems, spinner: !this.state.spinner });
    }

    onUploadIdentificationFontImage() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                console.log(response.uri)
                this.setState({ uploadIdentificationFontImage: response.uri });
            }
        });
    }

    onUploadIdentificationBackImage() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                this.setState({ uploadIdentificationBackImage: response.uri });
            }
        });
    }

    onUploadDiplomaImage() {
        ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("ImagePicker Error: ", response.error);
            } else if (response.customButton) {
                console.log("User tapped custom button: ", response.customButton);
            } else {
                this.setState({ uploadDiplomaImage: response.uri });
            }
        });
    }

    onSelectedItemsChange = selectedItems => {
        const departments = selectedItems.map((e, i) => {
            return this.state.items.find(x => x.id === e).name
        })
        this.setState({ selectedItems, departments });
    };


    onSendVerify() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            const body = new FormData();
            body.append('imageOfIdentificationFront', {
                uri: this.state.uploadIdentificationFontImage,
                type: 'image/jpg',
                name: 'image.jpg'
            })
            body.append('imageOfIdentificationBack', {
                uri: this.state.uploadIdentificationBackImage,
                type: 'image/jpg',
                name: 'image.jpg'
            })
            body.append('imageOfDiploma', {
                uri: this.state.uploadDiplomaImage,
                type: 'image/jpg',
                name: 'image.jpg'
            })
            this.state.departments.forEach(e => {
                body.append('departments', e)
            })
            fetch(IPServer.ip + '/user/' + global.user.userId, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${global.token}`
                }, body
            }).then(response => {
                this.refs.toast.show('Gửi thành công');
                this.setState({
                    spinner: !this.state.spinner
                })
            }).catch(err => {
                this.setState({
                    spinner: !this.state.spinner
                })
                this.refs.toast.show('Gửi thất bại');
                console.log(err)
            });
        });
    }

    render() {
        const selectedItems = this.state.selectedItems;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: AppColors.color }}>
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
                        <View style={{ alignItems: 'center' }}>
                            <Text h4 style={{ color: 'white', fontFamily: Font.textFont }}>Hình ảnh chứng minh nhân dân</Text>
                        </View>
                        <Text h5 style={{ fontSize: 19, color: 'white', fontFamily: Font.textFont }}>Mặt trước</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.onUploadIdentificationFontImage()} style={{ borderWidth: 1, width: width * 0.8 }}>
                                <Image
                                    style={styles.imageUpload}
                                    source={{ uri: this.state.uploadIdentificationFontImage }} />
                            </TouchableOpacity>
                        </View>
                        <Text h5 style={{ fontSize: 19, color: 'white', fontFamily: Font.textFont }}>Mặt sau</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.onUploadIdentificationBackImage()} style={{ borderWidth: 1, width: width * 0.8 }}>
                                <Image
                                    style={styles.imageUpload}
                                    source={{ uri: this.state.uploadIdentificationBackImage }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <View style={{ alignItems: 'center' }}>
                            <Text h4 style={{ color: 'white', fontFamily: Font.textFont }} > Hình ảnh bằng cấp bác sĩ</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.onUploadDiplomaImage()} style={{ borderWidth: 1, width: width * 0.8 }}>
                                <Image
                                    style={styles.imageUpload}
                                    source={{ uri: this.state.uploadDiplomaImage }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: '3%' }}>
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
                            altFontFamily="ProximaNova-Light"
                            tagRemoveIconColor="#0097A7"
                            tagBorderColor="white"
                            tagTextColor="#424242"
                            selectedItemTextColor={AppColors.color}
                            selectedItemIconColor="#CCC"
                            itemTextColor="#000"
                            displayKey="name"
                            searchInputStyle={{ color: '#grey' }}
                            submitButtonColor="#0097A7"
                            submitButtonText="Đồng ý"
                        />

                        <View>
                            {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
                        </View>

                    </View>
                    <View style={{ alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}>
                        <View style={styles.buttonGroup}>
                            <AwesomeButton
                                width={width * 0.8}
                                backgroundColor={'white'}
                                borderRadius={7}
                                onPress={() => this.onSendVerify()}>
                                <Text style={{ fontFamily: Font.textFont, fontSize: 17, fontWeight: 'bold' }}>Gửi xác thực</Text>
                            </AwesomeButton>
                        </View>
                    </View>
                </View>
                <Toast ref="toast" />
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
    imageUpload: {
        width: '100%',
        height: height * 0.3
    }
});