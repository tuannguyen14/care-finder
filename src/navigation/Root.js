import React, { Component } from 'react';
import {
  createStackNavigator,
} from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { RootDrawer } from "./RootDrawer";
import Item from "../screens/Item";
import InformationUser from "../screens/InformationUser";
import ChangeInformationUser from "../screens/ChangeInformationUser";
import CreateNewLocation from "../screens/CreateNewLocation";

export const MainScreen = createStackNavigator({
  LoginScreen: { screen: Login },
  RegisterScreen: { screen: Register },
  RootDrawer: { screen: RootDrawer },
  ItemScreen: { screen: Item },
  InformationUserScreen: { screen: InformationUser },
  ChangeInformationUserScreen: { screen: ChangeInformationUser },
  CreateNewLocationScreen: { screen: CreateNewLocation }
},
  {
    headerMode: 'none'
  });