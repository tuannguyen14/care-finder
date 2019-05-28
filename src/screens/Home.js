import React, { Component, } from 'react';
import { Dimensions, View, StyleSheet, FlatList, TouchableOpacity, ScrollView, BackHandler, Image } from 'react-native';
import { Header, SearchBar, Card, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { change_url_image } from '../utils/Utils'
import Spinner from 'react-native-loading-spinner-overlay';
import { NavigationActions } from 'react-navigation';
import { IPServer } from '../Server/IPServer.js';
import { AppColors } from '../styles/AppColors.js';
import { Font } from '../styles/Font.js';
import Styles from '../styles/Styles.js';

let { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      highestViewLocation: [],
      bestLocation: [],
      spinner: false,
      searchView: false,
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
          const data = Array.from(response.data.doc);

          let day = new Date();
          let dayOfWeek = day.getDay();
          let hours = parseInt(day.getHours());
          let minutes = parseInt(day.getMinutes());
          for (let i in data) {
            if (data[i].timeOpen[dayOfWeek][0].isCloseAllDay) {
              data[i].isOpen = false;
            } else if (hours < parseInt((data[i].timeOpen[dayOfWeek][0].from).substring(0, 2)) || hours > parseInt((data[i].timeOpen[dayOfWeek][0].to).substring(0, 2))) {
              data[i].isOpen = false;
            } else if (hours == parseInt((data[i].timeOpen[dayOfWeek][0].from).substring(0, 2)) && minutes < parseInt((data[i].timeOpen[dayOfWeek][0].to).substring(3, 5))) {
              data[i].isOpen = false;
            } else if (hours == parseInt((data[i].timeOpen[dayOfWeek][0].to).substring(0, 2)) && minutes > parseInt((data[i].timeOpen[dayOfWeek][0].to).substring(3, 5))) {
              data[i].isOpen = false;
            } else {
              data[i].isOpen = true;
            }
          }
          const bestLocation = Array.from(data);
          const highestViewLocation = Array.from(data);
          this.setState({
            user: global.user,
            highestViewLocation: highestViewLocation.sort((a, b) => parseFloat(b.countView) - parseFloat(a.countView)),
            bestLocation: bestLocation.sort((a, b) => parseFloat(b.totalRatingAvg) - parseFloat(a.totalRatingAvg)),
            spinner: !this.state.spinner
          })
          global.navigate = this.props.navigation.navigate;
          global.allLocations = response.data.doc;
        });
    });
  }

  openDetailItem(rowData) {
    if (global.isLogin) {
      if ((this.state.user.userId) !== (rowData._idDoctor)) {
        axios({
          method: 'get',
          url: IPServer.ip + '/location/' + rowData._id,
          responseType: 'stream'
        });
      }
    }
    this.props.navigation.navigate("ItemScreen", { item: rowData });
  }

  moreNearBy() {
  }

  onOpenAllItemsSreen(locations, label) {
    this.props.navigation.navigate("AllItemsScreen", { allLocations: locations, label: label });
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
    return (
      <View style={styles.container}>
        <Header
          innerContainerStyles={{ alignItems: 'center' }}
          outerContainerStyles={{ borderBottomWidth: 0 }}
          backgroundColor={AppColors.color}
          leftComponent={{ icon: 'menu', color: '#fff', size: 31, onPress: () => this.props.navigation.openDrawer() }}
          centerComponent={{ text: 'TRANG CHÍNH', style: [Styles.header, { color: '#fff' }] }}
        />
        <View style={styles.searchBarContainer}>
          <SearchBar
            ref={search => this.search = search}
            containerStyle={{}}
            lightTheme
            round
            onFocus={() => { this.props.navigation.navigate("SearchScreen"); }}
            searchIcon={{ size: 41 }}
            clearIcon={{ color: 'red' }}

            placeholder='Tìm kiếm tên phòng khám...' />
        </View>

        <ScrollView style={{ zIndex: 3 }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang xử lý'}
            textStyle={{ color: 'white' }}
          />

          <View style={styles.line} />

          <View style={{ flex: 1 }}>
            <View style={[styles.rowView, { flex: 1, alignItems: 'center' }]}>
              <Text style={{ fontFamily: Font.textFont, marginLeft: '4%', fontWeight: 'bold', flex: 5 }}>Đánh giá cao</Text>
              <TouchableOpacity style={[styles.childRowView, { flex: 1 }]} onPress={() => this.onOpenAllItemsSreen(this.state.bestLocation, 'Đánh giá cao nhất')}>
                <Text h5>Thêm</Text>
                <Icon name={'expand-more'} size={27} color={'black'} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={this.state.bestLocation}
              horizontal={true}
              renderItem={({ item: data }) => {
                return (
                  <TouchableOpacity style={[styles.cardContainer]} onPress={() => this.openDetailItem(data)}>
                    {
                      data.isOpen ?
                        <Image
                          source={require('../img/open.png')}
                          style={styles.imageOpenClose} />
                        :
                        <Image
                          source={require('../img/close.png')}
                          style={styles.imageOpenClose} />
                    }
                    <View style={{ zIndex: 100 }}>
                      <Card
                        title={data.name}
                        image={{ uri: change_url_image(data.imageUrls[0]) }}
                        imageStyle={styles.imageCard}>
                        <Text style={{ fontFamily: Font.textFont, }}>
                          {data.address.street + ', ' + data.address.ward + ', ' + data.address.district + ', ' + data.address.city}
                        </Text>
                      </Card>
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View style={{ width: width, height: 3, backgroundColor: '#BDBDBD', marginTop: '3%' }} />

          <View style={{ width: width, height: height * 0.7, marginBottom: '10%' }}>

            <View style={[styles.rowView, { flex: 1, alignItems: 'center' }]}>
              <Text style={{ fontFamily: Font.textFont, marginLeft: '4%', fontWeight: 'bold', flex: 5 }}>Được xem nhiều</Text>
              <TouchableOpacity style={[styles.childRowView, { flex: 1 }]} onPress={() => this.onOpenAllItemsSreen(this.state.bestLocation, 'Được xem nhiều nhất')}>
                <Text h5>Thêm</Text>
                <Icon name={'expand-more'} size={27} color={'black'} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={this.state.highestViewLocation}
              horizontal={true}
              renderItem={({ item: data }) => {
                return (
                  <TouchableOpacity style={styles.cardContainer} onPress={() => this.openDetailItem(data)}>
                    {
                      data.isOpen ?
                        <Image
                          source={require('../img/open.png')}
                          style={styles.imageOpenClose} />
                        :
                        <Image
                          source={require('../img/close.png')}
                          style={styles.imageOpenClose} />
                    }
                    <View style={{ zIndex: 100 }}>
                      <Card
                        title={data.name}
                        image={{ uri: change_url_image(data.imageUrls[0]) }}
                        imageStyle={styles.imageCard}>
                        <Text style={{ fontFamily: Font.textFont, }}>
                          {data.address.street + ', ' + data.address.ward + ', ' + data.address.district + ', ' + data.address.city}
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


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  listSearch: {
    backgroundColor: 'red',
    width: 399,
    height: 500,
    position: 'absolute',
    zIndex: 2
  },
  imageOpenClose: {
    height: 64,
    width: 64,
    position: 'absolute',
    top: '23%',
    right: '6%',
    zIndex: 101
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
