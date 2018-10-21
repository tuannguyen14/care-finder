import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, ScrollView, ImageBackground, Image } from "react-native";
import { Picker } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

let { width, height } = Dimensions.get("window");

export default class WorkingTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWeekStart: undefined,
            selectedWeekEnd: undefined,
            isDateTimePickerStartVisible: false,
            isDateTimePickerEndVisible: false,
            timeStart: '00:00',
            timeEnd: '00:00',
        };
    }

    _showDateTimePickerStart = () => this.setState({ isDateTimePickerStartVisible: true });

    _hideDateTimePickerStart = () => this.setState({ isDateTimePickerStartVisible: false });

    _showDateTimePickerEnd = () => this.setState({ isDateTimePickerEndVisible: true });

    _hideDateTimePickerEnd = () => this.setState({ isDateTimePickerEndVisible: false });

    _handleDatePickedStart = (date) => {
        this.setState({ timeStart: date.getHours() + ":" + date.getMinutes() });
        this._hideDateTimePickerStart();
    };

    _handleDatePickedEnd = (date) => {
        this.setState({ timeEnd: date.getHours() + ":" + date.getMinutes() });
        this._hideDateTimePickerEnd();
    };


    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <ScrollView>
                <ImageBackground source={require('../../img/backgroundLogin.png')} style={styles.backgroundImage}>
                    <TouchableOpacity onPress={() => goBack()}>
                        <View style={styles.backButtonContainer}>
                            <Icon name={'arrow-long-left'} size={27} color={'white'} />
                        </View>
                    </TouchableOpacity>
                    <View style={styles.containerLogo}>
                        <Image
                            source={require("../../img/hospitalLogo.png")}
                            style={styles.logo}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.text, { marginTop: '1%' }]}>Lịch làm việc</Text>
                        <View style={styles.rowView}>
                            <View style={styles.rowView}>
                                <Text style={[styles.text, { marginTop: "7.3%", fontSize: 17 }]}>Từ thứ</Text>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 130, color: "white" }}
                                    selectedValue={this.state.selectedWeekStart}
                                    onValueChange={(value) => {
                                        this.setState({ selectedWeekStart: value });
                                    }}
                                >
                                    <Picker.Item label="Thứ hai" value="key0" />
                                    <Picker.Item label="Thứ ba" value="key1" />
                                    <Picker.Item label="Thứ tư" value="key2" />
                                    <Picker.Item label="Thứ năm" value="key3" />
                                    <Picker.Item label="Thứ sáu" value="key4" />
                                    <Picker.Item label="Thứ bảy" value="key5" />
                                    <Picker.Item label="chủ nhật" value="key6" />
                                </Picker>
                            </View>
                            <View style={styles.rowView}>
                                <Text style={[styles.text, { marginTop: "7.3%", fontSize: 17 }]}>Đến thứ</Text>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 130, color: "white" }}
                                    selectedValue={this.state.selectedWeekEnd}
                                    onValueChange={(value) => {
                                        this.setState({ selectedWeekEnd: value });
                                    }}
                                >
                                    <Picker.Item label="Thứ hai" value="key0" />
                                    <Picker.Item label="Thứ ba" value="key1" />
                                    <Picker.Item label="Thứ tư" value="key2" />
                                    <Picker.Item label="Thứ năm" value="key3" />
                                    <Picker.Item label="Thứ sáu" value="key4" />
                                    <Picker.Item label="Thứ bảy" value="key5" />
                                    <Picker.Item label="chủ nhật" value="key6" />
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.rowView}>
                            <View style={styles.rowView}>
                                <Text style={[styles.text, { fontSize: 17 }]}>Từ</Text>
                                <View>
                                    <TouchableOpacity onPress={this._showDateTimePickerStart}>
                                        <Text style={[styles.text, { fontSize: 17, marginLeft: '10%' }]}>{this.state.timeStart} giờ</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode='time'
                                        isVisible={this.state.isDateTimePickerStartVisible}
                                        onConfirm={this._handleDatePickedStart}
                                        onCancel={this._hideDateTimePickerStart}
                                    />
                                </View>
                            </View>
                            <View style={styles.rowView}>
                                <Text style={[styles.text, { fontSize: 17 }]}>đến</Text>
                                <View>
                                    <TouchableOpacity onPress={this._showDateTimePickerEnd}>
                                        <Text style={[styles.text, { fontSize: 17, marginLeft: '10%' }]}>{this.state.timeEnd} giờ</Text>
                                    </TouchableOpacity>
                                    <DateTimePicker
                                        mode='time'
                                        isVisible={this.state.isDateTimePickerEndVisible}
                                        onConfirm={this._handleDatePickedEnd}
                                        onCancel={this._hideDateTimePickerEnd}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.buttonGroup}>
                            <Button
                                onPress={() => navigate("CoordinatesScreen", {})}
                                title='Tiếp theo'
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
                    </View>
                </ImageBackground>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rowView: {
        flexDirection: 'row'
    },
    backButtonContainer: {
        marginLeft: "5%",
        marginTop: "1%"
    },
    inputGroup: {
        marginLeft: "6%",
        marginRight: "6%",
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
        width: width * 0.35,
        height: height * 0.2
    },
});