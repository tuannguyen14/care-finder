import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity, ListView } from "react-native";
import { Text, Rating, Avatar } from 'react-native-elements';
import { Container, Tab, Tabs } from 'native-base';
import { ListItem, List } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';

let { width, height } = Dimensions.get("window");

const square = require('../img/square-shape-shadow.png')

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
            <Container>

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
                        <Text >{this.state.countRating}</Text>
                        <Rating
                            type="heart"
                            ratingCount={5}
                            fractions={2}
                            startingValue={this.state.countRating}
                            imageSize={20}
                            readonly
                            style={{ marginLeft: '1%' }}
                        />
                    </View>
                </View>

                <Container style={{ marginTop: '3%' }}>
                    <Container>
                        <Tabs>
                            <Tab heading="Thông tin" tabStyle={{ backgroundColor: '#E57373' }} activeTabStyle={{ backgroundColor: '#E57373' }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }} >
                                <InformationItem />
                            </Tab>
                            <Tab heading="Đánh giá" tabStyle={{ backgroundColor: '#E57373' }} activeTabStyle={{ backgroundColor: '#E57373' }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }}>
                                <RatingItem />
                            </Tab>
                            <Tab heading="Ảnh" tabStyle={{ backgroundColor: '#E57373' }} activeTabStyle={{ backgroundColor: '#E57373' }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }}>
                                <ListImagesItem />
                            </Tab>
                        </Tabs>
                    </Container>
                </Container>

            </Container>
        );
    }
}

export class InformationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDefaultItem: {
                name: '',
                icon: ''
            },
            address: '99 Bùi Thị Xuân',
            phoneNumber: '0909000000',
            website: 'https://hahaha.com'
        };
    }

    componentWillMount() {
        const listDefaultItemTemp = [
            {
                name: this.state.address,
                icon: 'location-on'
            },
            {
                name: this.state.phoneNumber,
                icon: 'phone'
            },
            {
                name: this.state.website,
                icon: 'web'
            }
        ]
        this.setState({
            listDefaultItem: listDefaultItemTemp
        })
    }

    render() {
        return (
            <ScrollView>
                {
                    this.state.listDefaultItem.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            leftIcon={{ name: l.icon, color: '#F44336' }}
                        />
                    ))
                }
            </ScrollView>
        );
    }
}

