import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import CheckBox from '../elements/CheckBox';
import CommonStyles from '../styles/CommonStyles';

import { deviceWidth, deviceHeight, shadowOpt, colors } from '../styles/variables';

import SignUpScreen from './SignUpScreen';
// import SignInScreen from './SignInScreen';

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
        />
        <View style={styles.titleBox}>
          <Text header black semiBold>FORGOT PASSWORD</Text>
          <Text normal grey regular
            style={{width: deviceWidth - 70, marginTop: 15, textAlign: 'center'}}
          >
            We just need your registered Email to  send you password reset intruction
          </Text>
        </View>
        <View style={styles.formBox}>
          <View style={CommonStyles.textInputField}>
            <Image
              source={require('../../img/healer/envelope.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 22, height: 17}}
            />
            <TextInput
              placeholder='Email'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
            />
          </View>
        </View>
        <View style={CommonStyles.buttonBox}>
          <GradientButton
            onPressButton={this._handleResetPassword.bind(this)}
            setting={shadowOpt}
            btnText="RESET PASSWORD"
          />
        </View>
        <View style={styles.noteBox}>
          <Text normal lightGrey regular>
            Don't have an account?
            <Text> </Text>
            <Text
              style={{color: colors.softBlue}}
              onPress={() => this._handleClickSignUp()}>
              SIGN UP
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  _handleResetPassword() {
    // const screen = SignInScreen;
    // const params = null;
    // const path = null; 
    // const { router } = screen;
    // const action = path && router.getActionForPathAndParams(path, params);

    // this.props.navigation.navigate('SignInScreen', {}, action);
    this.props.navigation.navigate('SignInScreen');
  }

  _handleClickSignUp() {
    const screen = SignUpScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('SignUpScreen', {}, action);
  }
}

const styles = StyleSheet.create({
  titleBox: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 48,
  },
  formBox: {
    alignItems: 'center',
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
  }
});
