import React, { Component, } from 'react';
import { Dimensions, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, BackHandler, Image } from 'react-native';
import { Header, SearchBar, Card, Text, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {change_url_image} from '../utils/Utils'
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearByData: []
    };
  }

  componentWillMount() {
    axios({
      method: 'get',
      url: IPServer.ip + '/location',
      responseType: 'stream'
    })
      .then((response) => {
        this.setState({
          nearByData: response.data.doc
        })
        global.allLocations = response.data.doc;
        console.log(response.data.doc)
      });
  }

  openDetailItem(rowData) {
    this.props.navigation.navigate("ItemScreen", { item: rowData });
  }

  moreNearBy() {
  }

  allItems() {
    this.props.navigation.navigate("AllItems");
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <ScrollView style={styles.container}>
        <Header
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'Trang Chính', style: { color: '#fff', fontSize: 20 } }}
        />
        <View style={styles.searchBarContainer}>
          <SearchBar
            lightTheme
            round
            searchIcon={{ size: 31 }}
            clearIcon={{ color: 'red' }}
            // onChangeText={someMethod}
            // onClear={someMethod}
            placeholder='Tìm kiếm tên phòng khám...' />
        </View>

        <View style={styles.line} />

        <View style={{ width: width, height: height * 0.45 }}>

          <View style={styles.rowView}>
            <Text h5 style={{ marginLeft: '4%', fontWeight: 'bold', }}>Gần đây</Text>
            <TouchableOpacity onPress={() => navigate("AllItemsScreen")}>
              <View style={[styles.childRowView, { marginLeft: width * 0.68, }]}>
                <Text h5 style={{ marginRight: '4%' }}>Thêm</Text>
                <Icon name={'expand-more'} size={27} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.nearByData}
            horizontal={true}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => this.openDetailItem(rowData)}>
                  <View>
                    <Card
                      title={rowData.name}
                      image={{ uri: change_url_image(rowData.imageUrls[0]) }}
                      imageStyle={styles.cardContainer}>
                      <Text>
                        {rowData.address}
                      </Text>
                    </Card>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{ width: width, height: height * 0.5 }}>

          <View style={styles.rowView}>
            <Text h5 style={{ marginLeft: '4%', fontWeight: 'bold', }}>Gần đây</Text>
            <TouchableOpacity onPress={() => this.moreNearBy()}>
              <View style={[styles.childRowView, { marginLeft: width * 0.68, }]}>
                <Text h5 style={{ marginRight: '4%' }}>Thêm</Text>
                <Icon name={'expand-more'} size={27} color={'black'} />
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.nearByData}
            horizontal={true}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity onPress={() => this.detailItem()}>
                  <View>
                    <Card
                      title={rowData.name}
                      image={{ uri: rowData.imageUrls[0].replace('http://localhost:3000', IPServer.ip) }}
                      imageStyle={styles.cardContainer}>
                      <Text>
                        {rowData.address}
                      </Text>
                    </Card>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBarContainer: {
    margin: '3%',
  },
  line: {
    backgroundColor: '#BDBDBD',
    width: width,
    height: height * 0.02
  },
  cardContainer: {
    width: width * 0.35,
    height: height * 0.2,
  },
  rowView: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  childRowView: {
    flexDirection: 'row'
  }
})
