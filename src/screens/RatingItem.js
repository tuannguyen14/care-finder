import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, Rating, Avatar } from 'react-native-elements';
import { ListItem, List } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';

let { width, height } = Dimensions.get("window");

const square = require('../img/square-shape-shadow.png')

export default class RatingItem extends Component {
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

                <View style={{ height: height }}>
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
        height: height * 0.003
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