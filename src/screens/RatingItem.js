import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, ScrollView, FlatList, TouchableOpacity } from "react-native";
import { Text, Rating } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';


export class RatingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countRating: 4.6
        };
    }

    render() {
        return (
            <View>
                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>5</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={this.state.countRating}
                        imageSize={21}
                        readonly
                        style={{ marginLeft: '1%' }}
                    />
                </View>

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>4</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={this.state.countRating}
                        imageSize={21}
                        readonly
                        style={{ marginLeft: '1%' }}
                    />
                </View>

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>3</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={this.state.countRating}
                        imageSize={21}
                        readonly
                        style={{ marginLeft: '1%' }}
                    />
                </View>

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>2</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={this.state.countRating}
                        imageSize={21}
                        readonly
                        style={{ marginLeft: '1%' }}
                    />
                </View>

                <View style={styles.rowView}>
                    <View style={styles.rowView}>
                        <Text>1</Text>
                        <Icon name={'heart'} size={27} color={'black'} />
                    </View>
                    <Rating
                        type="heart"
                        ratingCount={5}
                        fractions={2}
                        startingValue={this.state.countRating}
                        imageSize={21}
                        readonly
                        style={{ marginLeft: '1%' }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});