import React from 'react';
import { Button, Platform, ScrollView, StyleSheet } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  StackRouter,
  TabRouter,
  createNavigator,
  createNavigationContainer,
  addNavigationHelpers,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MainServiceScreen from '../screens/MainServiceScreen';
import DrugScreen from '../screens/DrugScreen';
import ListDoctorsScreen from '../screens/ListDoctorsScreen';
import DashboardTestIndicatorsScreen from '../screens/DashboardTestIndicatorsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import DrawerView from '../components/DrawerView';

const MainTabs = TabRouter(
  {
    MainServiceScreen: {
      screen: MainServiceScreen,
      path: 'main_service',
    },
    DrugScreen: {
      screen: DrugScreen,
      path: 'drug',
    },
    ListDoctorsScreen: {
      screen: ListDoctorsScreen,
      path: 'doctors',
    },
    DashboardTestIndicatorsScreen: {
      screen: DashboardTestIndicatorsScreen,
      path: 'dashboard',
    },
    UserProfileScreen : {
      screen: UserProfileScreen,
      path: 'profile',
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'MainServiceScreen',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Platform.OS === 'ios' ? '#e91e63' : '#fff',
    }, 
  }
);

export default MainTabs; 
