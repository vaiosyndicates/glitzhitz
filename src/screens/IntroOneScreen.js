import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Image, Platform } from 'react-native';

import IntroTwoScreen from './IntroTwoScreen';

import Text from '../elements/Text';
import ImageButton from '../elements/ImageButton';
import CommonStyles from '../styles/CommonStyles';
import { blueGradient } from '../styles/variables';

export default class IntroOneScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <View style={CommonStyles.introPageImageBox}>
          <Image
            source={require('../../img/healer/surgeon.png')}
            style={{width: 152, height: 205.5}}
          />
        </View>
        <View style={CommonStyles.introPageTextBox}>
          <Text header black semiBold>DOCTORS</Text>
          <Text style={CommonStyles.introPageSubText}>
            One way to announce or pro mote a certain new product
          </Text>
        </View>
        <View style={CommonStyles.introPageButtonBox}>
          <View style={CommonStyles.introPageLeftBtn} />
          <View style={CommonStyles.introPageCenterBtn}>
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
              marginRight: 5,
              backgroundColor: 'rgb(200,200,200)',
              borderRadius: 2.5
            }}/>
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

  // Go to IntroTwoScreen
  _handleClickNextButton() {
    const screen = IntroTwoScreen;
    const params = null;
    const path = null;
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('IntroTwoScreen', {}, action);
  }
}
