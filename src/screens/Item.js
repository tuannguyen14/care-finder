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
            item: this.props.navigation.state.params.item,
            text: '1'
        };
    }

    getRatingScore = (n) => {

      this.setState({text: n})
    }
    
    render() {
        return (
            <Container>
                <ScrollView>
                    <Header
                        outerContainerStyles={{ borderBottomWidth: 0 }}
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
                        <Text h4 style={{ color: 'black', fontWeight: 'bold' }}>{this.state.item.name}</Text>
                        <View style={styles.rowView}>
                            <Text style={{ fontSize: 18 }}>{this.state.text}</Text>
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
                        <Text style={{ fontSize: 18 }}>Có {this.state.item.numberOfFollows} theo dõi</Text>
                    </View>

                    <View style={[styles.line, { marginTop: '1%' }]} />

                    <ScrollView>
                        <Tabs>
                            <Tab heading="Thông tin" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }} >
                                <InformationItem item={this.state.item} />
                            </Tab>
                            <Tab heading="Đánh giá" tabStyle={{ backgroundColor: AppColors.color }} activeTabStyle={{ backgroundColor: AppColors.color }} activeTextStyle={{ color: '#FFFFFF', fontWeight: 'normal' }}>
                                <RatingItem item={this.state.item} ratingScore={this.getRatingScore} />
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