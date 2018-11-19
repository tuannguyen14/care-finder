import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Text } from 'react-native-elements';
import { Accordion } from 'native-base';
import { ListItem } from 'react-native-elements'
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppColors } from '../styles/AppColors.js';
import Coordinates from './EditLocation/Coordinates.js';

let { width, height } = Dimensions.get("window");

export default class InformationItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            listDefaultItem: {
                name: '',
                icon: ''
            },
            calendar: '',
            dataArray: [
                { title: "Giờ làm việc", content: "Thứ hai: " + "Cả ngày \n" + "Thứ ba: " + "Cả ngày \n" + "Thứ Tư: " + "Cả ngày \n" + "Thứ Sáu: " + "Cả ngày \n" + "Thứ Thứ bảy: " + "Cả ngày \n" + "Chủ nhật: " + "Cả ngày \n" },
            ]
        };
    }

    componentWillMount() {
        const listDefaultItemTemp = [
            {
                describe: 'address',
                detail: this.state.item.address,
                icon: 'location-on'
            },
            {
                describe: 'phoneNumber',
                detail: this.state.item.phoneNumber,
                icon: 'phone'
            },
            {
                describe: 'website',
                detail: this.state.item.department,
                icon: 'public'
            },
            {
                describe: 'calendar',
                detail: this.state.item.calendar,
                icon: 'event-note'
            }
        ]
        this.setState({
            listDefaultItem: listDefaultItemTemp
        })
    }

    onFollow = async () => {
        const body =
        {
            idLocation: this.state.item._id,
            idUser: this.state.user._id
        };
        axios.post(IPServer.ip + '/follow/' + this.state.item._id, body, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.rowView, { width: width, marginTop: '1%' }]} >
                    <TouchableOpacity style={[styles.centerContainer, { width: width * 0.5 }]} onPress={() => global.navigate("NearByScreen", { booleanBackButton: true, destinationFromInformationItem: this.state.item.coordinates })}>
                        <IconFontAwesome5 name={'directions'} size={50} color={AppColors.color} />
                        <Text style={{ color: 'black' }}>Chỉ đường</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.centerContainer, { width: width * 0.5 }]} onPress={() => this.onFollow()}>
                        <IconMaterialIcons name={'add-box'} size={50} color={AppColors.color} />
                        <Text style={{ color: 'black' }}>Theo dõi</Text>
                    </TouchableOpacity>
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
                                                <Text style={{ color: 'black', fontSize: 19 }}>{l.detail}</Text>
                                                :
                                                <Accordion dataArray={this.state.dataArray} />
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