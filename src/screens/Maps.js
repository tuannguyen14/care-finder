import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
import { Text, Button, Header } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = 'AIzaSyCJFSrI8QrAFmJcmxO5n56vItbujpz4zAc';
const geolib = require('geolib');
const ASPECT_RATIO = width / height;
const LATITUDE = 11.0558;
const LONGITUDE = 106.667;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CARD_HEIGHT = (height / 2.7);
const CARD_WIDTH = CARD_HEIGHT - 65;

export default class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLocations: global.allLocations,
            region: new MapView.AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }),
            origin: {
                latitude: null,
                longitude: null
            },
            destination: {
                latitude: null,
                longitude: null
            },
            listLocation: [],
            isFromInformationItem: false,
            isOnClickDirection: false,
            isHideScrollView: false,
            visibleIconExpand: true,
            slideAnimationScrollView: new Animated.Value(10),
            slideAnimationExpandIcon: new Animated.Value(275),
        };
    }

    componentWillMount() {
        this.getCurrentLocation();
        this.calculateDistance();
        if (this.props.navigation.state.params != undefined) {
            if (this.props.navigation.state.params.isFromInformationItem != undefined) {
                this.setState({ isFromInformationItem: true })
            }
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    componentDidMount() {
        if (this.props.navigation.state.params != undefined) {
            if (this.props.navigation.state.params.destinationFromInformationItem != undefined) {
                this.onDirection(this.props.navigation.state.params.destinationFromInformationItem);
            }
        }
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: new MapView.AnimatedRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                    }),
                    origin: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                });
            },
            error => console.log(error.message)
        );
    }

    calculateDistance() {
        const allLocations = this.state.allLocations;
        let listLocationAdded = [];
        for (let i = 0; i < allLocations.length; i++) {
            const distance = geolib.getDistance(
                {
                    latitude: this.state.region.latitude._value,
                    longitude: this.state.region.longitude._value
                },
                {
                    latitude: allLocations[i].coordinates.latitude,
                    longitude: allLocations[i].coordinates.longitude
                }
            );
            console.log(distance);
            listLocationAdded.push(allLocations[i]);
            listLocationAdded[listLocationAdded.length - 1].distance = distance / 1000 + "km";
        }
        listLocationAdded.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        this.setState({
            listLocation: listLocationAdded
        }, () => {
            if (this.state.listLocation.length == 0) {
                this.setState({
                    visibleIconExpand: false
                });
            }
        });
    }

    onShowHideScrollView() {
        this.setState({
            isHideScrollView: !this.state.isHideScrollView
        }, () => {
            if (this.state.isHideScrollView) {
                Animated.timing(this.state.slideAnimationScrollView, {
                    toValue: -300,
                    duration: 500
                }).start();
                Animated.timing(this.state.slideAnimationExpandIcon, {
                    toValue: 10,
                    duration: 500
                }).start();
            } else {
                Animated.timing(this.state.slideAnimationScrollView, {
                    toValue: 10,
                    duration: 500
                }).start();
                Animated.timing(this.state.slideAnimationExpandIcon, {
                    toValue: 275,
                    duration: 500
                }).start();
            }
        });
    }

    onDirection(destinationCoordinate) {
        this.setState({
            isOnClickDirection: true,
            destination: {
                latitude: destinationCoordinate.latitude,
                longitude: destinationCoordinate.longitude,
            }
        })
    }

    render() {
        const { goBack } = this.props.navigation;
        let scrollView = this.state.slideAnimationScrollView;
        let expandIcon = this.state.slideAnimationExpandIcon;
        return (
            <View style={styles.container}>
                {
                    this.state.isFromInformationItem
                        ?
                        null
                        :
                        <Header
                            innerContainerStyles={{ alignItems: 'center' }}
                            outerContainerStyles={{ borderBottomWidth: 0 }}
                            backgroundColor={AppColors.color}
                            leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
                            centerComponent={{ text: 'BẢN ĐỒ', style: [Styles.header, { color: '#fff' }] }}
                        />
                }
                <MapView
                    ref={(el) => (this.map = el)}
                    style={styles.map}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    showsMyLocationButton={true}
                    provider={PROVIDER_GOOGLE}
                    /* mapType={"hybrid"} */
                    region={this.state.region}
                    showsMyLocationButton={true}
                >
                    {this.state.allLocations.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                        >
                            <Image
                                source={require('../img/markerHospital2.png')}
                                style={{ width: 64, height: 64 }}
                                resizeMode="contain"
                            />
                            <MapView.Callout style={{ alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onDirection(marker.coordinates)}>
                                <Text style={{ fontFamily: Font.textFont, color: 'black', fontWeight: 'bold', fontSize: 19 }}>{marker.name}</Text>
                                <Text style={{ fontFamily: Font.textFont, }}>{marker.address.street + ', ' + marker.address.ward + ', ' + marker.address.district + ', ' + marker.address.city}</Text>
                                <Button
                                    title='Dẫn đường'
                                    buttonStyle={{
                                        backgroundColor: AppColors.color,
                                        width: 130,
                                        height: 25,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5
                                    }}
                                />
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}

                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        onError={(errorMessage) => {
                            console.log(errorMessage);
                        }}
                    />

                </MapView>

                {
                    this.state.isFromInformationItem
                        ?
                        <TouchableOpacity style={[styles.backButtonContainer]} onPress={() => goBack()}>
                            <IconEntypo name={'arrow-long-left'} size={27} color={'gray'} />
                        </TouchableOpacity>
                        :
                        <Animated.View style={styles.scrollView}>
                            <Animated.View style={[styles.containerShowHideScrollView, { bottom: expandIcon }]}>
                                {
                                    this.state.visibleIconExpand ?
                                        (this.state.isHideScrollView ?
                                            <TouchableOpacity onPress={() => this.onShowHideScrollView()}>
                                                <Icon name={'caret-up'} size={30} color={'gray'} />
                                            </TouchableOpacity>
                                            : <TouchableOpacity onPress={() => this.onShowHideScrollView()}>
                                                <Icon name={'caret-down'} size={30} color={'gray'} />
                                            </TouchableOpacity>
                                        )
                                        : null
                                }
                            </Animated.View>

                            <Animated.ScrollView
                                horizontal
                                style={[{ bottom: scrollView }]}
                            >
                                {this.state.listLocation.map((location, index) => (
                                    <TouchableOpacity style={styles.card} key={index} onPress={() => navigate("ItemScreen", { item: location })}>
                                        <View style={[styles.rowView, { alignItems: 'center' }]}>
                                            <ImageBackground style={[styles.imageRating]}>
                                                <Text style={{ fontFamily: Font.textFont, color: 'white' }}>{(location.totalRatingAvg + "") == '0' ? '-' : ((location.totalRatingAvg + "").includes('.') ? location.totalRatingAvg : location.totalRatingAvg + '.0')}</Text>
                                            </ImageBackground>
                                            <View style={[styles.rowView, { marginTop: '1%', marginLeft: '3%', }]}>
                                                <View>
                                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'black' }}>{location.name}</Text>
                                                    <Text numberOfLines={1} ellipsizeMode='tail'>{location.address.street + ', ' + location.address.ward + ', ' + location.address.district + ', ' + location.address.city}</Text>
                                                    <Text style={{ fontFamily: Font.textFont, }}>{location.distance}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Image
                                            source={{ uri: location.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
                                            style={styles.cardImage}
                                            resizeMode="cover"
                                        />
                                        <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                            <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                <Icon name={'eye'} size={15} color={'gray'} />
                                                <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{location.countView}</Text>
                                            </View>
                                            <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                <Icon name={'comment'} size={15} color={'gray'} />
                                                <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{location.reviews.length}</Text>
                                            </View>
                                            <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                <Icon name={'camera'} size={15} color={'gray'} />
                                                <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{location.imageUrls.length}</Text>
                                            </View>
                                            <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                <Icon name={'star'} size={15} color={'gray'} />
                                                <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{location.numberOfFollows}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </Animated.ScrollView>
                        </Animated.View>
                }
            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: height,
        width: width
    },
    title: {
        fontWeight: 'bold',
        color: 'black'
    },
    rowView: {
        flexDirection: 'row'
    },

    backButtonContainer: {
        position: 'absolute',
        top: '3%',
        left: '5%'
    },
    containerShowHideScrollView: {
        position: "absolute",
        bottom: '41%',
        left: '3%',
        right: 0,
        height: 30,
        width: 30
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        paddingVertical: 10,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        marginTop: '1%',
        flex: 3,
        width: '100%',
        height: '100%',
        alignSelf: "center"
    },
    imageRating: {
        backgroundColor: AppColors.color,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 100
    },
});