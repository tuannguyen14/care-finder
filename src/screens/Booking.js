import React, { Component } from 'react';
import { Dimensions, View, ScrollView, Modal, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { ConfirmDialog, Dialog } from 'react-native-simple-dialogs';
import Toast from 'react-native-easy-toast';
import axios from 'axios';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.navigation.state.params.location,
            dataBookingTime: this.props.navigation.state.params.dataBookingTime,
            dialogVisibleConfirm: false,
            spinner: false,
            indexBooking: 0,
            currentDateInLocation: [],
            messageTime: '',
            isBooked: false,
            closedDate: false,
            dataBookingTimeValid: []
        }
    }

    componentWillMount() {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();

        let dataBookingTime = this.state.dataBookingTime;
        dataBookingTime.timeBooking.time.forEach(element => {
            if (element.userId === global.user.userId) {
                this.setState({
                    isBooked: true
                })
            }
        });

        if (this.state.dataBookingTime.timeBooking.status != undefined) {
            this.setState({
                closedDate: true
            })
        }
        let dataBookingTimeValid = this.state.dataBookingTime.timeBooking.time.filter((e, i) => {
            let arrayTime = e.time.split(':');
            let h = arrayTime[0];
            let m = arrayTime[1];
            if (parseInt(h) >= parseInt(hours)) {
                if (parseInt(m) > parseInt(minutes)) {
                    console.log(parseInt(m) + '---' +  parseInt(minutes))
                    return e;
                }
            }
        });
        this.setState({
            dataBookingTime: dataBookingTimeValid
        })
    }

    onBook() {
        let today = new Date();
        this.setState({
            spinner: false
        }, () => {
            const body =
            {
                idPatient: global.user.userId,
                idLocation: this.state.location._id,
                date: today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate(),
                time: this.state.dataBookingTime[this.state.indexBooking].time
            };
            axios.post(IPServer.ip + '/reservation', body).then((response) => {
                let dataBookingTimeTemp = this.state.dataBookingTime;
                dataBookingTimeTemp[this.state.indexBooking] = { userId: global.user.userId, time: this.state.dataBookingTime[this.state.indexBooking].time };
                this.setState({
                    dataBookingTime: dataBookingTimeTemp,
                    dialogVisibleConfirm: !this.state.dialogVisibleConfirm,
                    spinner: !this.state.spinner
                }, () => {
                    this.props.navigation.navigate('QRCodeScreen', { url: response.data.url });
                });
            }).catch(err => {
                console.log(err)
            });
            this.setState({
                spinner: !this.state.spinner
            });
        });
    }

    onCheck(i, time) {

        if (this.state.dataBookingTime[i].userId != '') {
            this.refs.toast.show('Thời gian đã được đặt!');
        } else {
            if (this.state.isBooked) {
                this.refs.toast.show('Bạn đã đặt lịch ngày hôm nay rồi!');
            } else {
                this.setState({ messageTime: "Bạn có muốn đặt " + time + " giờ không?", dialogVisibleConfirm: !this.state.dialogVisibleConfirm, indexBooking: i });
            }
        }
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'ĐẶT LỊCH KHÁM', style: [Styles.header, { color: '#fff' }] }}
                />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Đang xử lý'}
                    textStyle={{ color: 'white' }}
                />
                <ConfirmDialog
                    message={this.state.messageTime}
                    visible={this.state.dialogVisibleConfirm}
                    onTouchOutside={() => this.setState({ dialogVisibleConfirm: false })}
                    positiveButton={{
                        title: "Đồng ý!",
                        onPress: () => this.onBook()
                    }}
                    negativeButton={{
                        title: "Thoát",
                        onPress: () => this.setState({ dialogVisibleConfirm: !this.state.dialogVisibleConfirm })
                    }}
                />
                {
                    this.state.closedDate ?
                        <View style={{ width: width, backgroundColor: 'red' }}>
                            <Text>Đóng cửa ngày hôm nay!</Text>
                        </View>
                        :
                        <ScrollView style={{ marginBottom: '3%' }}>
                            {
                                this.state.dataBookingTime.map((l, i) => (
                                    < View style={{ backgroundColor: l.userId == '' ? 'green' : 'red' }}>
                                        <ListItem
                                            key={i}
                                            title={l.time}
                                            onPress={() => this.onCheck(i, l.time)}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                }
                <Toast ref="toast" />
            </View >
        )
    }
}

const styles = StyleSheet.create({
    centerCointainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowCointainer: {
        flexDirection: 'row'
    }
});