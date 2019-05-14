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
            dataBookingTime: [],
            dialogVisibleConfirm: false,
            dialogVisibleMessage: false,
            spinner: false,
            indexBooking: 0,
            currentDateInLocation: [],
            closedDate: false
        }
    }

    componentWillMount() {
        let today = new Date();
        let dateFormat = today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate();
        this.generateCurrentDate(dateFormat);
    }

    generateCurrentDate(dateFormat) {
        const body =
        {
            idLocation: this.state.location._id,
            dateBooking: dateFormat
        };
        axios.post(IPServer.ip + '/location/getBookingTime', body).then((response) => {
            if (response.data.status == 'Closed Today') {
                return true
            }
            else {
                this.setState({ dataBookingTime: response.data.timeBooking.time })
            }
        }).catch(err => {
            console.log(err)
        });
    }

    onBook() {
        let today = new Date();
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            if (this.state.dataBookingTime[this.state.indexBooking].userId != '') {
                this.refs.toast.show('Thời gian đã được đặt!');
                this.setState({
                    dialogVisibleConfirm: !this.state.dialogVisibleConfirm,
                });
            } else {
                const body =
                {
                    idPatient: global.user.userId,
                    idLocation: this.state.location._id,
                    date: today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getDate(),
                    time: this.state.dataBookingTime[this.state.indexBooking].time
                };
                axios.post(IPServer.ip + '/reservation', body).then((response) => {
                    console.log(response);
                }).catch(err => {
                    console.log(err)
                });
                this.setState({
                    dialogVisibleMessage: !this.state.dialogVisibleMessage,
                    dialogVisibleConfirm: !this.state.dialogVisibleConfirm,
                });
            }
            this.setState({
                spinner: !this.state.spinner
            });
        });
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
                    message="Bạn có muốn đặt giờ này không?"
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
                                    <View style={{ backgroundColor: l.userId == '' ? 'green' : 'red' }}>
                                        <ListItem
                                            key={i}
                                            title={l.time}
                                            onPress={() => this.setState({ dialogVisibleConfirm: !this.state.dialogVisibleConfirm, indexBooking: i })}
                                        />
                                    </View>
                                ))
                            }
                        </ScrollView>
                }

                <Dialog
                    visible={this.state.dialogVisibleMessage}
                    onTouchOutside={() => this.setState({ dialogVisibleMessage: false })} >
                    <View>
                        <Text style={{ fontSize: 21 }}>Đặt thành công!</Text>
                    </View>
                </Dialog>
                <Toast ref="toast" />
            </View>
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