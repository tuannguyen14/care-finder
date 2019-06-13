import React, { Component } from 'react'
import { Dimensions, View, Image, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import axios from 'axios';
import AwesomeButton from 'react-native-really-awesome-button';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';
import { IPServer } from '../Server/IPServer.js';

let { width, height } = Dimensions.get("window");

var jwtDecode = require('jwt-decode');

export default class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.url,
            location: this.props.navigation.state.params.location,
            dateBooking: this.props.navigation.state.params.dateBooking,
            time: this.props.navigation.state.params.time
        }
    }

    onCalcel() {
        const body =
        {
            idPatient: global.user.userId,
            idLocation: this.state.location,
            date: this.state.dateBooking,
            time: this.state.time
        };
        axios.post(IPServer.ip + '/reservation/cancel', body).then((response) => {
            axios.get(IPServer.ip + '/me', {
                headers: {
                    "Authorization": `Bearer ${global.token}`
                },
            }).then(response => {
                let objectUser = response.data;
                objectUser.userId = jwtDecode(global.token).userId;
                global.user = objectUser;
                this.props.navigation.navigate('RootDrawer');
            }).catch(err => {
                console.log(err)
            });
        }).catch(err => {
            console.log(err)
        });
    }

    render() {
        return (
            <View style={{ backgroundColor: "#E0F7FA" }}>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.navigate('RootDrawer') }}
                    centerComponent={{ text: 'MÃ THỨ TỰ', style: [Styles.header, { color: '#fff' }] }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                    <Image source={{ uri: `${this.state.url}` }} style={{ width: width, height: height / 2 }} />
                    <Text style={{ marginTop: '3%' }}>Mang mã này đến phòng khám để lấy số thứ tự</Text>
                </View>
                <View>
                    <Text style={{ color: AppColors.backgroundColor, fontWeight: 'bold', fontSize: 19 }}>Thông tin:</Text>
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Email: </Text>
                        <Text style={styles.textState}>{global.user.email}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Điện thoại: </Text>
                        <Text style={styles.textState}>{global.user.phoneNumber}</Text>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.textHeader}> Thời gian: </Text>
                        <View style={[styles.textHeader, { flexDirection: 'row' }]}>
                            <Text>{global.user.ticketInfo.time}</Text>
                            <Text style={{ marginLeft: '3%' }}>{global.user.ticketInfo.date}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: '7%', alignItems: 'center' }}>
                    <AwesomeButton
                        width={width * 0.8}
                        backgroundColor={AppColors.backgroundColor}
                        borderRadius={7}
                        onPress={() => this.onCalcel()}>
                        <Text style={{ fontSize: 16, fontFamily: Font.textFont, fontWeight: 'bold' }}>Hủy đặt</Text>
                    </AwesomeButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerText: {
        flexDirection: "row"
    },
    textHeader: {
        fontWeight: "bold",
        fontSize: 16,
        flex: 2
    },
    textState: {
        fontSize: 16,
        flex: 2
    },
});