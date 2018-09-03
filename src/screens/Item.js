import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

let { width, height } = Dimensions.get("window");

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: {
                uri: ''
            },
            name: 'Hello',
            countRating: 4.6
        };
    }

    componentWillMount() {
        const data = [{
            uri: 'https://healthitsecurity.com/images/site/article_headers/_normal/2017-11-08large-data-breach.jpg'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_Z-ysrnYjyeczessyvpVae-YRZvrDThYEvm-VMbEKak5hy87'
        },
        {
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRen6nkzfduANVrWDuKo1brc6KRjbTzeG0jWRyF4sK3s3exQM5u'
        }];
        this.setState({
            listImage: data
        })
    }

    render() {
        return (
            <ScrollView>
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
                    <View style={{ marginLeft: '1%' }}>
                        <Text h3 style={{ color: 'black' }}>{this.state.name}</Text>
                        <View style={styles.rowView}>
                            <Text>{this.state.countRating}</Text>
                            <Rating
                                type="heart"
                                ratingCount={5}
                                fractions={2}
                                startingValue={this.state.countRating}
                                imageSize={21}
                                readonly
                                style={{ marginLeft: '1%' }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: height * 0.4,
        width: width
    },
    rowView: {
        flexDirection: 'row',
    },
})
