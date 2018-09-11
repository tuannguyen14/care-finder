import React, { Component } from 'react';
import {
  createStackNavigator,
} from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { RootDrawer } from "./RootDrawer";
import Item from "../screens/Item";

export const MainScreen = createStackNavigator({
  LoginScreen: { screen: Login },
  RegisterScreen: { screen: Register },
  RootDrawer: { screen: RootDrawer },
  ItemScreen: { screen: Item }
},
  {
    headerMode: 'none'
  });