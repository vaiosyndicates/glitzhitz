import React from 'react';
import { Button, ScrollView } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
  StackRouter,
  createNavigator,
  createNavigationContainer,
  addNavigationHelpers,
} from 'react-navigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MainTabs from './MainTabs';
import DrawerView from '../components/DrawerView';
import HealerBlogsScreen from '../screens/HealerBlogsScreen';

const StacksOverTabs = StackNavigator(
  {
    MainTabs: {
      screen: MainTabs,
    },
    HealerBlogsScreen: {
      screen: HealerBlogsScreen
    }
  },
  {
    initialRouteName: 'MainTabs',
    headerMode: 'none',
  }
);

const CustomDrawer = createNavigationContainer(
  createNavigator(StacksOverTabs)(DrawerView)
);

export default CustomDrawer;
