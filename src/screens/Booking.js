import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { ListItem } from 'react-native-elements'
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

export default class Booking extends Component {
    constructor(props) {
        this.state = {
            dataBookingTime: []
        }
    }

    componentWillMount() {
        createBookingTime();
    }

    createBookingTime() {
        let hour = 6;
        let minutes = 0;
        let stringTime = null;
        arrayTime = [];
        while (hour < 24) {
            minutes += 15;
            if (minutes == 60) {
                minutes = '00';
                hour++;
            }
            if (hour.toString().length() == 1) {
                hour = '0' + hour;
            }
            stringTime = hour + ':' + minutes;
            arrayTime.append({ time: stringTime });
        }
        this.setState({
            dataBookingTime: arrayTime
        })
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
                {
                    this.state.dataBookingTime.map((l, i) => (
                        <ListItem
                            key={i}
                            title={l.time}
                        />
                    ))
                }
            </View>
        )
    }
}
