import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Header, ListItem, Avatar, Text } from 'react-native-elements'
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { change_url_image } from '../utils/Utils'
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class BookMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listLocationFollow: [],
            spinner: false
        };
    }

    componentWillMount() {
        this.setState({
            spinner: !this.state.spinner,
        }, () => {
            if (global.isLogin) {
                const listIdLocation = global.user.follows;
                let listLocationFollowTemp = [];
                let promises = [];
                for (let i = 0; i < listIdLocation.length; i++) {
                    promises.push(axios.get(IPServer.ip + '/location/' + listIdLocation[i], {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }));
                }
                console.log(listIdLocation);
                Promise.all(promises)
                    .then((results) => {
                        results.forEach((locationData, i) => {
                            listLocationFollowTemp.push(locationData.data.doc);
                        })
                        return listLocationFollowTemp
                    }).then((arrayLocationReturn) => {
                        this.setState({
                            listLocationFollow: arrayLocationReturn,
                            spinner: !this.state.spinner
                        })
                    });

            }
        });
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.componentWillMount();
            }
        );
    }

    render() {
        return (
            <ScrollView>
                <Header
                    innerContainerStyles={{ alignItems: 'center' }}
                    outerContainerStyles={{ borderBottomWidth: 0 }}
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'ĐANG THEO DÕI', style: [Styles.header, { color: '#fff' }] }}
                />
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Đang xử lý'}
                    textStyle={{ color: 'white' }}
                />
                <View>
                    {
                        this.state.listLocationFollow.map((data, i) => (
                            <ListItem
                                key={i}
                                hideChevron={true}
                                title={data.name}
                                subtitle={data.address.street + ', ' + data.address.ward + ', ' + data.address.district + ', ' + data.address.city}
                                avatar={<Avatar
                                    large
                                    source={{ uri: change_url_image(data.imageUrls[0]) }}
                                />}
                                onPress={() => this.props.navigation.navigate("ItemScreen", { item: data })}
                            />
                        ))
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: '#d9d9d9'
    },
    image: {
        height: height,
        width: width
    }
});
