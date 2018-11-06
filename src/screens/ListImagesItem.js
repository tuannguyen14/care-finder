import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Modal, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';

import { IPServer } from '../Server/IPServer.js';
let { width, height } = Dimensions.get("window");

export default class ListImagesItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            visible: false,
            index: 0
        };
    }

    render() {
        const images = [];
        this.state.item.imageUrls.forEach(element => {
            images.push({ url: element.replace('http://localhost:3000', IPServer.ip) });
        });
        return (
            <ScrollView>
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => this.setState({ visible: false })}>
                    <ImageViewer
                        imageUrls={images}
                        index={this.state.index} />
                </Modal>
                <FlatList
                    data={this.state.item.imageUrls}
                    removeClippedSubviews={false}
                    renderItem={({ item: rowData, index }) => {
                        return (
                            <TouchableOpacity onPress={() => this.setState({ visible: true, index: index })}>
                                <Image
                                    source={{ uri: rowData.replace('http://localhost:3000', IPServer.ip) }}
                                    style={styles.image}
                                />
                                <View style={[styles.line, { marginTop: '1%', marginBottom: '1%' }]} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        height: height * 0.3,
        width: width
    }
})