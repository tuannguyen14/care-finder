import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Text, Header } from 'react-native-elements';
import { List, ListItem } from 'native-base';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class AllItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAllItems: [],
    };
  }

  componentWillMount() {
    const listDefaultItemTemp = [
      {
        title: 'Vạn Phúc',
        address: 'Thủ Dầu Một',
        url: 'https://nmc.ae/Uploads/HospitalBannerImage/Thumb1/HospitalMainBannerImage143674.jpg',
        rating: '1.0'
      },
      {
        title: 'Hạnh Phúc',
        address: 'Thành Phố Mới',
        url: 'https://www.srilankanewslive.com/media/k2/items/cache/42e19da95401f7ea26c18a84f93b00ef_XL.jpg',
        rating: '6.0'
      },
      {
        title: 'Becamex',
        address: 'Thành Phố Hồ Chí Minh dddddddddddddddddddddd',
        url: 'https://images.adsttc.com/media/images/594a/2a4a/b22e/38e9/2900/00a6/large_jpg/Cherry_Hospital-1.jpg?1498032701',
        rating: '10.0'
      }
    ]
    this.setState({
      listAllItems: listDefaultItemTemp
    })
  }

  render() {
    return (
      <ScrollView>
        <Header
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: 'Lưu trữ', style: { color: '#fff', fontSize: 20 } }}
        />
        <List>
          {
            this.state.listAllItems.map((l, i) => (
              <ListItem
                style={{ marginLeft: 0, marginTop: 0 }}
                key={i}>
                <View>
                  <View style={[styles.rowView, { marginLeft: '3%', marginBottom: '1%' }]}>
                    <ImageBackground style={styles.imageRating}>
                      <Text style={{ color: 'white' }}>{l.rating}</Text>
                    </ImageBackground>
                    <View style={{ marginTop: '1%', marginLeft: '3%' }}>
                      <Text style={{ color: 'black' }}>{l.title}</Text>
                      <Text>{l.address}</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: l.url }}
                    style={{ width: width, height: height / 3 }} />
                </View>
              </ListItem>
            ))
          }
        </List>
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: width,
    height: height / 3
  },
  title: {
    fontWeight: 'bold',
    color: 'black'
  },
  rowView: {
    flexDirection: 'row'
  },
  imageRating: {
    backgroundColor: AppColors.color,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 100
  }
});
