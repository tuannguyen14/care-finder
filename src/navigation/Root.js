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
import LocationManager from "../screens/LocationManager";
import BasicInformation from "../screens/EditLocation/BasicInformation";
import Coordinatess from "../screens/EditLocation/Coordinates";
import WorkingTime from "../screens/EditLocation/WorkingTime";
import NearBy from "../screens/NearBy";
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
  LocationManagerScreen: { screen: LocationManager },
  BasicInformationScreen: { screen: BasicInformation },
  CoordinatesScreen: { screen: Coordinatess },
  WorkingTimeScreen: { screen: WorkingTime },
  NearByScreen: { screen: NearBy },
  AllItems: { screen: AllItems }
},
  {
    headerMode: 'none'
  });