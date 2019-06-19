import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import axios from 'axios';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

export default class BookingDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.navigation.state.params.location,
            listDateItem: []
        }
    }

    componentWillMount() {
        let today = new Date();
        let listDateItem = [];
        listDateItem.push({ 'day': this.getDay(today.getDay()), 'fomatDateUI': parseInt(today.getDate()) + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear(), 'fomatDateDB': today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + parseInt(today.getDate()) });
        listDateItem.push({ 'day': this.getDay(today.getDay() + 1), 'fomatDateUI': parseInt(today.getDate() + 1) + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear(), 'fomatDateDB': today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + parseInt(today.getDate() + 1) });
        listDateItem.push({ 'day': this.getDay(today.getDay() + 2), 'fomatDateUI': parseInt(today.getDate() + 2) + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear(), 'fomatDateDB': today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + parseInt(today.getDate() + 2) });
        this.setState({
            listDateItem
        });
    }

    getDay(day) {
        if (parseInt(day) == 7) {
            return "Chủ nhật";
        }
        if (parseInt(day) == 1) {
            return "Thứ hai";
        }
        if (parseInt(day) == 2) {
            return "Thứ ba";
        }
        if (parseInt(day) == 3) {
            return "Thứ tư";
        }
        if (parseInt(day) == 4) {
            return "Thứ năm";
        }
        if (parseInt(day) == 5) {
            return "Thứ sáu";
        }
        if (parseInt(day) == 6) {
            return "Thứ bảy";
        }
    }

    onBooking(dateFormat) {
        const body =
        {
            idLocation: this.state.location._id,
            dateBooking: dateFormat
        };
        axios.post(IPServer.ip + '/location/getBookingTime', body).then((response) => {
            this.props.navigation.navigate('BookingScreen', { location: this.state.location, dataBookingTime: response.data });
        }).catch(err => {
            console.log(err)
        });

    }
    render() {
        return (
            <View>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'CHỌN NGÀY', style: [Styles.header, { color: '#fff' }] }}
                />
                {
                    this.state.listDateItem.map((l, i) => (
                        <ListItem
                            key={i}
                            hideChevron={true}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={
                                <View>
                                    <Text style={{ fontFamily: Font.textFont, fontSize: 18, marginLeft: '4.3%', color: 'black' }}>{l.day + ' ' + l.fomatDateUI}</Text>
                                </View>
                            }
                            leftIcon={{ name: l.icon, color: AppColors.color }}
                            onPress={() => this.onBooking(l.fomatDateDB)}
                        />
                    ))
                }
            </View>
        )
    }
}
