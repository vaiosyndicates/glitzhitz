import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, TouchableHighlight, ScrollView, StatusBar, Platform } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';

import { deviceWidth, deviceHeight, shadowOpt, colors } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
import { resetLogin } from '../util/ResetRouting';

// @inject('sampleStore')
class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      email: '',
      password: '',

    };
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <ScrollView contentContainerStyle={{height: deviceHeight - 25}}>
          <View style={styles.titleBox}>
            <Text extraLarge black extraBold>SIGN IN</Text>
          </View>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{
                  position:'absolute',
                  bottom: 12,
                  left: 20,
                  width: 19,
                  height: 22
                }}
              />
              <TextInput
                placeholder='Email'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({email: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20, width: 17, height: 22}}
              />
              <TextInput
                placeholder='Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({password: text})}
              />
            </View>
            <View style={styles.subFormBox}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this._handleClickFortgotPass()}>
                <Image
                  source={require('../../img/healer/icForgotPass.png')}
                  style={{width: 40, height: 40}}
                />
              </TouchableHighlight>
            </View>
          </View>
          <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
            <GradientButton
              onPressButton={this._onLoggedIn.bind(this)}
              setting={shadowOpt}
              btnText="SIGN IN"
            />
          </View>
          <View style={styles.noteBox}>
            <Text normal lightGrey regular>
              Don't have an account?
              <Text> </Text>
              <Text
                style={{color: colors.softBlue}}
                onPress={() => this._goToSignUpScreen()}>
                SIGN UP
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _goToSignUpScreen() {
    this.props.navigation.navigate('SignUpScreen');
  }
  
  async _onLoggedIn() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    // console.log(data);
    try {
      this.props.loading(true);
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/login', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      if (response.status === 200) {

        this.props.loading(false);
        this.props.navigation.dispatch(resetLogin); 

      } else {
        this.props.loading(false);
        showError(response.message)
      }

    } catch (error) {
      this.props.loading(false);
      showError(error.message);
    }
  }

  _handleClickFortgotPass() {
    this.props.navigation.navigate('ForgotPasswordScreen');
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value })
  }
}

export default connect(null, mapDispatchToProps)(SignInScreen)

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 52,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.30,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.30,
        marginBottom: spaceHeight * 0.20,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 190,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.05,
  },
  subFormBox: {
    width: deviceWidth - 85,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
  }
});
