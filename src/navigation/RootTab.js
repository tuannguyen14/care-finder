import { createBottomTabNavigator } from "react-navigation";
import Home from "../screens/Home";
import BookMark from "../screens/BookMark";
import Maps from "../screens/Maps";
import React, { Component } from 'react';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AppColors } from '../styles/AppColors.js';

export const RootTab = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: "Trang chính",
                tabBarIcon: ({ tintColor }) => (
                    <IconFoundation name="home" color={tintColor} size={24} />
                ),
            }
        },
        BookMark: {
            screen: BookMark,
            navigationOptions: {
                tabBarLabel: "Đang Theo dõi",
                tabBarIcon: ({ tintColor }) => (
                    <IconSimpleLineIcons name={'user-following'} color={tintColor} size={24} />
                )
            }
        },
        Maps: {
            screen: Maps,
            navigationOptions: {
                tabBarLabel: "Bản đồ",
                tabBarIcon: ({ tintColor }) => (
                    <IconFoundation name={'map'} color={tintColor} size={24} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            initialRouteName: 'Home',
            style: {
            },
            activeTintColor: AppColors.color,
            inactiveTintColor: "#979797"
        }
    }
);