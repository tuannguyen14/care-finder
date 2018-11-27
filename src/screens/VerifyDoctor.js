import React, { Component } from 'react';
import { Dimensions, View, StyleSheet, FlatList, ScrollView, TouchableOpacity, Image } from "react-native";
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-easy-toast'
import Spinner from 'react-native-loading-spinner-overlay';
import AwesomeButton from 'react-native-really-awesome-button';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';

let { width, height } = Dimensions.get("window");

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadIdentificationFontImage: 'https://www.grocio.in/images/No_image_available.jpg',
            uploadIdentificationBackImage: 'https://www.grocio.in/images/No_image_available.jpg',
            uploadDiplomaImage: 'https://www.grocio.in/images/No_image_available.jpg',
            spinner: false,
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
            }
        });
    }

    render() {
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
                        <Text h4>Hình ảnh chứng minh nhân dân mặt trước và sau</Text>
                        <TouchableOpacity style={{ borderWidth: 1, flexDirection: 'row' }}>
                            <Image
                                style={styles.imageUpload}
                                source={{ uri: this.state.uploadIdentificationFontImage }} />
                            <Image
                                style={styles.imageUpload}
                                source={{ uri: this.state.uploadIdentificationBackImage }} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text h4>Hình ảnh bằng cấp bác sĩ</Text>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => this.uploadPhoto()} style={{ borderWidth: 1, width: width * 0.5 }}>
                                <Image
                                    style={styles.imageUpload}
                                    source={{ uri: this.state.uploadDiplomaImage }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: '3%' }}>
                        <View style={styles.buttonGroup}>
                            <AwesomeButton
                                width={width * 0.8}
                                backgroundColor={'white'}
                                borderRadius={7}
                                onPress={() => this.createLocation()}>
                                <Text style={{ fontFamily: Font.textFont, fontSize: 18 }}>Thêm địa điểm</Text>
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
        width: width * 0.5,
        height: height * 0.3
    }
});