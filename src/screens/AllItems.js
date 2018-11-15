import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity, Image, ImageBackground, Modal } from 'react-native';
import { Text, Header } from 'react-native-elements';
import { List, ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AppColors } from '../styles/AppColors.js';
import { IPServer } from '../Server/IPServer.js';

let { width, height } = Dimensions.get("window");

export default class AllItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAllItems: global.allLocations,
      visiblModalFilter: false
    };
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'keyboard-backspace', color: '#fff', size: 31, onPress: () => this.props.navigation.goBack() }}
          centerComponent={{ text: 'Địa điểm', style: { color: '#fff', fontSize: 20 } }}
        />
        <Modal animationType="slide" transparent={false} visible={this.state.visiblModalFilter} onRequestClose={() => this.setState({ modalVisible: !this.state.visiblModalFilter })}>
          <View></View>
        </Modal>
        <View style={[styles.rowView, { flex: 1 }]}>
          <Text style={{ fontSize: 18, marginLeft: '4%', fontWeight: 'bold', flex: 4, marginTop: '3%' }}>Mới nhất</Text>
          <TouchableOpacity style={[styles.rowView, { flex: 1, alignItems: 'center', marginTop: '1.5%' }]} onPress={() => this.setState({ visiblModalFilter: !this.state.visiblModalFilter })}>
            <Text style={{ fontSize: 18 }}>Bộ lọc</Text>
            <Icon name={'filter'} size={21} color={'gray'} />
          </TouchableOpacity>
        </View>

        <View style={{ width: width, borderBottomWidth: 1, borderBottomColor: '#BDBDBD', marginTop: '3%' }}></View>

        <List style={{ flex: 5 }}>
          {
            this.state.listAllItems.map((l, i) => (
              <ListItem
                style={{ marginLeft: 0, marginTop: 0 }}
                key={i}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.navigate("ItemScreen", { item: l })}>
                  <View style={[styles.rowView, { marginLeft: '3%', marginBottom: '1%' }]}>
                    <ImageBackground style={styles.imageRating}>
                      <Text style={{ color: 'white' }}>{(l.totalRatingAvg + "").includes('.') ? l.totalRatingAvg : l.totalRatingAvg + '.0'}</Text>
                    </ImageBackground>
                    <View style={{ marginTop: '1%', marginLeft: '3%' }}>
                      <Text style={{ color: 'black' }}>{l.name}</Text>
                      <Text>{l.address}</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: l.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
                    style={{ width: width, height: height / 3 }} />

                  <View style={[styles.rowView, {}]}>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'eye'} size={15} color={'gray'} />
                      <Text style={{ marginLeft: '3%' }}>10</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'comment'} size={15} color={'gray'} />
                      <Text style={{ marginLeft: '3%' }}>{l.reviews.length}</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'camera'} size={15} color={'gray'} />
                      <Text style={{ marginLeft: '3%' }}>{l.imageUrls.length}</Text>
                    </View>
                    <View style={[styles.rowView, { alignItems: 'center', justifyContent: 'center', }]}>
                      <Icon name={'star'} size={15} color={'gray'} />
                      <Text style={{ marginLeft: '3%' }}>{l.numberOfFollows}</Text>
                    </View>
                  </View>
                  <View style={styles.bigLine}></View>
                </TouchableOpacity>
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
    flex: 1,
    backgroundColor: 'white'
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
  },
  bigLine: {
    backgroundColor: '#BDBDBD',
    width: width,
    height: height * 0.01,
    marginTop: '6%'
  }
});
