import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';

export default class componentName extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    openRootDrawer() {
        global.isLogin = false;
        this.props.navigation.navigate('RootDrawer')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../img/background.png')} style={{ width: '100%', height: '100%' }}>
                <View style={[styles.centerContain, { marginTop: '6%' }]}>
                    <Image style={{ height: 64, width: 64 }} source={require('../img/hospitalLogo.png')} />
                </View>
                <View style={styles.centerContain}>
                    <Text style={styles.logo}> Care Finder </Text>
                </View>
                <View style={[styles.centerContain, styles.cointainerButton]}>
                    <TouchableOpacity onPress={() => navigate('LoginScreen')}>
                        <Text style={styles.textButton}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.openRootDrawer()} style={{ marginTop: '3%' }}>
                        <Text style={styles.textButton}>Để sau</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    centerContain: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        color: AppColors.color,
        fontSize: 21,
        fontWeight: 'bold',
    },
    cointainerButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: '3%'
    },
    textButton: {
        color: 'white',
        fontSize: 16,
        fontFamily: Font.textFont
    }
});