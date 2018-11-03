import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { List, ListItem } from 'native-base';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

const GOOGLE_MAPS_APIKEY = 'AIzaSyB3CDl-ZZwQ_jhkLFR4UR2y90d-YN_z6Kk';
const geolib = require('geolib');
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
            listLocation: [],
            distanceExpand: 1000
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

    calculateDistance(boolean) {
        let distanceExpand = this.state.distanceExpand;
        if (boolean == true) {
            this.setState({ distanceExpand: this.state.distanceExpand + 1000 })
            distanceExpand += 1000;
        }
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
            if (distance <= distanceExpand) {
                listLocationAdded.push(allLocations[i]);
                listLocationAdded[listLocationAdded.length - 1].distance = distance + "";
            }
        }
        listLocationAdded.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        this.setState({
            listLocation: listLocationAdded
        })
    }

    onExpand() {
        let boolean = true;
        this.calculateDistance(boolean);
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                // showsUserLocation={true}
                // loadingEnabled={true}
                >
                    {this.state.listLocation.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinates}
                            title={marker.name}
                            description={marker.address}
                            image={require('../img/hospitalMarker.png')}
                        />
                    ))}
                    {/* <MapView.Marker coordinate={this.state.destination} />
                    <MapViewDirections
                        origin={this.state.origin}
                        destination={this.state.destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                    /> */}
                </MapView>

                <TouchableOpacity style={styles.backButtonContainer} onPress={() => goBack()}>
                    <IconEntypo name={'arrow-long-left'} size={27} color={'gray'} />
                </TouchableOpacity>

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
                                                <Text style={{ color: 'white' }}>{(l.rating + "").includes('.') ? l.rating : l.rating + '.0'}</Text>
                                            </ImageBackground>
                                            <View style={[styles.rowView, { marginTop: '1%', marginLeft: '3%', flex: 1 }]}>
                                                <View style={{ flex: 4 }}>
                                                    <Text style={{ color: 'black' }}>{l.title}</Text>
                                                    <Text>{l.address}</Text>
                                                </View>
                                                <View style={{ flex: 3 }}>
                                                    <Text>{l.distance.toString().length > 3 ? l.distance / 1000 + 'km' : l.distance + 'm'}</Text>
                                                    <View style={[styles.rowView, { justifyContent: 'space-between' }]}>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'eye'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>10</Text>
                                                        </View>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'comment'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>{l.reviews.length}</Text>
                                                        </View>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'camera'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>{l.imageUrls.length}</Text>
                                                        </View>
                                                        <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                                                            <Icon name={'star'} size={15} color={'gray'} />
                                                            <Text style={{ marginLeft: '3%' }}>{l.numberOfFollows}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <Image
                                            source={{ uri: l.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
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
    },
    backButtonContainer: {
        position: 'absolute',
        top: '3%',
        left: '5%'
    },
    expandButton: {
        position: 'absolute',
        top: '3%',
        right: '5%',
        alignSelf: 'flex-end',
        alignItems: 'center'
    }
});