import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Text } from 'react-native-elements';
import { Accordion } from 'native-base';
import { ListItem } from 'react-native-elements'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import Modal from "react-native-modal";
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';
import Spinner from 'react-native-loading-spinner-overlay';
import { Font } from '../styles/Font.js';

var jwtDecode = require('jwt-decode');

let { width, height } = Dimensions.get("window");

export default class InformationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: global.user,
            item: this.props.item,
            listDefaultItem: {
                name: '',
                icon: ''
            },
            calendar: '',
            dataArray: [],
            isFollowed: false,
            spinner: false,
            isVisibleModal: false
        };
    }

    componentWillMount() {
        let tempDateArray = [];
        let tempContentDate = '';
        for (let i = 1; i < this.state.item.timeOpen.length; i++) {
            let date = null;
            if (i == 1) {
                date = 'Thứ hai';
            }
            else if (i == 2) {
                date = 'Thứ ba';
            }
            else if (i == 3) {
                date = 'Thứ tư';
            }
            else if (i == 4) {
                date = 'Thứ năm';
            }
            else if (i == 5) {
                date = 'Thứ sáu';
            }
            else if (i == 6) {
                date = 'Thứ bảy';
            }
            if (this.state.item.timeOpen[i][0].isCloseAllDay) {
                tempContentDate += date + ': Đóng cửa\n';
            } else {
                tempContentDate += (date + ": Từ " + this.state.item.timeOpen[i][0].from + " giờ đến " + this.state.item.timeOpen[i][0].to + " giờ\n");
            }
        }
        if (this.state.item.timeOpen[0][0].isCloseAllDay) {
            tempContentDate += 'Chủ nhật: Đóng cửa';
        } else {
            tempContentDate += ("Chủ nhật: Từ " + this.state.item.timeOpen[0][0].from + " giờ đến " + this.state.item.timeOpen[0][0].to + " giờ\n");
        }
        tempDateArray.push({ title: "Giờ  hoạt động", content: tempContentDate });
        for (let i = 0; i < this.state.user.follows.length; i++) {
            if (this.state.user.follows[i] == this.state.item._id) {
                this.setState({ isFollowed: true })
            }
        }
        const listDefaultItemTemp = [
            {
                describe: 'address',
                detail: this.state.item.address.street + ', ' + this.state.item.address.ward + ', ' + this.state.item.address.district + ', ' + this.state.item.address.district,
                icon: 'location-on'
            },
            {
                describe: 'phoneNumber',
                detail: this.state.item.phoneNumber,
                icon: 'phone'
            },
            {
                describe: 'department',
                detail: this.state.item.departments.join(', '),
                icon: 'location-city'
            },
            {
                describe: 'website',
                detail: this.state.item.website,
                icon: 'public'
            },
            {
                describe: 'calendar',
                detail: this.state.item.calendar,
                icon: 'event-note'
            }
        ]
        this.setState({
            listDefaultItem: listDefaultItemTemp,
            dataArray: tempDateArray
        })
    }

    onFollow() {
        const body =
        {
            idLocation: this.state.item._id,
            _idUser: this.state.user.userId
        };
        axios.post(IPServer.ip + '/location/follow/' + this.state.item._id, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                let temp = this.state.item;
                temp.numberOfFollows++;
                let tempFollowArray = global.user.follows;
                tempFollowArray.push(this.state.item._id);
                global.user.follows = tempFollowArray;
                this.props.updateNumberOfFollows(temp);
                this.setState({ isFollowed: true })
            }).catch(err => {
                console.log(err)
            })
    }

    onModifyFollow() {
        this.setState({ isVisibleModal: !this.setState.modalVisible });
    }

    onUnFollow() {
        const body =
        {
            idLocation: this.state.item._id,
            _idUser: this.state.user.userId
        };
        axios.post(IPServer.ip + '/location/unfollow/' + this.state.item._id, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                let temp = this.state.item;
                temp.numberOfFollows--;
                axios.get(IPServer.ip + '/me', {
                    headers: {
                        "Authorization": `Bearer ${global.token}`
                    },
                }).then(response => {
                    let objectUser = response.data;
                    objectUser.userId = jwtDecode(global.token).userId;
                    global.user = objectUser;
                }).catch(err => {
                    console.log(err)
                })
                this.props.updateNumberOfFollows(temp);
                this.setState({ isFollowed: false, isVisibleModal: false })
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Đang xử lý'}
                    textStyle={{ color: 'white' }}
                />
                <View style={[styles.rowView, { width: width, marginTop: '1%' }]} >
                    <TouchableOpacity style={[styles.centerContainer, { width: width * 0.5 }]} onPress={() => global.navigate("MapsScreen", { destinationFromInformationItem: this.state.item.coordinates })}>
                        <IconFontAwesome5 name={'directions'} size={50} color={AppColors.color} />
                        <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Chỉ đường</Text>
                    </TouchableOpacity>
                    {
                        this.state.isFollowed ?
                            <TouchableOpacity style={[styles.centerContainer, { width: width * 0.5 }]} onPress={() => this.onModifyFollow()}>
                                <Modal isVisible={this.state.isVisibleModal} onRequestClose={() => this.setState({ isVisibleModal: !this.state.isVisibleModal })}>
                                    <TouchableOpacity style={styles.modalContainer} onPress={() => this.onUnFollow()}>
                                        <IconSimpleLineIcons name={'user-unfollow'} size={50} color={AppColors.color} />
                                        <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Bỏ theo dõi</Text>
                                    </TouchableOpacity>
                                </Modal>
                                <IconSimpleLineIcons name={'user-following'} size={50} color={AppColors.color} />
                                <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Đang theo dõi</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={[styles.centerContainer, { width: width * 0.5 }]} onPress={() => this.onFollow()}>
                                <IconSimpleLineIcons name={'user-follow'} size={50} color={AppColors.color} />
                                <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Theo dõi</Text>
                            </TouchableOpacity>
                    }

                </View>
                <View style={[styles.line, { marginTop: '1%' }]} />
                <View style={{ height: height }}>
                    {
                        this.state.listDefaultItem.map((l, i) => (
                            <ListItem
                                key={i}
                                hideChevron={true}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={
                                    <View>
                                        {
                                            (l.describe != 'calendar') ?
                                                <Text style={{ fontFamily: Font.textFont, fontSize: 18, marginLeft: '4.3%', color: 'black' }}>{l.detail}</Text>
                                                :
                                                <Accordion contentStyle={{ fontFamily: Font.textFont, fontSize: 15 }} dataArray={this.state.dataArray} />
                                        }
                                    </View>
                                }
                                leftIcon={{ name: l.icon, color: AppColors.color }}
                            />
                        ))
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        height: height / 5,
        width: width / 4,
        marginLeft: '37%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
})