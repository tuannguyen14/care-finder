import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground, Animated } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = 'AIzaSyDqZFsw9dShNF6QROftqbN6o4dsDUDcHtw';
const geolib = require('geolib');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;

const CARD_HEIGHT = (height / 2.7);
const CARD_WIDTH = CARD_HEIGHT - 65;

export default class NearBy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allLocations: global.allLocations,
            region: new MapView.AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: (1 * 1.6) / 50.0,
                longitudeDelta: (1 * 1.6) / 50.0 * ASPECT_RATIO,
            }),
            origin: {
                latitude: 0,
                longitude: 0
            },
            destination: {
                latitude: 0,
                longitude: 0
            },
            listLocation: [],
            distanceExpand: 0,
            slideAnimationScrollView: new Animated.Value(10),
            slideAnimationExpandIcon: new Animated.Value(275),
            isHideScrollView: false,
            visibleIconExpand: true,
            booleanBackButton: this.props.navigation.state.params == undefined ? false : true
        };
    }

    componentWillMount() {
        this.getCurrentLocation();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    componentDidMount() {
        if (this.state.booleanBackButton) {
            this.onDirection(this.props.navigation.state.params.destinationFromInformationItem);
        }
    }

    getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: new MapView.AnimatedRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: ((this.state.distanceExpand / 1000) * 1.6) / 50.0,
                        longitudeDelta: (((this.state.distanceExpand / 1000) * 1.6) / 50.0) * ASPECT_RATIO
                    }),
                    origin: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }
                }, () => {
                    this.calculateDistance();
                },
                    error => console.log(error.message),
                );
            });
    }

    onMapReady() {
    }

    calculateDistance() {
        this.setState({
            distanceExpand: this.state.distanceExpand + 1000
        }, () => {
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
                if (distance <= this.state.distanceExpand) {
                    listLocationAdded.push(allLocations[i]);
                    listLocationAdded[listLocationAdded.length - 1].distance = distance / 1000 + "km";
                }
            }
            listLocationAdded.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
            this.setState({
                listLocation: listLocationAdded,
                region: new MapView.AnimatedRegion({
                    latitude: this.state.region.latitude._value,
                    longitude: this.state.region.longitude._value,
                    latitudeDelta: ((this.state.distanceExpand / 1000) * 1.6) / 50.0,
                    longitudeDelta: (((this.state.distanceExpand / 1000) * 1.6) / 50.0) * ASPECT_RATIO
                })
            }, () => {
                this.map.animateToRegion(new MapView.AnimatedRegion({
                    latitude: this.state.region.latitude._value - 0.001 - (this.state.distanceExpand / 1000000 * 6) - 0.0001,
                    longitude: this.state.region.longitude._value,
                    latitudeDelta: ((this.state.distanceExpand / 1000) * 1.6) / 50.0,
                    longitudeDelta: (((this.state.distanceExpand / 1000) * 1.6) / 50.0) * ASPECT_RATIO
                }), 1000);
                if (this.state.listLocation.length == 0) {
                    this.setState({
                        visibleIconExpand: false
                    });
                }
            });
        });
    }

    onExpand() {
        this.calculateDistance();
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
        })
    }

    onDirection(destinationCoordinate) {
        this.setState({
            destination: {
                latitude: destinationCoordinate.latitude,
                longitude: destinationCoordinate.longitude,
            }
        })
    }

    render() {
        const { goBack, navigate } = this.props.navigation;
        let scrollView = this.state.slideAnimationScrollView;
        let expandIcon = this.state.slideAnimationExpandIcon;
        return (
            <View style={styles.container}>
                <MapView
                    ref={(el) => (this.map = el)}
                    onMapReady={e => this.onMapReady()}
                    style={styles.map}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    showsMyLocationButton={false}
                >
                    {this.state.listLocation.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            image={require('../img/hospitalMarker.png')}
                        >
                            <MapView.Callout onPress={() => this.onDirection(marker.coordinates)}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 19 }}>{marker.name}</Text>
                                    <Text>{marker.address}</Text>
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
                                </View>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                    <MapView.Circle
                        center={this.state.region}
                        radius={this.state.distanceExpand}
                        strokeWidth={1}
                        strokeColor={AppColors.color}
                        fillColor={'rgba(192,192,192,0.3)'}
                    />
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
                {this.state.booleanBackButton ?
                    <TouchableOpacity style={[styles.backButtonContainer]} onPress={() => goBack()}>
                        <IconEntypo name={'arrow-long-left'} size={27} color={'gray'} />
                    </TouchableOpacity>
                    : null
                }
                <TouchableOpacity style={styles.expandButton} onPress={() => this.onExpand()}>
                    <Image
                        source={require('../img/Expand.png')}
                        style={{ height: 36, width: 36 }} />
                    <ImageBackground
                        source={require('../img/square.png')}
                        style={{ height: 26, width: 36, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>{this.state.distanceExpand / 1000 + 'km'}</Text>
                    </ImageBackground>
                </TouchableOpacity>

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
                            : <View />
                    }
                </Animated.View>

                <Animated.ScrollView
                    horizontal
                    style={[styles.scrollView, { bottom: scrollView }]}
                >
                    {this.state.listLocation.map((listLocation, index) => (
                        <TouchableOpacity style={styles.card} key={index} onPress={() => navigate("ItemScreen", { item: listLocation })}>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <ImageBackground style={[styles.imageRating]}>
                                    <Text style={{ color: 'white' }}>{(listLocation.totalRatingAvg + "").includes('.') ? listLocation.totalRatingAvg : listLocation.totalRatingAvg + '.0'}</Text>
                                </ImageBackground>
                                <View style={[styles.rowView, { marginTop: '1%', marginLeft: '3%', }]}>
                                    <View>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ color: 'black' }}>{listLocation.name}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail'>{listLocation.address}</Text>
                                        <Text>{listLocation.distance}</Text>
                                    </View>
                                </View>
                            </View>
                            <Image
                                source={{ uri: listLocation.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                    <Icon name={'eye'} size={15} color={'gray'} />
                                    <Text style={{ marginLeft: '3%' }}>10</Text>
                                </View>
                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                    <Icon name={'comment'} size={15} color={'gray'} />
                                    <Text style={{ marginLeft: '3%' }}>{listLocation.reviews.length}</Text>
                                </View>
                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                    <Icon name={'camera'} size={15} color={'gray'} />
                                    <Text style={{ marginLeft: '3%' }}>{listLocation.imageUrls.length}</Text>
                                </View>
                                <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                    <Icon name={'star'} size={15} color={'gray'} />
                                    <Text style={{ marginLeft: '3%' }}>{listLocation.numberOfFollows}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>
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
    image: {
        width: width,
        height: height / 3
    },
    title: {
        fontWeight: 'bold',
        color: 'black'
    },
    rowView: {
        flexDirection: 'row'
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
    expandButton: {
        position: 'absolute',
        top: '3%',
        right: '5%',
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    backButtonContainer: {
        position: 'absolute',
        top: '3%',
        left: '5%'
    },
    scrollView: {
        position: "absolute",
        left: 0,
        right: 0,
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
    containerShowHideScrollView: {
        position: "absolute",
        bottom: '41%',
        left: '3%',
        right: 0,
        height: 30,
        width: 30
    }
});