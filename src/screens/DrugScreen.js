import React, { Component } from 'react';
import { View, StyleSheet, Image, Platform, TouchableHighlight, StatusBar } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT, colors, fontSize, fontFamily } from '../styles/variables';

import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';

export default class DrugScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Drugs'
          menu
        />
        <View style={styles.titleBox}>
          <Text title lightGrey extraBold>
            DO YOU NEED MEDICINES?
          </Text>
        </View>
        <View style={styles.fullField}>
          <View style={styles.colMainLeft}>
            <MenuItemBox
              header='Drugs List'
              subHeader='113 Doctors'
              icon={require('../../img/healer/list.png')}
              iconWidth={26}
              iconHeight={26}
              onPressCard={this._handleClickDrugsList.bind(this)}
            />
            <MenuItemBox
              header='Reminder'
              subHeader='19 reminder'
              icon={require('../../img/healer/alarm.png')}
              iconWidth={22}
              iconHeight={26}
              onPressCard={this._handleClickReminder.bind(this)}
            />
          </View>
          <View style={styles.colMainRight}>
            <MenuItemBox
              header='Drugs A-Z'
              subHeader='459 Drugs'
              icon={require('../../img/healer/pills3Icon.png')}
              iconWidth={26}
              iconHeight={26}
              onPressCard={this._handleClickDrugsList.bind(this)}
            />
            <MenuItemBox
              header='Drugs Shop'
              subHeader='Shop online'
              icon={require('../../img/healer/medicine.png')}
              iconWidth={24}
              iconHeight={26}
              onPressCard={this._handleClickDrugsShop.bind(this)}
            />
          </View>
        </View>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabOne'
        />
      </View>
    )
  }

  _handleClickDrugsList() {
    this.props.navigation.navigate('ListDrugsScreen');
  }

  _handleClickReminder() {
    this.props.navigation.navigate('NotificationScreen');
  }

  _handleClickDrugsShop() {
    this.props.navigation.navigate('DrugsShopScreen');
  }
}

DrugScreen.defaultNavigationOptions = {
  tabBarVisible: false,
};

const ELEMENT_HEIGHT = 375;
const spaceHeight = deviceHeight - (NAV_HEIGHT + TAB_HEIGHT + ELEMENT_HEIGHT);

const styles = StyleSheet.create({
  titleBox: {
    marginTop: spaceHeight * 0.38,
    paddingHorizontal: 27,
  },
  fullField: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: spaceHeight * 0.1,
  },
  colMainLeft: {
    flex: 1,
    marginRight: 8,
  },
  colMainRight: {
    flex: 1,
    marginLeft: 8,
  },
});
