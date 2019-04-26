import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, Image, Icon } from 'react-native';
import { Text, Button, Header } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = 'AIzaSyDqZFsw9dShNF6QROftqbN6o4dsDUDcHtw';
const geolib = require('geolib');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
                latitude: 0,
                longitude: 0
            },
            destination: {
                latitude: 0,
                longitude: 0
            },
            isFromInformationItem: false
        };
    }

    componentWillMount() {
        this.getCurrentLocation();
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

    onDirection(destinationCoordinate) {
        this.setState({
            destination: {
                latitude: destinationCoordinate.latitude,
                longitude: destinationCoordinate.longitude,
            }
        })
    }

    render() {
        const { goBack } = this.props.navigation;
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
                >
                    {this.state.allLocations.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            image
                        >
                            <Image
                                source={require('../img/markerHospital2.png')}
                                style={{ width: 64, height: 64 }}
                                resizeMode="contain"
                            />
                            <MapView.Callout style={{ height: 130, alignItems: 'center', justifyContent: 'center' }} onPress={() => this.onDirection(marker.coordinates)}>
                                <Text style={{ fontFamily: Font.textFont, color: 'black', fontWeight: 'bold', fontSize: 19 }}>{marker.name}</Text>
                                <Text style={{ fontFamily: Font.textFont, }}>{marker.address.street + ', ' + marker.address.ward + ', ' + marker.address.district + ', ' + marker.address.city}</Text>
                                {/* <Button
                                    title='Dẫn đường'
                                    buttonStyle={{
                                        backgroundColor: AppColors.color,
                                        width: 130,
                                        height: 25,
                                        borderColor: "transparent",
                                        borderWidth: 0,
                                        borderRadius: 5
                                    }}
                                /> */}
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
                        null
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
});