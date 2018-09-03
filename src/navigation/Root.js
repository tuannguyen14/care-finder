import React, { Component } from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import Icon from 'react-native-vector-icons/Feather';
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import MainTab from "./MainTab";
import Item from "../screens/Item";

export const MainScreen = createStackNavigator({
  LoginScreen: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },

  RegisterScreen: {
    screen: Register,
    navigationOptions: {
      header: null
    }
  },

  MainTabScreen: {
    screen: MainTab,
    navigationOptions: {
      header: null
    }
  }
});

export const HomeStack = createStackNavigator({
  HomeScreen: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },

  ItemScreen: {
    screen: Item,
    navigationOptions: {
      header: null
    }
  },
});

export const Tabbar = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Trang chính",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        ),
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Cài đặt",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="settings" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
      },
      activeTintColor: "#F44336",
      inactiveTintColor: "#979797"
    }
  }
);