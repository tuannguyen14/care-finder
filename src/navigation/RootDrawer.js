import React, { Component } from 'react';
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import DrawerRender from "./DrawerRender";
import { RootTab } from "./RootTab";

let { width, height } = Dimensions.get("window");

export const RootDrawer = createDrawerNavigator(
    {
        RootTab: {
            screen: RootTab,
        },
    },
    {
        drawerWidth: width * 0.75,
        drawerPosition: "left",
        contentComponent: props => <DrawerRender {...props} />,
        drawerBackgroundColor: "transparent"
    }
);