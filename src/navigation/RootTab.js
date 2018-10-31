import { createBottomTabNavigator } from "react-navigation";
import Home from "../screens/Home";
import BookMark from "../screens/BookMark";
import React, { Component } from 'react';
import IconFoundation from 'react-native-vector-icons/Foundation';
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
                tabBarLabel: "Lưu trữ",
                tabBarIcon: ({ tintColor }) => (
                    <IconFoundation name={'book-bookmark'} color={tintColor} size={24} />
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