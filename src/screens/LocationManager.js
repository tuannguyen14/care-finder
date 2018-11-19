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
            listLocation: []
        };
    }

    componentWillMount() {
        for (let i in global.allLocations) {
            if (global.allLocations[i]._idDoctor == global.user.userId) {
                listLocation.push(global.allLocations[i]);
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={styles.container}>
                <Header
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: 'Quản lý địa điểm', style: { color: '#fff', fontSize: 20 } }}
                />
                <FlatList
                    data={this.state.listLocation}
                    renderItem={({ item: rowData }) => {
                        return (
                            <TouchableOpacity>
                                <View>
                                    <Card
                                        title={rowData.name}
                                        image={{ uri: rowData.imageUrls[0] }}
                                        imageStyle={styles.cardContainer}>
                                        <Text>
                                            {rowData.address}
                                        </Text>

                                        <View style={styles.containerRow} >
                                            <TouchableOpacity onPress={() => navigate('BasicInformationScreen', { item: rowData })}>
                                                <View>
                                                    <Icon name={'edit'} size={24} color={'black'} />
                                                    <Text>Sửa</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginLeft: '3%' }}>
                                                <View>
                                                    <Icon name={'delete'} size={24} color={'black'} />
                                                    <Text>Xóa</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView >
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