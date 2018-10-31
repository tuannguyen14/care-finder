import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Text } from 'react-native-elements';
import { List, ListItem } from 'native-base';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
const geolib = require('geolib');

import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = 'AIzaSyB3CDl-ZZwQ_jhkLFR4UR2y90d-YN_z6Kk';

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class NearBy extends Component {
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
                latitude: 11.291436,
                longitude: 106.791873
            },
            destination: {
                latitude: 11.086520,
                longitude: 106.672086
            },
            listLocation: []
        };
    }

    componentWillMount() {
        this.getCurrentLocation();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
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
                    }
                    )
                });
                this.calculateDistance();
            },
            error => console.log(error.message),
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
            if (distance < 500) {
                listLocationAdded.push(allLocations[i]);
            }
        }
        this.setState({
            listLocation: listLocationAdded
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView.Animated
                    style={styles.map}
                    region={this.state.region}
                >
                    {this.state.listLocation.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}
                    <MapView.Marker coordinate={this.state.origin} />
                    <MapView.Marker coordinate={this.state.destination} />
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    />
                </MapView.Animated>
                <ScrollView style={{ width: width, height: height / 2.3 }}>
                    <List>
                        {
                            this.state.listLocation.map((l, i) => (
                                <ListItem
                                    style={{ marginLeft: 0, marginTop: 0 }}
                                    key={i}>
                                    <View style={{ flex: 1 }}>
                                        <View style={[styles.rowView, { marginLeft: '3%', marginBottom: '1%' }]}>
                                            <ImageBackground style={[styles.imageRating]}>
                                                <Text style={{ color: 'white' }}>{l.rating}</Text>
                                            </ImageBackground>
                                            <View style={[styles.rowView, { marginTop: '1%', marginLeft: '3%', flex: 1 }]}>
                                                <View style={{ flex: 4 }}>
                                                    <Text style={{ color: 'black' }}>{l.title}</Text>
                                                    <Text>{l.address}</Text>
                                                </View>
                                                <View style={{ flex: 2 }}>
                                                    <Text>100m</Text>
                                                    <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'eye'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>10</Text>
                                                        </View>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'comment'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>0</Text>
                                                        </View>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'camera'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>1</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <Image
                                            source={{ uri: l.url }}
                                            style={{ width: width, height: height / 3.3 }} />
                                    </View>
                                </ListItem>
                            ))
                        }
                    </List>
                </ScrollView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: height / 1.7,
        width: width,
        zIndex: -1
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
    }
});