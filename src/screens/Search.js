//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar, Card } from "react-native-elements";

import axios from 'axios';

// create a component
class Search extends Component {
  state = {
    search: '',
    location: global.allLocations,
    loading: false,
    error: null
  };

  updateSearch = search => {
    this.setState({ search });
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
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
      />
    );
  };

  render() {
    const { search } = this.state;
    const { goBack } = this.props.navigation;
    console.log(this.state.location)
    return (
      <View >
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.location}
            renderItem={({ item }) => (
              <Card 
                image={item.imageUrls[0]}
                title={item.name}
              />
            )}
            keyExtractor={item => item._id}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </View>
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
  }
});

//make this component available to the app
export default Search;
