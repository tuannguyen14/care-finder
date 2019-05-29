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
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.navigation.state.params.location,
            dataBookingTime: this.props.navigation.state.params.dataBookingTime,
            today: '',
            dialogVisibleConfirm: false,
            dialogVisibleHelp: false,
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
        console.log(this.state.dataBookingTime.status)
        if (this.state.dataBookingTime.status == "Closed Today") {
            this.setState({
                closedDate: true
            })
        } else {
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
            let dataBookingTimeValid = this.state.dataBookingTime.timeBooking.time.filter((e, i) => {
                let arrayTime = e.time.split(':');
                let h = arrayTime[0];
                let m = arrayTime[1];
                if (parseInt(h) == parseInt(hours)) {
                    if (parseInt(m) > parseInt(minutes)) {
                        return e;
                    }
                } else if (parseInt(h) > parseInt(hours)) {
                    return e;
                }
            });
            this.setState({
                today: this.state.dataBookingTime.timeBooking.date,
                dataBookingTime: dataBookingTimeValid
            })
        }
    }

    onBook() {
        this.setState({
            spinner: false
        }, () => {
            const body =
            {
                idPatient: global.user.userId,
                idLocation: this.state.location._id,
                date: this.state.today,
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
                    this.props.navigation.navigate('QRCodeScreen', { url: response.data.url, location: this.state.location, dateBooking: this.state.today, time: this.state.dataBookingTime[this.state.indexBooking].time });
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
                    rightComponent={{ icon: 'help', color: '#fff', size: 31, onPress: () => this.setState({ dialogVisibleHelp: true }) }}
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
                <Dialog
                    visible={this.state.dialogVisibleHelp}
                    onTouchOutside={() => this.setState({ dialogVisibleHelp: false })} >
                    <View style={{ alignItems: 'baseline' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: '1%' }}>
                            <View style={{ height: 32, width: 32, backgroundColor: '#98ee99' }} />
                            <Text style={{ fontSize: 19 }}>Mở cửa</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', margin: '1%' }}>
                            <View style={{ height: 32, width: 32, backgroundColor: '#ff867c' }} />
                            <Text style={{ fontSize: 19 }}>Đóng cửa</Text>
                        </View>
                    </View>
                </Dialog>
                {
                    this.state.closedDate ?
                        <View style={{ width: width, backgroundColor: '#ff867c' }}>
                            <Text style={{ fontSize: 21 }}>Đóng cửa ngày hôm nay!</Text>
                        </View>
                        :
                        <ScrollView style={{ marginBottom: '3%' }}>
                            {
                                this.state.dataBookingTime.map((l, i) => (
                                    < View style={{ backgroundColor: l.userId == '' ? '#98ee99' : '#ff867c' }}>
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