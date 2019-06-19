import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { Header, ListItem } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';
import Styles from '../styles/Styles.js';

export default class ChooseClinicQRCode extends Component {
    render() {
        return (
            <ScrollView>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => goBack() }}
                    centerComponent={{ text: 'CHỌN PHÒNG KHÁM', style: [Styles.header, { color: '#fff' }] }}
                />
                {
                    global.user.ticketInfo.map((l, i) => (
                        < View style={{ backgroundColor: 'white' }}>
                            <ListItem
                                roundAvatar
                                key={i}
                                title={l.locationName}
                                onPress={() => this.props.navigation.navigate('QRCodeScreen', { ticketInfo: l })}
                            />
                        </View>
                    ))
                }
            </ScrollView>
        )
    }
}
