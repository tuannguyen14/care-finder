import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Image } from "react-native";

let { width, height } = Dimensions.get("window");

export default class ListImagesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item
        };
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.item.imageUrls}
                    removeClippedSubviews={false}
                    renderItem={({ item: rowData }) => {
                        return (
                            <View>
                                <Image
                                    source={{ uri: rowData }}
                                    style={styles.image}
                                />
                                <View style={[styles.line, { marginTop: '1%', marginBottom: '1%' }]} />
                            </View>
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: height * 0.3,
        width: width
    }
})