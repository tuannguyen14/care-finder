import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Header, Card, Text, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { IPServer } from '../Server/IPServer.js';

import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class LocationManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLocation: global.allLocations,
        };
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <Header
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'Quản lý địa điểm', style: { color: '#fff', fontSize: 20 } }}
                />
                <FlatList
                    data={this.state.listLocation}
                    renderItem={({ item: rowData }) => {
                        return (
                            <View>
                                <Card
                                    title={rowData.name}
                                    image={{ uri: rowData.imageUrls[0] }}
                                    imageStyle={styles.cardContainer}>
                                    <Text>
                                        {rowData.address}
                                    </Text>
                                    <View style={styles.containerRow} >
                                        <View>
                                            <Icon name={'edit'} size={24} color={'black'} />
                                            <Text>Sửa</Text>
                                        </View>
                                        <View style={{ marginLeft: '3%' }}>
                                            <Icon name={'delete'} size={24} color={'black'} />
                                            <Text>Xóa</Text>
                                        </View>
                                    </View>
                                </Card>
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerRow: {
        flexDirection: 'row'
    }
});