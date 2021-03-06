import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Modal, FlatList, Image, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Text, Rating, Avatar, Header, Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { InputGroup, Input } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import { Dialog } from 'react-native-simple-dialogs';
import AwesomeButton from 'react-native-really-awesome-button';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import { Font } from '../styles/Font.js';

let { width, height } = Dimensions.get("window");

const square = require('../img/square-shape-shadow.png')

export default class RatingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: global.user,
            item: this.props.item,
            reviews: this.props.item.reviews,
            modalVisible: false,
            startingValueRating: 1,
            errorContentInput: false,
            ratingLocation: 1,
            ratingPrice: 1,
            ratingQuality: 1,
            ratingAttitude: 1,
            contentPost: '',
            informationUserComment: [],
            isEdit: false,
            isRated: false,
            dialogVisible: false,
            detailRatingFromUser: []
        };
    }


    componentWillMount() {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            this.state.user = global.user;
            let arrayIdUserComment = [];
            let promises = [];
            for (let id in this.state.reviews) {
                promises.push(axios.get(IPServer.ip + '/user/' + this.state.reviews[id]._idUser, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }));
            }
            Promise.all(promises)
                .then((results) => {
                    results.forEach((e, i) => {
                        arrayIdUserComment.push(e.data.user);
                        if (global.isLogin) {
                            if (e.data.user._id == this.state.user.userId) {
                                this.setState({ isRated: true });
                            }
                        }
                    });
                    return arrayIdUserComment
                }).then((array) => {
                    this.setState({
                        informationUserComment: array,
                        spinner: !this.state.spinner
                    })
                });
        });
    }



    onPostComment = () => {
        this.setState({
            spinner: !this.state.spinner
        }, () => {
            if (this.state.contentPost == undefined || this.state.contentPost.length < 6) {
                this.setState({ errorContentInput: true, spinner: !this.state.spinner });
            } else {
                const body = {
                    idUser: this.state.user.userId,
                    content: this.state.contentPost,
                    rating: {
                        'location': this.state.ratingLocation,
                        'price': this.state.ratingPrice,
                        'quality': this.state.ratingQuality,
                        'attitude': this.state.ratingAttitude
                    }
                }
                if (this.state.isEdit) {
                    axios.patch(IPServer.ip + '/location/comment/' + this.state.item._id, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => {
                            let arrayIdUserComment = this.state.informationUserComment;
                            arrayIdUserComment.push(this.state.user);
                            this.props.ratingScore(response.data.doc);
                            this.setState({ reviews: [] }, () => {
                                this.setState({
                                    modalVisible: !this.state.modalVisible,
                                    errorContentInput: false,
                                    reviews: response.data.doc.reviews,
                                    informationUserComment: arrayIdUserComment,
                                    item: response.data.doc,
                                    spinner: !this.state.spinner,
                                    isRated: true,
                                    isEdit: false
                                });
                            });
                        }).catch(err => {
                            console.log(err)
                        });
                } else {
                    axios.post(IPServer.ip + '/location/comment/' + this.state.item._id, body, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then(response => {
                            let arrayIdUserComment = this.state.informationUserComment;
                            arrayIdUserComment.push(this.state.user);
                            this.props.ratingScore(response.data.doc);
                            this.setState({
                                modalVisible: !this.state.modalVisible,
                                errorContentInput: false,
                                reviews: response.data.doc.reviews,
                                informationUserComment: arrayIdUserComment,
                                item: response.data.doc,
                                spinner: !this.state.spinner,
                                isRated: true
                            });
                        }).catch(err => {
                            console.log(err)
                        });
                }
            }
        });
    }

    createRatingoneToFive = () => {
        let array = [];
        let arrayString = ['Vị trí', 'Giá cả', 'Dịch vụ', 'Thái độ'];
        let i = 0;
        for (element in this.state.item.ratingAvg) {
            i++;
            array.push(
                < View style={[styles.rowView, { alignItems: 'center', justifyContent: "center", backgroundColor: 'white' }]}>
                    <View style={[styles.rowView, { marginLeft: '3%', flex: 1, alignItems: 'center' }]}>
                        <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{(this.state.item.ratingAvg[element] + "").includes('.') ? (this.state.item.ratingAvg[element] + '').substring(0, 3) : this.state.item.ratingAvg[element] + '.0'}</Text>
                        <Icon name={'heart'} size={23} color={'#F44336'} style={{ marginLeft: '3%' }} />
                    </View>
                    <Rating
                        type="custom"
                        ratingImage={square}
                        ratingCount={this.state.item.ratingAvg[element] * 2}
                        fractions={0}
                        startingValue={10}
                        imageSize={23}
                        style={{ flex: 3 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'flex-end', fontFamily: Font.textFont, fontWeight: 'bold', fontSize: 16, marginTop: '1.6%', marginRight: '1%' }}>{arrayString[i - 1]}</Text>
                    </View>
                </View >
            )
        }
        return array;
    }

    createRatingDetailItem = () => {
        let array = [];
        let arrayString = ['Vị trí', 'Giá cả', 'Dịch vụ', 'Thái độ'];
        let i = 0;
        console.log(this.state.detailRatingFromUser)
        for (element in this.state.detailRatingFromUser.rating) {
            i++;
            array.push(
                < View style={[styles.rowView, { alignItems: 'center', justifyContent: "center", backgroundColor: 'white' }]}>
                    <View style={[styles.rowView, { marginLeft: '3%', flex: 1, alignItems: 'center' }]}>
                        <Text style={{ fontFamily: Font.textFont, marginLeft: '3%' }}>{this.state.detailRatingFromUser.rating[element].toFixed(1)}</Text>
                        <Icon name={'heart'} size={23} color={'#F44336'} style={{ marginLeft: '3%' }} />
                    </View>
                    <Rating
                        type="custom"
                        ratingImage={square}
                        ratingCount={this.state.detailRatingFromUser.rating[element]}
                        fractions={0}
                        startingValue={10}
                        imageSize={23}
                        style={{ flex: 3 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text style={{ alignSelf: 'flex-end', fontFamily: Font.textFont, fontWeight: 'bold', fontSize: 16, marginTop: '1.6%', marginRight: '1%' }}>{arrayString[i - 1]}</Text>
                    </View>
                </View >
            )
        }
        return array;
    }

    ratingCompleted = (rating) => {
        this.setState({ startingValueRating: rating });
    }

    editComment(data) {
        if (global.isLogin) {
            if (data._idUser == this.state.user.userId) {
                this.setState({ modalVisible: true, isEdit: true })
            } else {
                this.setState({ dialogVisible: true, detailRatingFromUser: data })
            }
        }
    }

    render() {
        const images = [];
        this.state.item.imageUrls.forEach(element => {
            images.push({ url: element.replace('http://localhost:3000', IPServer.ip) });
        });
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#e0e0e0' }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Đang xử lý'}
                    textStyle={{ color: 'white' }}
                />
                {
                    global.isLogin ?
                        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => this.setState({ modalVisible: !this.state.modalVisible })}>
                            <View style={{ flex: 1 }}>
                                <Header
                                    backgroundColor={AppColors.color}
                                    leftComponent={{ icon: 'clear', color: '#fff', size: 31, onPress: () => this.setState({ modalVisible: !this.state.modalVisible }) }}
                                    centerComponent={{ text: this.state.item.name.substring(0, 23) + '...', style: { color: '#fff', fontSize: 20 } }}
                                    rightComponent={{ icon: 'send', color: '#fff', size: 31, onPress: () => this.onPostComment() }}
                                />
                                <View style={{ alignItems: 'center', marginLeft: '3%', marginRight: '1%' }}>
                                    <Image
                                        source={{ uri: !global.isLogin ? 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png' : (this.state.user.avatar.includes('localhost') ? this.state.user.avatar.replace('http://localhost:3000', IPServer.ip) : this.state.user.avatar) }}
                                        style={styles.avatar} />
                                    <Text style={{ fontFamily: Font.textFont, color: 'black' }}>{this.state.user.lastName + " " + this.state.user.firstName}</Text>
                                    <View style={[styles.rowView, { alignItems: 'center' }]}>
                                        <Text style={styles.nameTextSliderRating}>{this.state.ratingLocation}</Text>
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
                                        <Text style={styles.nameTextSliderRating}>{this.state.ratingPrice}</Text>
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
                                        <Text style={styles.nameTextSliderRating}>{this.state.ratingAttitude}</Text>
                                        <Slider
                                            style={styles.sliderRating}
                                            value={this.state.ratingAttitude}
                                            step={1}
                                            onValueChange={(ratingAttitude) => this.setState({ ratingAttitude })}
                                            minimumValue={1}
                                            maximumValue={5}
                                            thumbTintColor={AppColors.color} />
                                        <Text style={{ fontFamily: Font.textFont, fontWeight: 'bold', fontSize: 16, flex: 1 }}>Thái độ</Text>
                                    </View>
                                    <View style={[styles.rowView, { alignItems: 'center' }]}>
                                        <Text style={styles.nameTextSliderRating}>{this.state.ratingQuality}</Text>
                                        <Slider
                                            style={styles.sliderRating}
                                            value={this.state.ratingQuality}
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
                                            <Text style={{ fontFamily: Font.textFont, color: 'red' }}>Bình luận ít nhất phải có 5 ký tự!</Text> :
                                            null
                                    }
                                </View>
                            </View>
                        </Modal>
                        :
                        null
                }
                <Dialog
                    visible={this.state.dialogVisible}
                    onTouchOutside={() => this.setState({ dialogVisible: false })} >
                    <View>
                        {
                            this.createRatingDetailItem()
                        }
                        <View style={{ height: 1, backgroundColor: 'grey', marginTop: '1%' }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name={'message-text-outline'} size={21} style={{ marginTop: '1.99%' }} />
                            <Text style={{ fontSize: 19, marginLeft: '3%' }}>{this.state.detailRatingFromUser.content}</Text>
                        </View>
                    </View>
                </Dialog>
                <View>
                    {
                        this.createRatingoneToFive()
                    }
                </View>

                <View style={{ backgroundColor: 'white' }}>
                    <View style={[styles.line]} />

                    <View style={[styles.centerContainer]}>
                        <Image
                            source={{ uri: !global.isLogin ? 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png' : (this.state.user.avatar.includes('localhost') ? this.state.user.avatar.replace('http://localhost:3000', IPServer.ip) : this.state.user.avatar) }}
                            style={styles.avatar} />
                        <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Xếp hạng và đánh giá</Text>
                        <Text style={{ fontFamily: Font.textFont, }}>Chia sẽ trải nghiệm của bạn để giúp đỡ người khác</Text>
                        {
                            global.isLogin ?
                                this.state.isRated ?
                                    <Text h4>Đã đánh giá</Text>
                                    :
                                    <AwesomeButton
                                        width={width * 0.8}
                                        backgroundColor={AppColors.color}
                                        borderRadius={7}
                                        onPress={() => this.setState({ modalVisible: !this.state.modalVisible, ratingLocation: this.state.startingValueRating, ratingPrice: this.state.startingValueRating, ratingQuality: this.state.startingValueRating, ratingAttitude: this.state.startingValueRating })}>
                                        <Text style={{ fontFamily: Font.textFont, color: 'white', fontSize: 18 }}>Đánh giá</Text>
                                    </AwesomeButton>
                                :
                                <AwesomeButton
                                    width={width * 0.8}
                                    backgroundColor={AppColors.backgroundColor}
                                    borderRadius={7}
                                    onPress={() => navigate('LoginScreen')}>
                                    <Text style={{ fontSize: 16, fontFamily: Font.textFont, fontWeight: 'bold' }}>Đăng nhập</Text>
                                </AwesomeButton>
                        }
                    </View>
                    <View style={[styles.line, { marginTop: '3%' }]} />
                </View>

                <View>
                    <View style={[styles.centerContainer]}>
                        <Text style={{ fontFamily: Font.textFont, color: 'black', fontSize: 19 }}>Bài đánh giá</Text>
                    </View>
                    {
                        this.state.reviews.length == 0
                            ?
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: Font.textFont, }}>Chưa có bình luận!</Text>
                            </View>
                            :
                            <FlatList
                                style={{ marginBottom: '1%', backgroundColor: 'white', borderTopColor: 'grey', borderTopWidth: 0.7 }}
                                data={this.state.reviews}
                                renderItem={({ item: rowData, index }) => {
                                    return (
                                        this.state.informationUserComment[index] != undefined ?
                                            < TouchableOpacity onPress={() => this.editComment(rowData)}  >
                                                <View style={[styles.rowView, { alignItems: 'center', padding: '1%' }]}>
                                                    <View style={{ marginLeft: '3%' }}>
                                                        <Avatar
                                                            size="medium"
                                                            rounded
                                                            source={{ uri: this.state.informationUserComment[index].avatar.includes('localhost') ? this.state.informationUserComment[index].avatar.replace('http://localhost:3000', IPServer.ip) : this.state.informationUserComment[index].avatar }}
                                                            onPress={() => console.log("Works!")}
                                                            activeOpacity={0.7}
                                                        />
                                                    </View>
                                                    <View style={{ marginLeft: '3%' }}>
                                                        <Text style={{ fontFamily: Font.textFont, fontWeight: 'bold', fontSize: 23 }}>{this.state.informationUserComment[index].firstName + ' ' + this.state.informationUserComment[index].lastName}</Text>
                                                        < Rating
                                                            type="heart"
                                                            readonly
                                                            ratingCount={5}
                                                            fractions={2}
                                                            startingValue={(rowData.rating.location + rowData.rating.price + rowData.rating.quality + rowData.rating.attitude) / 4}
                                                            imageSize={21}
                                                        />
                                                        <Text style={{ fontFamily: Font.textFont, }}>{rowData.content}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ backgroundColor: 'grey', width: width, height: 1, marginTop: '1%' }} />
                                            </TouchableOpacity>
                                            :
                                            <View style={{ backgroundColor: 'grey', width: width, height: 1, marginTop: '1%' }} />
                                    );
                                }}
                            />
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        height: 80,
        width: 80,
        borderRadius: 40,
    },
    modalRatingDetail: {
        width: width / 2,
        height: height / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        flex: 4
    },
    nameTextSliderRating: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    }
})