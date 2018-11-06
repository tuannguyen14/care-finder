import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Modal, FlatList, TouchableOpacity, Image } from "react-native";
import { Text, Rating, Avatar, ListItem, Button, Header, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { InputGroup, Input } from 'native-base';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';

let { width, height } = Dimensions.get("window");

const square = require('../img/square-shape-shadow.png')

export default class RatingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            listComments: [],
            modalVisible: false,
            startingValueRating: 0,
            errorContentInput: false,
            item: this.props.item,
            ratingLocation: 1,
            ratingPrice: 1,
            ratingQuality: 1,
            ratingAttitude: 1
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
            },
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
            },
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
            },
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
            },
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
            },
            {
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'ngon',
                ratingCount: 5
            },
            {
                name: 'Chris Jackson',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                subtitle: 'Bệnh viện như shit12',
                ratingCount: 1
            }
        ]
        this.setState({
            listComments: list
        })
    }

    ratingCompleted = async (rating) => {
        this.setState({ startingValueRating: rating })
    }

    onPostComment = async () => {
        if (this.state.contentPost == undefined || this.state.contentPost.length < 6) {
            this.setState({ errorContentInput: true });
        } else {
            const body = {
                content: this.state.contentPost,
                rating: this.state.startingValueRating
            }
            axios.post(IPServer.ip + '/comment', body, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => {
                    this.setState({ modalVisible: !this.state.modalVisible, errorContentInput: false });
                }).catch(err => {
                    console.log(err)
                });
        }
    }

    createRatingoneToFive = () => {
        let array = []
        for (let i = 1; i <= 5; i++) {
            array.push(
                < View style={[styles.rowView]}>
                    <View style={[styles.rowView, { marginLeft: '3%' }]}>
                        <Text h4 style={{ marginLeft: '3%' }}>{i}</Text>
                        <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                            <Icon name={'heart'} size={26} color={'#F44336'} />
                        </View>
                    </View>
                    <Rating
                        type="custom"
                        ratingImage={square}
                        ratingCount={i}
                        fractions={0}
                        startingValue={0}
                        imageSize={30.5}
                        style={{ marginLeft: '1%', marginTop: '1.5%' }}
                    />
                </View>
            )
        }
        return array;
    }

    render() {
        const images = [];
        this.state.item.imageUrls.forEach(element => {
            images.push({ url: element.replace('http://localhost:3000', IPServer.ip) });
        });
        return (
            <ScrollView style={{ flex: 1 }}>
                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                    <View style={{ flex: 1 }}>
                        <Header
                            backgroundColor={AppColors.color}
                            leftComponent={{ icon: 'clear', color: '#fff', size: 31, onPress: () => this.setState({ modalVisible: !this.state.modalVisible }) }}
                            centerComponent={{ text: 'Bệnh viện Becamex', style: { color: '#fff', fontSize: 20 } }}
                            rightComponent={{ icon: 'send', color: '#fff', size: 31, onPress: () => this.onPostComment() }}
                        />
                        <View style={{ alignItems: 'center', marginLeft: '1%', marginRight: '1%' }}>
                            <Avatar
                                large
                                rounded
                                source={{ uri: "https://image.flaticon.com/icons/png/128/145/145867.png" }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <Text h3 style={{ color: 'black' }}>Nguyễn Đức Tuấn</Text>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.state.ratingLocation}</Text>
                                <Slider
                                    style={{ width: width - 121, marginLeft: '3%', marginRight: '3%' }}
                                    value={this.state.ratingLocation}
                                    step={1}
                                    onValueChange={(ratingLocation) => this.setState({ ratingLocation })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Vị trí</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: '2.6%' }}>{this.state.ratingPrice}</Text>
                                <Slider
                                    style={{ width: width - 121, marginLeft: '3%', marginRight: '3%' }}
                                    value={this.state.ratingPrice}
                                    step={1}
                                    onValueChange={(ratingPrice) => this.setState({ ratingPrice })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Giá cả</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: '4.8%' }}>{this.state.ratingAttitude}</Text>
                                <Slider
                                    style={{ width: width - 121, marginLeft: '3%', marginRight: '3%' }}
                                    value={this.state.ratingAttitude}
                                    step={1}
                                    onValueChange={(ratingAttitude) => this.setState({ ratingAttitude })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Thái độ</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={{ fontWeight: 'bold', fontSize: 18, marginLeft: '4.6%' }}>{this.state.ratingQuality}</Text>
                                <Slider
                                    style={{ width: width - 121, marginLeft: '3%', marginRight: '3%' }}
                                    value={this.state.ratingQuality}
                                    step={1}
                                    onValueChange={(ratingQuality) => this.setState({ ratingQuality })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Dịch vụ</Text>
                            </View>
                            <InputGroup borderColor={AppColors.color} style={{ marginTop: '3%' }}>
                                <Icon name={'text-document'} size={27} />
                                <Input
                                    style={{ color: "black", marginLeft: "3%" }}
                                    placeholder="Chia sẽ trải nghiệm của bạn về địa điểm này"
                                    value={this.state.contentPost}
                                    autoCorrect={false}
                                    multiline={true}
                                    keyboardType="email-address"
                                    onChangeText={contentPost => this.setState({ contentPost })} />
                            </InputGroup>
                            {
                                this.state.errorContentInput ?
                                    <Text style={{ color: 'red' }}>Bình luận ít nhất phải có 5 ký tự!</Text> :
                                    <Text></Text>
                            }
                        </View>
                    </View>
                </Modal>

                <View style={[styles.rowView]}>
                    <View style={{ width: width * 0.6 }}>
                        {
                            this.createRatingoneToFive()
                        }
                    </View>
                    <View style={styles.centerContainer}>
                        <Text h1>{this.state.countRating}</Text>
                        <Rating
                            type="heart"
                            readonly
                            ratingCount={5}
                            fractions={2}
                            startingValue={0}
                            imageSize={31}
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
                        fractions={0}
                        startingValue={this.state.startingValueRating}
                        onFinishRating={this.ratingCompleted}
                        imageSize={40}
                        style={{ marginLeft: '1%' }}
                    />
                    <View style={{ marginTop: '3%' }}>
                        <Button
                            title='Đánh giá'
                            buttonStyle={{
                                backgroundColor: AppColors.color,
                                width: 300,
                                height: 45,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                            onPress={() => this.setState({ modalVisible: !this.state.modalVisible })} />
                    </View>
                </View>

                <View style={[styles.line, { marginTop: '3%' }]} />

                <View style={[styles.centerContainer, { marginTop: '1%' }]}>
                    <Text h4 style={{ color: 'black' }}>Bài đánh giá</Text>
                </View>

                <View style={{}}>
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
                                            readonly
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