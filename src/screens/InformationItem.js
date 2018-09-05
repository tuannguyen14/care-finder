import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text, Rating } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';


export class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDefaultItem: [],
            address: '99 Bùi Thị Xuân',
            phoneNumber: '0909000000',
            website: 'https://hahaha.com'
        };
    }

    componentWillMount() {
        const listDefaultItemTemp = [
            {
                name: this.state.adress,
                icon: 'adress'
            },
            {
                name: this.state.phoneNumber,
                icon: 'phone'
            },
            {
                name: this.state.website,
                icon: 'web'
            },
        ]
        this.setState({
            listDefaultItem: listDefaultItemTemp
        })
    }

    render() {
        return (
            <View>
                {
                    this.setState.listDefaultItem.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            subtitle={l.subtitle}
                        />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
});