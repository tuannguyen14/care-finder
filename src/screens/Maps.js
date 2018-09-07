import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Marker, MapView } from 'react-native-maps';

export default class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getInitialState() {
        return {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    region={this.state.region}
                    onRegionChange={this.onRegionChange} />
            </View>

        );
    }
}

const styles = StyleSheet.create({
});