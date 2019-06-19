import React, { Component } from 'react'
import { Dimensions, View, Image, Text, StyleSheet, ScrollView } from 'react-native';
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
            ticketInfo: this.props.navigation.state.params.ticketInfo,
            expired: false
        }
    }

    componentWillMount() {
        let date = new Date();
        let day = date.getDate();
        let hours = parseInt(date.getHours());
        let minutes = parseInt(date.getMinutes());
        ticketInfo = this.state.ticketInfo;
        if (parseInt(day) < parseInt(ticketInfo.date.split('-')[2])) {
            ticketInfo.expired = true;
        } else if (day == ticketInfo.date.split('-')[2] && hours > parseInt((ticketInfo.time).substring(0, 2))) {
            ticketInfo.expired = true;
            console.log(1)
            console.log(hours + '-------' + parseInt((ticketInfo.time).substring(0, 2)))
        } else if (hours == parseInt((ticketInfo.time).substring(0, 2)) && minutes > parseInt((ticketInfo.time).substring(3, 5))) {
            console.log(2)
            console.log(hours + '-------' + parseInt((ticketInfo.time).substring(0, 2)))
            console.log(minutes + '-------' + parseInt((ticketInfo.time).substring(3, 5)))
            ticketInfo.expired = true;
        } else if (hours == parseInt((ticketInfo.time).substring(0, 2)) && minutes < parseInt((ticketInfo.time).substring(3, 5))) {
            console.log(3)
            ticketInfo.expired = true;
        } else {
            ticketInfo.expired = false;
        }

    }

    onCalcel() {
        const body =
        {
            idPatient: global.user.userId,
            idLocation: this.state.ticketInfo.locationId,
            date: this.state.ticketInfo.date,
            time: this.state.ticketInfo.time
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
            <ScrollView style={{ flex: 1, backgroundColor: "#E0F7FA" }}>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.navigate('RootDrawer') }}
                    centerComponent={{ text: 'MÃ THỨ TỰ', style: [Styles.header, { color: '#fff' }] }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '3%' }}>
                    <Image source={{ uri: `${this.state.ticketInfo.imageOfReservation}` }} style={{ width: width, height: height / 2 }} />
                    {
                        this.state.ticketInfo.expired ?
                            <Text style={{ fontSize: 19, color: 'red', alignSelf: 'center' }}>Phiếu hết hạn</Text> :
                            <Text style={{ marginTop: '3%' }}>Mang mã này đến phòng khám để lấy số thứ tự</Text>
                    }
                </View>
                <View style={{ height: 600 }}>
                    <View>
                        <Text style={{ color: AppColors.backgroundColor, fontWeight: 'bold', fontSize: 19 }}>Thông tin:</Text>
                        <Text style={{ alignSelf: 'center', fontSize: 19, fontWeight: 'bold' }}>{this.state.ticketInfo.locationName}</Text>
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
                            <View style={[{ flex: 3, flexDirection: 'row' }]}>
                                <Text>{this.state.ticketInfo.time}</Text>
                                <Text style={{ marginLeft: '3%' }}>{this.state.ticketInfo.date}</Text>
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
            </ScrollView>
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
        flex: 1
    },
    textState: {
        fontSize: 16,
        flex: 3
    },
});