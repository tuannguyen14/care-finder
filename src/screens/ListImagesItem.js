import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text, Rating } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
let { width, height } = Dimensions.get("window");

export class ListImagesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: {
                uri: ''
            },
        };
    }

    render() {
        return (
            <View>
                <View>
                    <FlatList
                        data={this.state.listImage}
                        horizontal={true}
                        renderItem={({ item: rowData }) => {
                            return (
                                <View>
                                    <Image
                                        source={{ uri: rowData.uri }}
                                        style={styles.image}
                                    />
                                </View>
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height * 0.5
    }
});