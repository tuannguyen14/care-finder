import React, { Component } from 'react'
import { Dimensions, View, Image, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class QRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.navigation.state.params.url
        }
    }

    render() {
        return (
            <View>
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
            </View>
        )
    }
}
