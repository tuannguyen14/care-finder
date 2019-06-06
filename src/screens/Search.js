//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { List, ListItem, SearchBar, Card, Icon } from "react-native-elements";
import _ from "lodash";
import { Dropdown } from 'react-native-material-dropdown';
import { IPServer } from '../Server/IPServer.js';
import axios from 'axios';


// create a component
class Search extends Component {
  state = {
    search: '',
    data: global.allLocations,
    loading: false,
    error: null,
    fullData: global.allLocations,
    queryData:[],
    query: '',
    departments: [],
    isAll: true,
  };


  async componentDidMount() {
    const responseDepartment = await fetch(IPServer.ip + '/department')
    const data = await responseDepartment.json();
    console.log("haha" + data.doc)
    var newArray = data.doc.map((e,i ) => {
      return {value : e.name}
    })
    
    newArray.unshift({value: "Tất cả"})
    console.log(newArray)
    this.setState({ departments: newArray })
  }

  handleSearch = (text) => {
    console.log("text", text)
    const formatQuery = text.toLowerCase();
    if(this.state.isAll){
      const data = _.filter(this.state.fullData, location => {
        return location.name.toLowerCase().includes(formatQuery)
      })
      this.setState({query: text, data})
    }else{
      const data = _.filter(this.state.queryData, location => {
        return location.name.toLowerCase().includes(formatQuery)
      })
      this.setState({query: text, data: data})
    }
  }

  handleFilter = (text) => {
    console.log(text)
    if(text === "Tất cả"){
      return this.setState({isAll: true, data: this.state.fullData})
    }else{
      this.setState({isAll: false})
    }
    const data = _.filter(this.state.fullData, location => {
      return location.departments.includes(text)
    })
    this.setState({queryData : data, data})
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch} />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      ></View>
    );
  };

  openDetailItem(rowData) {

    this.props.navigation.navigate("ItemScreen", { item: rowData });
  }

  render() {

    const { goBack } = this.props.navigation;
    console.log(this.state.data)
    return (
      <SafeAreaView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => {goBack()}} style={{marginTop: "4%"}}>
            <Icon  name="arrow-back"/>
          </TouchableOpacity>
          <View style={{flex: 1, width: "92%"}}>
            <SearchBar placeholder="Type Here..." lightTheme round onChangeText={this.handleSearch} />
          </View>
          

        </View>
        <Dropdown
          label='Chọn chuyên khoa'
          onChangeText={this.handleFilter}
          data={this.state.departments}
          value="Tất cả"
        />
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.openDetailItem(item)}>
                <Card >
                  <View style={styles.card}>
                    <Image
                      resizeMode="cover"
                      style={styles.image}
                      source={{uri: item.imageUrls[0]}}
                    />
                    <View style={{marginLeft: "3%", flexWrap: "wrap", flex:1 }}>
                      <Text style={styles.title}>{item.name}</Text>
                      <Text>{`${item.address.street}, ${item.address.ward}, ${item.address.district}, ${item.address.city}`}</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
              
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={this.renderSeparator}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </SafeAreaView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  searchView: {
    flex:1,
    flexDirection: 'row',
    marginTop: 25
  },
  image: {
    width:56,
    height:56
  },
  card: {
    flexDirection: "row"
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,

  }
});

//make this component available to the app
export default Search;
