import React, { Component } from 'react';
import { Content, Text } from 'native-base';

export default class Sidebar extends Component {
    render() {
        return (
            <Content style={{ backgroundColor: '#FFFFFF' }}>
                <Text style={{ margin: 20 }}>Drawer</Text>
            </Content>
        );
    }
}