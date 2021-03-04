import React, { Component } from 'react';
import { StatusBar, TextInput, View, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import { deviceWidth, deviceHeight, shadowOpt } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import StartBirthdayScreen from './StartBirthdayScreen';

export default class StartNameScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <StatusBar backgroundColor={'transparent'} translucent />
        <PrimeNavigationBar
          navigation={this.props.navigation}
          rightChildren={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this.onStartYourBirthDayScreen.bind(this)}
            >
              <Text header softBlue regular>Skip</Text>
            </TouchableOpacity>
          }
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>YOUR NAME</Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <View style={CommonStyles.textInput}>
            <Image
              source={require('../../img/healer/avatar.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
            />
            <TextInput
              placeholder='Full name'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={{height: 45, alignSelf: 'center'}}>
          <GradientButton
            onPressButton={this.onStartYourBirthDayScreen.bind(this)}
            setting={shadowOpt}
            btnText="SUBMIT"
          />
        </View>
      </View>
    );
  }

  bannerError(error) {
    console.log("Banner error", error);
  }

  onStartYourBirthDayScreen() {
    const screen = StartBirthdayScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('StartBirthdayScreen', {}, action);
  }
}
