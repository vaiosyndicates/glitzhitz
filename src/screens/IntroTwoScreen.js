import React, { Component } from 'react';
import { View, StyleSheet, Image, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';
import ImageButton from '../elements/ImageButton';

import CommonStyles from '../styles/CommonStyles';
import { blueGradient } from '../styles/variables';
import IntroThreeScreen from './IntroThreeScreen';

export default class IntroTwoScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <View style={CommonStyles.introPageImageBox}>
          <Image
            source={require('../../img/healer/pills3.png')}
            style={{width: 202.5, height: 205}}
          />
        </View>
        <View style={CommonStyles.introPageTextBox}>
          <Text header black semiBold>DRUGS</Text>
          <Text style={CommonStyles.introPageSubText}>
            I know how terrible it can be for you at nights and even
          </Text>
        </View>
        <View style={CommonStyles.introPageButtonBox}>
          <View style={CommonStyles.introPageLeftBtn}>
            <ImageButton
              style={CommonStyles.backButton}
              styleImage={CommonStyles.backButton}
              appearance={{
                normal: require("../../img/healer/esclipCopy2.png"),
                highlight: require("../../img/healer/esclipCopy2.png")
              }}
              onPress={this._prevScreenApp.bind(this)}
            />
          </View>
          <View style={CommonStyles.introPageCenterBtn}>
            <View style={{
              width: 25,
              height: 5,
              margin: 5,
              backgroundColor: 'rgb(200,200,200)',
              borderRadius: 2.5
            }}/>
            <LinearGradient
              start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
              colors={blueGradient.colors}
              style={{
                width: 25,
                height: 5,
                marginRight: 5,
                borderRadius: 2.5
              }}
            />
            <View style={{
              width: 25,
              height: 5,
              backgroundColor: 'rgb(200,200,200)',
              borderRadius: 2.5
            }}/>
          </View>
          <View style={CommonStyles.introPageRightBtn}>
            <ImageButton
              style={CommonStyles.nextButton}
              styleImage={CommonStyles.nextButton}
              appearance={{
                normal: require("../../img/healer/next.png"),
                highlight: require("../../img/healer/next.png")
              }}
              onPress={this._handleClickNextButton.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }

  // Go to IntroThreeScreen
  _handleClickNextButton() {
		const screen = IntroThreeScreen;
		const params = null;
		const path = null;
		const { router } = screen;
		const action = path && router.getActionForPathAndParams(path, params);

		this.props.navigation.navigate('IntroThreeScreen', {}, action);
  }

  // Back the previous screen
  _prevScreenApp() {
		this.props.navigation.goBack(null);
  }
}
