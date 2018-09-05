import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text, Rating } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';

let { width, height } = Dimensions.get("window");

export default class Item extends Component {
    static navigationOptions = { header: null }
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
                    <View style={{ marginTop: '3%' }}>
                        <Container>
                            <Tabs >
                                <Tab heading="Thông tin" tabStyle={{ backgroundColor: '#FFFFFF' }} activeTabStyle={{ backgroundColor: '#FFFFFF' }} activeTextStyle={{ color: '#E57373', fontWeight: 'normal' }}>
                                    <Information />
                                </Tab>
                                <Tab heading="Đánh giá" tabStyle={{ backgroundColor: '#FFFFFF' }} activeTabStyle={{ backgroundColor: '#FFFFFF' }} activeTextStyle={{ color: '#E57373', fontWeight: 'normal' }}>
                                    <RatingItem />
                                </Tab>
                                <Tab heading="Ảnh" tabStyle={{ backgroundColor: '#FFFFFF' }} activeTabStyle={{ backgroundColor: '#FFFFFF' }} activeTextStyle={{ color: '#E57373', fontWeight: 'normal' }}>
                                    <Images />
                                </Tab>
                            </Tabs>
                        </Container>
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

export class RatingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>5</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
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

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>4</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
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

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>3</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
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

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>2</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
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

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>1</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
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
        );
    }
}

export class Images extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> Information </Text>
            </View>
        );
    }
}

