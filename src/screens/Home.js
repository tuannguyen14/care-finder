import React, { Component, } from 'react';
import { Dimensions } from "react-native";
import { View, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar, Card, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons';

let { width, height } = Dimensions.get("window");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearByData: {
        id: '',
        uri: '',
        name: '',
        address: ''
      }
    };
  }

  componentWillMount() {
    const data = [{
      uri: 'https://healthitsecurity.com/images/site/article_headers/_normal/2017-11-08large-data-breach.jpg',
      name: 'Becamex',
      address: 'Thủ Dầu Một'
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy_Z-ysrnYjyeczessyvpVae-YRZvrDThYEvm-VMbEKak5hy87',
      name: 'Vạn Phúc',
      address: 'Thành Phố Mới'
    },
    {
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRen6nkzfduANVrWDuKo1brc6KRjbTzeG0jWRyF4sK3s3exQM5u',
      name: 'Hạnh Phúc',
      address: 'Sài Gòn'
    }
    ]
    this.setState({
      nearByData: data
    });
  }

  moreNearBy() {
  }

  detailItem() {
    this.props.navigation.navigate("ItemScreen");
  }

  render() {
    return (
      <View>
        <ScrollView style={{ marginBottom: '1%' }}>
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

          <View>

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
                        image={{ uri: rowData.uri }}
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

          <View style={[styles.line, { marginTop: '3%' }]} />

          <View>

            <View style={styles.rowView}>
              <Text h5 style={{ marginLeft: '4%', fontWeight: 'bold', }}>Đánh giá cao</Text>
              <TouchableOpacity onPress={() => this.moreNearBy()}>
                <View style={[styles.childRowView, { marginLeft: width * 0.606, }]}>
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
                        image={{ uri: rowData.uri }}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
