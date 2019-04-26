import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Header, Text, Rating } from 'react-native-elements';
import { Container, Tab, Tabs } from 'native-base';
import { AppColors } from '../styles/AppColors.js';
import InformationItem from './InformationItem.js';
import RatingItem from './RatingItem.js';
import ListImagesItem from './ListImagesItem.js';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Font } from '../styles/Font.js';
import { IPServer } from '../Server/IPServer.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class Item extends Component {
    static navigationOptions = { header: null }
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item,
        };
    }

    getRatingScore = (newItem) => {
        this.setState({ item: newItem });
    }

    getNumberOfFollows = (newItem) => {
        this.setState({ item: newItem });
    }

    getNumberOfViewer() {
    }

    render() {
        let name = null;
        if (this.state.item.name.length > 23) {
            name = this.state.item.name.substring(0, 23) + '...';
        } else {
            name = this.state.item.name;
        }
        name = name.toUpperCase();
        return (
            <Container>
                <ScrollView>
                    <Header
                        innerContainerStyles={{ alignItems: 'center' }}
                        outerContainerStyles={{ borderBottomWidth: 0 }}
                        backgroundColor={AppColors.color}
                        leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                        centerComponent={{ text: name, style: [Styles.header, { color: '#fff' }] }}
                    />
                    <View>
                        {
                            this.state.item.isOpen ?
                                <Image
                                    source={require('../img/open.png')}
                                    style={styles.imageOpenClose} />
                                :
                                <Image
                                    source={require('../img/close.png')}
                                    style={styles.imageOpenClose} />
                        }
                        <FlatList
                            data={this.state.item.imageUrls}
                            horizontal={true}
                            renderItem={({ item: rowData }) => {
                                return (
                                    <View>
                                        <Image
                                            source={{ uri: rowData.replace('http://localhost:3000', IPServer.ip) }}
                                            style={styles.image}
                                        />
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <View style={[styles.line]} />

                    <View style={[styles.rowView, { marginLeft: '1%' }]}>
                        <View style={{ flex: 4 }}>
                            <Text style={{ fontFamily: Font.textFont, color: 'black', fontWeight: 'bold', fontSize: 19 }}>{this.state.item.name}</Text>
                            <View style={styles.rowView}>
                                <Text style={{ fontFamily: Font.textFont, fontSize: 18 }}>{(this.state.item.totalRatingAvg + "").includes('.') ? this.state.item.totalRatingAvg : this.state.item.totalRatingAvg + '.0'}</Text>
                                <Rating
                                    type="heart"
                                    ratingCount={5}
                                    fractions={2}
                                    startingValue={this.state.item.totalRatingAvg}
                                    imageSize={23}
                                    readonly
                                    style={{ marginLeft: '1%' }}
                                />
                            </View>
                            <Text style={{ fontFamily: Font.textFont, fontSize: 18 }}>Có {this.state.item.numberOfFollows} theo dõi</Text>
                        </View>
                        <TouchableOpacity style={[styles.centerContainer, { flex: 1 }]} onPress={() => this.onFollow()}>
                            <IconEntypo name={'new-message'} size={50} color={AppColors.color} />
                            <Text style={{ fontFamily: Font.textFont, color: 'black' }}>Nhắn tin</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.line, { marginTop: '1%' }]} />

                    <ScrollView>
                        <Tabs>
                            <Tab heading="Thông tin" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF' }} textStyle={{ color: 'white' }} >
                                <InformationItem item={this.state.item} updateNumberOfFollows={this.getNumberOfFollows} />
                            </Tab>
                            <Tab heading="Đánh giá" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF' }} textStyle={{ color: 'white' }}>
                                <RatingItem item={this.state.item} ratingScore={this.getRatingScore} />
                            </Tab>
                            <Tab heading="Ảnh" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF' }} textStyle={{ color: 'white' }}>
                                <ListImagesItem item={this.state.item} />
                            </Tab>
                        </Tabs>
                    </ScrollView>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: height * 0.34,
        width: width
    },
    rowView: {
        flexDirection: 'row'
    },
    imageOpenClose: {
        height: 64,
        width: 64,
        position: 'absolute',
        top: '1%',
        right: '1%',
        zIndex: 101
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