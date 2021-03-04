import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  StatusBar,
} from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceHeight,
  shadowOpt,
  introSpaceHeight,
} from '../styles/variables';
import SignInScreen from './SignInScreen';

export default class IntroThreeScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <View style={CommonStyles.introPageImageBox}>
          <Image
            source={require('../../img/healer/medicineBook.png')}
            style={{width: 155, height: 205.5}}
          />
        </View>
        <View style={CommonStyles.introPageTextBox}>
          <Text header black semiBold>APPOINTMENT</Text>
          <Text style={CommonStyles.introPageSubText}>
            Kidney stones are very hard mineral deposits
          </Text>
        </View>
        <View style={styles.introPageButtonBox}>
          <GradientButton
            onPressButton={this._handleClickGetStartedButton.bind(this)}
            setting={shadowOpt}
            btnText="GET STARTED"
          />
        </View>
      </View>
    );
  }

  _handleClickGetStartedButton() {
    this.props.navigation.navigate('SignInScreen');
  }
}

const styles = StyleSheet.create({
  introPageButtonBox: {
    alignItems: 'center',
    marginTop: introSpaceHeight * 0.27,
    marginBottom: 30,
  },
});
