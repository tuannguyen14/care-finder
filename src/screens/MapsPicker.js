import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  DeviceEventEmitter,
  ActivityIndicator,
  CameraRoll,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView
} from 'react-native';

const ImagePicker = require("react-native-image-picker");

var RNUploader = NativeModules.RNUploader;

const options = {
  title: "Chọn ảnh từ:",
  quality: 0.01,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


export default class MapsPicker extends Component {

  test() {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        alert(response.uri);
      }
    });
  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.test()}>
          <Text>a</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 20,
    paddingTop: 40,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
    width: 73,
    height: 73,
    borderWidth: 1,
    borderColor: '#DDD',
    margin: 5,
  },
  modal: {
    margin: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'lightyellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#EEE',
    marginHorizontal: 5,
  }
});

