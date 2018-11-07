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
            startingValueRating: 1,
            errorContentInput: false,
            item: this.props.item,
            ratingLocation: 0,
            ratingPrice: 0,
            ratingQuality: 0,
            ratingAttitude: 0
        };
    }

    componentWillMount() {
        const list = [];
        for (let i = 0; i < 17; i++) {
            list.push({
                name: 'Amy Farha',
                avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                subtitle: 'ngon' + i,
                ratingCount: 5
            });
        }
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
        let arrayString = ['Vị trí', 'Giá cả', 'Thái độ', 'Dịch vụ']
        for (let i = 1; i <= arrayString.length; i++) {
            array.push(
                < View style={[styles.rowView, { flex: 1 }]}>
                    <View style={[styles.rowView, { marginLeft: '3%', flex: 1 }]}>
                        <Text h4 style={{ marginLeft: '3%' }}>{i}</Text>
                        <View style={{ marginTop: '10%', marginLeft: '3%' }} >
                            <Icon name={'heart'} size={26} color={'#F44336'} />
                        </View>
                    </View>
                    <Rating
                        type="custom"
                        ratingImage={square}
                        ratingCount={i * 2}
                        fractions={0}
                        startingValue={10}
                        imageSize={26}
                        style={{ marginLeft: '1%', marginTop: '1.5%', flex: 3 }}
                    />
                    <Text h4 style={{ fontWeight: 'bold', fontSize: 16, marginLeft: '3%', marginTop: '1.6%', flex: 1 }}>{arrayString[i - 1]}</Text>
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
                        <View style={{ alignItems: 'center', marginLeft: '3%', marginRight: '1%' }}>
                            <Avatar
                                large
                                rounded
                                source={{ uri: "https://image.flaticon.com/icons/png/128/145/145867.png" }}
                                onPress={() => console.log("Works!")}
                                activeOpacity={0.7}
                            />
                            <Text h3 style={{ color: 'black' }}>Nguyễn Đức Tuấn</Text>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={styles.nameTextSliderRating}>{this.state.ratingLocation == 0 ? this.state.startingValueRating : this.state.ratingLocation}</Text>
                                <Slider
                                    style={styles.sliderRating}
                                    value={this.state.ratingLocation == 0 ? this.state.startingValueRating : this.state.ratingLocation}
                                    step={1}
                                    onValueChange={(ratingLocation) => this.setState({ ratingLocation })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={styles.nameTextSliderRating}>Vị trí</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={styles.nameTextSliderRating}>{this.state.ratingPrice == 0 ? this.state.startingValueRating : this.state.ratingPrice}</Text>
                                <Slider
                                    style={styles.sliderRating}
                                    value={this.state.ratingPrice == 0 ? this.state.startingValueRating : this.state.ratingPrice}
                                    step={1}
                                    onValueChange={(ratingPrice) => this.setState({ ratingPrice })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={styles.nameTextSliderRating}>Giá cả</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={styles.nameTextSliderRating}>{this.state.ratingAttitude == 0 ? this.state.startingValueRating : this.state.ratingAttitude}</Text>
                                <Slider
                                    style={styles.sliderRating}
                                    value={this.state.ratingAttitude == 0 ? this.state.startingValueRating : this.state.ratingAttitude}
                                    step={1}
                                    onValueChange={(ratingAttitude) => this.setState({ ratingAttitude })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={{ fontWeight: 'bold', fontSize: 16, flex: 1 }}>Thái độ</Text>
                            </View>
                            <View style={[styles.rowView, { alignItems: 'center' }]}>
                                <Text style={styles.nameTextSliderRating}>{this.state.ratingQuality == 0 ? this.state.startingValueRating : this.state.ratingQuality}</Text>
                                <Slider
                                    style={styles.sliderRating}
                                    value={this.state.ratingQuality == 0 ? this.state.startingValueRating : this.state.ratingQuality}
                                    step={1}
                                    onValueChange={(ratingQuality) => this.setState({ ratingQuality })}
                                    minimumValue={1}
                                    maximumValue={5}
                                    thumbTintColor={AppColors.color} />
                                <Text style={styles.nameTextSliderRating}> Dịch vụ</Text>
                            </View>
                            <InputGroup style={[styles.inputGroup, { marginTop: '3%' }]} borderColor={AppColors.color}>
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

                <View>
                    {
                        this.createRatingoneToFive()
                    }
                </View>

                <View style={[styles.line, { marginTop: '3%' }]} />

                <View style={[styles.centerContainer]}>
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
                <FlatList
                    style={{ marginBottom: '1%' }}
                    data={this.state.listComments}
                    removeClippedSubviews={false}
                    renderItem={({ item: rowData, index }) => {
                        return (
                            <View style={[styles.rowView, { alignItems: 'center', borderBottomWidth: 1 }]}>
                                <View style={{ marginLeft: '3%' }}>
                                    <Avatar
                                        medium
                                        rounded
                                        source={{ uri: "https://image.flaticon.com/icons/png/128/145/145867.png" }}
                                        onPress={() => console.log("Works!")}
                                        activeOpacity={0.7}
                                    />
                                </View>
                                <View style={{ marginLeft: '3%' }}>
                                    <Text style={{ fontWeight: 'bold' }}>{rowData.name}</Text>
                                    <Rating
                                        type="heart"
                                        readonly
                                        ratingCount={5}
                                        fractions={2}
                                        startingValue={rowData.ratingCount}
                                        imageSize={21}
                                    />
                                    <Text>{rowData.subtitle}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
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
    },
    inputGroup: {
        borderColor: AppColors.color,
        borderBottomWidth: 3
    },
    valueTextSliderRating: {
        fontWeight: 'bold',
        fontSize: 18,
        flex: 1
    },
    sliderRating: {
        width: width - 70,
        marginRight: '10%',
        flex: 5
    },
    nameTextSliderRating: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    }
})