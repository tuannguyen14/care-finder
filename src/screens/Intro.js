import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

let { width, height } = Dimensions.get("window");

const slides = [
    {
        key: 'somethun',
        title: 'Tìm kiếm phòng khám được đánh giá tốt nhất',
        icon: 'ios-images-outline',
        animation: require('../animation/stars.json'),
        image: require('../img/hospitalIntro.png'),
    },
    {
        key: 'somethun1',
        title: 'Đặt lịch khám dễ dàng',
        icon: 'ios-options-outline',
        animation: require('../animation/calendar.json'),
    },
    {
        key: 'somethun2',
        title: 'Tìm đương đi ngắn nhất',
        icon: 'ios-beer-outline',
        animation: require('../animation/location.json'),
    },
];

export default class Intro extends Component {

    componentDidMount() {
        this.animation.play();
        this.animation.play(30, 120);
    }

    _renderNextButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <AntDesign
                    name="rightcircle"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }
    _renderDoneButton = () => {
        return (
            <View style={styles.buttonCircle}>
                <AntDesign
                    name="checkcircle"
                    color="rgba(255, 255, 255, .9)"
                    size={24}
                    style={{ backgroundColor: 'transparent' }}
                />
            </View>
        );
    }

    _onDone = () => {
        this.props.navigation.navigate('WelcomeScreen');
    }

    _renderItem = props => (
        <LinearGradient
            style={[styles.mainContent, {
                width: props.width,
                height: props.height,
            }]}
            colors={['#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336']}
            start={{ x: 0, y: .1 }} end={{ x: .1, y: 1 }}
        >
            <LottieView
                autoPlay={true}
                ref={animation => {
                    this.animation = animation;
                }}
                source={props.animation}
                style={props.animation != require('../animation/stars.json') ? { width: 320, height: 320 } : {}}
            />
            {
                props.animation != require('../animation/stars.json') ? null :
                    <Image source={props.image} style={styles.image} />
            }
            <View style={props.animation != require('../animation/stars.json') ? { marginBottom: '10%' } : {}}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </LinearGradient>
    );

    render() {
        return (
            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                renderDoneButton={this._renderDoneButton}
                renderNextButton={this._renderNextButton}
                onDone={this._onDone}
            />
        );
    }
}

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    image: {
        width: 192,
        height: 192,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 19,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});