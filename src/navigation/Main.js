import React, { Component } from 'react';
import { MainScreen } from './Root';
import SplashScreen from 'react-native-smart-splash-screen'

export default class Main extends Component {
    componentDidMount () {
        //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
        SplashScreen.close({
           animationType: SplashScreen.animationType.scale,
           duration: 2000,
           delay: 500,
        })
   }
    render() {
        return (
            <MainScreen />
        );
    }
}