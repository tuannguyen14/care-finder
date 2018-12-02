import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity, } from 'react-native';
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
            }
        };
    }

    componentWillMount() {
        this.getCurrentLocation();
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
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'BẢN ĐỒ', style: [Styles.header, { color: '#fff' }] }}
                />
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
                            image={require('../img/hospitalMarker.png')}
                        >
                            <MapView.Callout onPress={() => this.onDirection(marker.coordinates)}>
                                <View style={{ alignItems: 'center' }}>
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
                                </View>
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
                <TouchableOpacity style={[styles.backButtonContainer]} onPress={() => goBack()}>
                    <IconEntypo name={'arrow-long-left'} size={27} color={'gray'} />
                </TouchableOpacity>
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
    }
});