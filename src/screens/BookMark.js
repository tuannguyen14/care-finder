import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Avatar, List, ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class BookMark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBookMark: {
                name: '',
                icon: ''
            },
        };
    }

    componentWillMount() {
        const listDefaultItemTemp = [
            {
                title: 'Vạn Phúc',
                address: 'Thủ Dầu Một',
                avatar_url: 'https://nmc.ae/Uploads/HospitalBannerImage/Thumb1/HospitalMainBannerImage143674.jpg'
            },
            {
                title: 'Hạnh Phúc',
                address: 'Thành Phố Mới',
                avatar_url: 'https://www.srilankanewslive.com/media/k2/items/cache/42e19da95401f7ea26c18a84f93b00ef_XL.jpg'
            },
            {
                title: 'Becamex',
                address: 'Thành Phố Hồ Chí Minh ',
                avatar_url: 'https://images.adsttc.com/media/images/594a/2a4a/b22e/38e9/2900/00a6/large_jpg/Cherry_Hospital-1.jpg?1498032701'
            }
        ]
        this.setState({
            listBookMark: listDefaultItemTemp
        })
    }

    render() {
        return (
            <ScrollView>
                <Header
                    backgroundColor={AppColors.color}
                    leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'Lưu trữ', style: { color: '#fff', fontSize: 20 } }}
                />
                <View>
                    {
                        this.state.listBookMark.map((l, i) => (
                            <ListItem
                                key={i}
                                hideChevron={true}
                                title={l.title}
                                subtitle={l.address}
                                avatar={<Avatar
                                    large
                                    source={{ uri: l.avatar_url }}
                                />}
                            />
                        ))
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
});
