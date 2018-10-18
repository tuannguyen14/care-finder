import React, { Component } from 'react';
import {
  createStackNavigator,
} from "react-navigation";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { RootDrawer } from "./RootDrawer";
import Item from "../screens/Item";
import InformationItem from "../screens/InformationItem";
import InformationUser from "../screens/InformationUser";
import ChangeInformationUser from "../screens/ChangeInformationUser";
import CreateNewLocation from "../screens/CreateNewLocation";
import AllItems from "../screens/AllItems";
import Verify from "../screens/Verify";

export const MainScreen = createStackNavigator({
  LoginScreen: { screen: Login },
  RegisterScreen: { screen: Register },
  VerifyScreen: { screen: Verify },
  RootDrawer: { screen: RootDrawer },
  ItemScreen: { screen: Item },
  InformationItem: { screen: InformationItem },
  InformationUserScreen: { screen: InformationUser },
  ChangeInformationUserScreen: { screen: ChangeInformationUser },
  CreateNewLocationScreen: { screen: CreateNewLocation },
  AllItems: { screen: AllItems }
},
  {
    headerMode: 'none'
  });