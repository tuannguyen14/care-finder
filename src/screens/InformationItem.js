import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text } from 'react-native-elements';
import { Accordion } from 'native-base';
import { ListItem } from 'react-native-elements'
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

    render() {
        return (
            <ScrollView>
                <View style={[styles.rowView, { width: width, marginTop: '1%' }]} >
                    <View style={[styles.centerContainer, { width: width * 0.5 }]}>
                        <IconFontAwesome5 name={'directions'} size={50} color={'#F44336'} />
                        <Text style={{ color: 'black' }}>Chỉ đường</Text>
                    </View>
                    <View style={[styles.centerContainer, { width: width * 0.5 }]}>
                        <IconFoundation name={'book-bookmark'} size={50} color={'#F44336'} />
                        <Text style={{ color: 'black' }}>lưu</Text>
                    </View>
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
                                leftIcon={{ name: l.icon, color: '#F44336' }}
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
        height: height * 0.003
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})