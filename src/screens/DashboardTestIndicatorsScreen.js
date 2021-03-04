import React, { Component } from 'react';
import { View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CustomTabBar from '../components/CustomTabBar';
import TestIndicatorsCard from '../components/indicators-settings/TestIndicatorsCard';

export default class DashboardTestIndicatorsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          menu
          titleText='Test Indicators'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/search.png'),
                buttonAction: this.onClickSearchButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              },
              {
                key: 2,
                buttonIcon: require('../../img/healer/settings.png'),
                buttonAction: this.onClickSettingButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              }
            ]
          }
        />
        <ScrollView style={CommonStyles.scrollView}>
          <View style={CommonStyles.wrapperBox}>
            <TestIndicatorsCard
              header='Desinfectant'
              image={require('../../img/healer/desinfectant.png')}
              imageWidth={17}
              imageHeight={23}
              onPressDetails={() => {
                this.props.navigation.navigate("IndicatorsDetailsScreen");
              }}
              onPressGoal={() => {
                this.props.navigation.navigate("GoalSettingsScreen");
              }}
            />
            <TestIndicatorsCard
              header='Transfusion'
              image={require('../../img/healer/transfusion.png')}
              imageWidth={17}
              imageHeight={23}
              onPressDetails={() => {
                this.props.navigation.navigate("IndicatorsDetailsScreen");
              }}
              onPressGoal={() => {
                this.props.navigation.navigate("GoalSettingsScreen");
              }}
            />
          </View>
        </ScrollView>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabThree'
        />
      </View>
    );
  }

  onClickSearchButton() {
    // TODO: Click search button
  }

  onClickSettingButton() {
    this.props.navigation.navigate("SettingsScreen");
  }
}

DashboardTestIndicatorsScreen.defaultNavigationOptions = {
  tabBarVisible: false
}
