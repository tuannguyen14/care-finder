import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Header, Card, Text, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Font } from '../styles/Font.js';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { change_url_image } from '../utils/Utils'

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
                this.state.listLocation.push(global.allLocations[i]);
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
                    renderItem={({ item: data }) => {
                        return (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ItemScreen", { item: data })} >
                                <Card
                                    title={data.name}
                                    image={{ uri: change_url_image(data.imageUrls[0]) }}
                                    imageStyle={styles.image}>
                                    <Text style={{ fontFamily: Font.textFont, fontFamily: Font.textFont, }}>
                                        {data.address.street + ', ' + data.address.ward + ', ' + data.address.district + ', ' + data.address.city}
                                    </Text>

                                    <View style={styles.containerRow} >
                                        <TouchableOpacity onPress={() => navigate('BasicInformationScreen', { item: data })}>
                                            <View>
                                                <Icon name={'edit'} size={24} color={'black'} />
                                                <Text style={{ fontFamily: Font.textFont, }}>Sửa</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ marginLeft: '3%' }}>
                                            <View>
                                                <Icon name={'delete'} size={24} color={'black'} />
                                                <Text style={{ fontFamily: Font.textFont, }}>Xóa</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Card>
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
    },
    image: {
        height: height / 3
    }
});