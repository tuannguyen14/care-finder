import React, { Component } from 'react';
import {
  createStackNavigator,
} from "react-navigation";
import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { RootDrawer } from "./RootDrawer";
import Item from "../screens/Item";
import InformationItem from "../screens/InformationItem";
import InformationUser from "../screens/InformationUser";
import ChangeInformationUser from "../screens/ChangeInformationUser";
import CreateNewLocation from "../screens/CreateNewLocation";
import LocationManager from "../screens/LocationManager";
import NearBy from "../screens/NearBy";
import Maps from "../screens/Maps";
import AllItems from "../screens/AllItems";
import Verify from "../screens/Verify";
import VerifyDoctor from "../screens/VerifyDoctor";
import Search from "../screens/Search"
import Booking from "../screens/Booking"

export const MainScreen = createStackNavigator({
  WelcomeScreen: { screen: Welcome },
  LoginScreen: { screen: Login },
  RegisterScreen: { screen: Register },
  VerifyScreen: { screen: Verify },
  RootDrawer: { screen: RootDrawer },
  ItemScreen: { screen: Item },
  InformationItemScreen: { screen: InformationItem },
  InformationUserScreen: { screen: InformationUser },
  ChangeInformationUserScreen: { screen: ChangeInformationUser },
  CreateNewLocationScreen: { screen: CreateNewLocation },
  LocationManagerScreen: { screen: LocationManager },
  NearByScreen: { screen: NearBy },
  MapsScreen: { screen: Maps },
  AllItemsScreen: { screen: AllItems },
  VerifyDoctorScreen: { screen: VerifyDoctor },
  SearchScreen: {screen: Search},
  BookingScreen: {screen: Booking}
},
  {
    headerMode: 'none'
  });