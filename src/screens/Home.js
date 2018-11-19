import React, { Component, } from 'react';
import { Dimensions, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, BackHandler, Image } from 'react-native';
import { Header, SearchBar, Card, Text, } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { change_url_image } from '../utils/Utils'
import Spinner from 'react-native-loading-spinner-overlay';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';

let { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentInteractiveLocation: [],
      bestLocation: [],
      spinner: false
    };
  }

  componentWillMount() {
    this.setState({
      spinner: !this.state.spinner
    }, () => {
      axios({
        method: 'get',
        url: IPServer.ip + '/location',
        responseType: 'stream'
      })
        .then((response) => {
          let data = response.data.doc.map((e, i) => {
            let { street, ward, district, city } = e.address;
            let address = `${street}, ${ward}, ${district}, ${city}`
            e.address = address
            return e
          })
          const dataBestRating = data;

          this.setState({
            recentInteractiveLocation: data,
            bestLocation: dataBestRating.sort((a, b) => parseFloat(b.totalRatingAvg) - parseFloat(a.totalRatingAvg)),
            spinner: !this.state.spinner
          })
          global.navigate = this.props.navigation.navigate;
          global.allLocations = data;
        });
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
    this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.componentWillMount();
      }
    );
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
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'Trang Chính', style: { color: '#fff', fontSize: 20 } }}
        />
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang xử lý'}
          textStyle={{ color: 'white' }}
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

        <View style={{ flex: 1 }}>
          <View style={[styles.rowView, { flex: 1, alignItems: 'center' }]}>
            <Text h5 style={{ marginLeft: '4%', fontWeight: 'bold', flex: 5 }}>Đánh giá cao</Text>
            <TouchableOpacity style={[styles.childRowView, { flex: 1 }]} onPress={() => navigate("AllItemsScreen")}>
              <Text h5>Thêm</Text>
              <Icon name={'expand-more'} size={27} color={'black'} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={this.state.bestLocation}
            horizontal={true}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity style={styles.cardContainer} onPress={() => this.openDetailItem(rowData)}>
                  <Card
                    title={rowData.name}
                    image={{ uri: change_url_image(rowData.imageUrls[0]) }}
                    imageStyle={styles.imageCard}>
                    <Text>
                      {rowData.address}
                    </Text>
                  </Card>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={{ width: width, height: 3, backgroundColor: '#BDBDBD', marginTop: '3%' }} />

        <View style={{ width: width, height: height * 0.7, marginBottom: '10%' }}>

          <View style={[styles.rowView, { flex: 1, alignItems: 'center' }]}>
            <Text h5 style={{ marginLeft: '4%', fontWeight: 'bold', flex: 5 }}>Mới đây</Text>
            <TouchableOpacity style={[styles.childRowView, { flex: 1 }]} onPress={() => navigate("AllItemsScreen")}>
              <Text h5>Thêm</Text>
              <Icon name={'expand-more'} size={27} color={'black'} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.state.recentInteractiveLocation}
            horizontal={true}
            renderItem={({ item: rowData }) => {
              return (
                <TouchableOpacity style={styles.cardContainer} onPress={() => this.openDetailItem(rowData)}>
                  <View>
                    <Card
                      title={rowData.name}
                      image={{ uri: change_url_image(rowData.imageUrls[0]) }}
                      imageStyle={styles.imageCard}>
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
      </ScrollView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchBarContainer: {
    margin: '3%',
  },
  line: {
    backgroundColor: '#BDBDBD',
    width: width,
    height: height * 0.01
  },
  cardContainer: {
    width: width * 0.7,
    height: height * 0.5
  },
  imageCard: {
    width: '100%',
    height: height * 0.3
  },
  rowView: {
    flexDirection: 'row',
    marginTop: '3%'
  },
  childRowView: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cardWrapperStyle: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.2,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
})