export class RatingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countRating: 4.6,
            listComments: []
        };
    }

    componentWillMount() {
        const list = [
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'ngon',
                ratingCount: 5
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Bệnh viện như shit',
                ratingCount: 1
            }
        ]
        this.setState({
            listComments: list
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={[styles.rowView]}>
                    <View style={{ width: width * 0.6 }}>
                        <View style={[styles.rowView]}>
                            <View style={[styles.rowView, { marginLeft: '3%' }]}>
                                <Text h4 style={{ marginLeft: '3%' }}>5</Text>
                                <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                                    <Icon name={'heart'} size={26} color={'#F44336'} />
                                </View>
                            </View>
                            <Rating
                                type="custom"
                                ratingImage={square}
                                ratingCount={5}
                                fractions={2}
                                startingValue={4}
                                imageSize={30.5}
                                style={{ marginLeft: '1%', marginTop: '1.5%' }}
                            />
                        </View>

                        <View style={[styles.rowView]}>
                            <View style={[styles.rowView, { marginLeft: '3%' }]}>
                                <Text h4 style={{ marginLeft: '3%' }}>4</Text>
                                <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                                    <Icon name={'heart'} size={26} color={'#F44336'} />
                                </View>
                            </View>
                            <Rating
                                type="custom"
                                ratingImage={square}
                                ratingCount={4}
                                fractions={2}
                                startingValue={4}
                                imageSize={30.5}
                                style={{ marginLeft: '1%', marginTop: '1.5%' }}
                            />
                        </View>

                        <View style={[styles.rowView]}>
                            <View style={[styles.rowView, { marginLeft: '3%' }]}>
                                <Text h4 style={{ marginLeft: '3%' }}>3</Text>
                                <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                                    <Icon name={'heart'} size={26} color={'#F44336'} />
                                </View>
                            </View>
                            <Rating
                                type="custom"
                                ratingImage={square}
                                ratingCount={3}
                                fractions={2}
                                startingValue={4}
                                imageSize={30.5}
                                style={{ marginLeft: '1%', marginTop: '1.5%' }}
                            />
                        </View>

                        <View style={[styles.rowView]}>
                            <View style={[styles.rowView, { marginLeft: '3%' }]}>
                                <Text h4 style={{ marginLeft: '3%' }}>2</Text>
                                <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                                    <Icon name={'heart'} size={26} color={'#F44336'} />
                                </View>
                            </View>
                            <Rating
                                type="custom"
                                ratingImage={square}
                                ratingCount={2}
                                fractions={2}
                                startingValue={2}
                                imageSize={30.5}
                                style={{ marginLeft: '1%', marginTop: '1.5%' }}
                            />
                        </View>

                        <View style={[styles.rowView]}>
                            <View style={[styles.rowView, { marginLeft: '3%' }]}>
                                <Text h4 style={{ marginLeft: '3%' }}>1</Text>
                                <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                                    <Icon name={'heart'} size={26} color={'#F44336'} />
                                </View>
                            </View>
                            <Rating
                                type="custom"
                                ratingImage={square}
                                ratingCount={1}
                                fractions={2}
                                startingValue={4}
                                imageSize={30.5}
                                style={{ marginLeft: '1%', marginTop: '1.5%' }}
                            />
                        </View>

                    </View>
                    <View style={styles.centerContainer}>
                        <Text h1>{this.state.countRating}</Text>
                        <Rating
                            type="heart"
                            readonly
                            ratingCount={5}
                            fractions={2}
                            startingValue={this.state.countRating}
                            imageSize={27}
                            style={{ marginLeft: '1%' }}
                        />
                    </View>
                </View>

                <View style={[styles.line, { marginTop: '3%' }]} />

                <View style={[styles.centerContainer, { marginTop: '1%' }]}>
                    <Avatar
                        large
                        rounded
                        source={{ uri: "https://image.flaticon.com/icons/png/128/145/145867.png" }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                    />
                    <Text style={{ color: 'black' }}>Xếp hạng và đánh giá</Text>
                    <Text>Chia sẽ trải nghiệm của bạn để giúp đỡ người khác</Text>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={0}
                        imageSize={40}
                        style={{ marginLeft: '1%' }}
                    />
                </View>

                <View style={[styles.line, { marginTop: '3%' }]} />

                <View>
                    <View style={[styles.centerContainer, { marginTop: '1%' }]}>
                        <Text h4 style={{ color: 'black' }}>Bài đánh giá</Text>
                    </View>
                    <List>
                        {
                            this.state.listComments.map((l, i) => (
                                <ListItem
                                    roundAvatar
                                    hideChevron={true}
                                    key={i}
                                    leftAvatar={{ source: { uri: l.avatar_url } }}
                                    title={l.name}
                                    subtitle={
                                        <View>
                                            <Rating
                                                type="heart"
                                                ratingCount={5}
                                                fractions={2}
                                                startingValue={l.ratingCount}
                                                imageSize={21}
                                                style={{ marginLeft: '3%' }}
                                            />
                                            <Text style={{ marginLeft: '3%' }}>{l.subtitle}</Text>
                                        </View>
                                    }
                                    avatar={{ uri: "https://image.flaticon.com/icons/png/128/145/145867.png" }}
                                />
                            ))
                        }
                    </List>
                </View>
            </ScrollView >
        );
    }
}

export class ListImagesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: {
                uri: ''
            },
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
            <View>
                <FlatList
                    data={this.state.listImage}
                    removeClippedSubviews={false}
                    renderItem={({ item: rowData }) => {
                        return (
                            <View>
                                <Image
                                    source={{ uri: rowData.uri }}
                                    style={styles.image}
                                />
                                <View style={[styles.line, { marginTop: '1%', marginBottom: '1%' }]} />
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: height * 0.3,
        width: width
    },
    rowView: {
        flexDirection: 'row'
    },

    line: {
        backgroundColor: '#BDBDBD',
        width: width,
        height: height * 0.005
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
})