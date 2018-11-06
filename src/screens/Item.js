import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList } from "react-native";
import { Header, Text, Rating } from 'react-native-elements';
import { Container, Tab, Tabs } from 'native-base';
import { AppColors } from '../styles/AppColors.js';
import InformationItem from './InformationItem.js';
import RatingItem from './RatingItem.js';
import ListImagesItem from './ListImagesItem.js';

import { IPServer } from '../Server/IPServer.js';

let { width, height } = Dimensions.get("window");

export default class Item extends Component {
    static navigationOptions = { header: null }
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.navigation.state.params.item
        };
    }

    render() {
        const ratingCount = this.state.item.ratingCount == undefined ? '0.0' : item.ratingCount;
        return (
            <Container>
                <ScrollView>
                    <Header
                        backgroundColor={AppColors.color}
                        leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
                        centerComponent={{ text: this.state.item.name, style: { color: '#fff', fontSize: 20 } }}
                    />
                    <View>
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

                    <View style={{ marginLeft: '1%' }}>
                        <Text h3 style={{ color: 'black' }}>{this.state.item.name}</Text>
                        <View style={styles.rowView}>
                            <Text>{ratingCount}</Text>
                            <Rating
                                type="heart"
                                ratingCount={5}
                                fractions={2}
                                startingValue={ratingCount}
                                imageSize={20}
                                readonly
                                style={{ marginLeft: '1%' }}
                            />
                        </View>
                    </View>

                    <View style={[styles.line, { marginTop: '1%' }]} />

                    <ScrollView>
                        <Tabs>
                            <Tab heading="Thông tin" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }} >
                                <InformationItem item={this.state.item} />
                            </Tab>
                            <Tab heading="Đánh giá" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }}>
                                <RatingItem item={this.state.item} />
                            </Tab>
                            <Tab heading="Ảnh" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }}>
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