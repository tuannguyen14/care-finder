import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, ListItem } from 'react-native-elements';
import axios from 'axios';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import Styles from '../styles/Styles.js';

export default class Patient extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            locations: global.allLocations,
            dataBookingTime: [],
        });
    }

    componentWillMount() {
        let today = new Date();
        let hours = today.getHours();
        let minutes = today.getMinutes();
        let dataBookingTime = [];
        this.state.locations.forEach(location => {
            if (location._idDoctor == global.user.userId) {
                if (location.timeBooking != undefined) {
                    location.timeBooking.forEach(timeBooking => {
                        if (timeBooking.date == today.getFullYear() + "-" + parseInt(today.getMonth() + 1) + "-" + parseInt(today.getDate())) {
                            timeBooking.time.forEach(time => {
                                if (time.userId != '') {
                                    axios.get(IPServer.ip + '/user/' + time.userId).then(response => {
                                        item = {
                                            time: time.time,
                                            user: response.data.user
                                        }
                                        dataBookingTime.push(item);
                                        let dataBookingTimeValid = [];
                                        dataBookingTimeValid = dataBookingTime.filter((e) => {
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
                                            dataBookingTime: dataBookingTimeValid
                                        }, () => {
                                            return
                                        });
                                    }).catch(err => {
                                        console.log(err)
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    render() {
        return (
            <ScrollView>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'DANH SÁCH BỆNH NHÂN', style: [Styles.header, { color: '#fff' }] }}
                />
                {
                    this.state.dataBookingTime.map((l, i) => (
                        < View style={{ backgroundColor: 'white' }}>
                            <ListItem
                                roundAvatar
                                key={i}
                                title={(<Text style={{ fontWeight: 'bold', marginLeft: '3%' }}>{l.user.firstName + ' ' + l.user.lastName}</Text>)}
                                subtitle={(<View style={{ marginLeft: '3%' }}>
                                    <Text>{'Giờ khám: ' + l.time}</Text>
                                    <Text>{'Số điện thoại: ' + l.user.phoneNumber}</Text>
                                </View>)}
                                hideChevron={true}
                                avatar={{ uri: l.user.avatar.includes('localhost') ? l.user.avatar.replace('http://localhost:3000', IPServer.ip) : l.user.avatar }}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}
