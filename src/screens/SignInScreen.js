import React, { Component } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Image, 
  TouchableHighlight, 
  ScrollView, 
  StatusBar, 
  Platform,
} from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';

import { deviceWidth, deviceHeight, shadowOpt, colors, fontFamily } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
import { resetLogin } from '../util/ResetRouting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageButton from '../elements/ImageButton';
import { apiUrl } from '../util/API';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

// @inject('sampleStore')
class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remember: false,
      email: '',
      password: '',
      didLoaded: true,
      hidden: true,
      eyeOpen: true,
      eyeClose: false,
    };
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.headerSection}>
          <Text extraLarge black extraBold>SIGN IN </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.formSection}>
            <View style={styles.emailSection}>
              <View style={styles.imageBox}>
                <Image
                  source={require('../../img/healer/envelope.png')}
                  style={{width: 22, height: 17}}
                  />
              </View>
              <View>
                <TextInput
                  placeholder='Username / Email'
                  underlineColorAndroid='transparent'
                  style={styles.inputEmail}
                  onChangeText={text => this.setState({email: text})}
                />
              </View>
            </View>
            <View style={styles.passwordSection}>
              <View style={styles.imageBox}>
                <Image
                  source={require('../../img/healer/padlock.png')}
                  style={{width: 17, height: 22}}
                />
              </View>
              <View>
                <TextInput
                  placeholder='Password'
                  underlineColorAndroid='transparent'
                  style={styles.inputPassword}
                  onChangeText={text => this.setState({password: text})}
                  secureTextEntry={this.state.hidden}
                />
              </View>
              <View style={styles.visibilitySection}>
              {this.state.eyeOpen &&
                <ImageButton
                  appearance={{
                      normal: require("../../img/glitz/eye-open.png"),
                      highlight: require("../../img/glitz/eye-open.png")
                  }}
                  onPress={this.onPress.bind(this)}
                  style={styles.imageButtons}
                />
              }
              {this.state.eyeClose &&
                <ImageButton
                  appearance={{
                      normal: require("../../img/glitz/eye-closed.png"),
                      highlight: require("../../img/glitz/eye-closed.png")
                  }}
                  onPress={this.onPressClose.bind(this)}
                  style={styles.imageButtons}
                />
              }
              </View>
            </View>
            <View style={styles.buttonItem}>
              <View style={styles.buttonSignIn}>
                <GradientButton
                  onPressButton={this._onLoggedIn.bind(this)}
                  setting={shadowOpt}
                  btnText="SIGN IN"
                  disabled={
                    this.state.email.length < 3 ||
                    this.state.password.length < 3
                      ? true
                      : false
                  }
                />
              </View>
              <View>
                <Text normal lightGrey regular>
                  Forgot Password?
                  <Text> </Text>
                  <Text
                    style={{color: colors.softBlue}}
                    onPress={() => this._handleClickFortgotPass()}>
                    FORGOT
                  </Text>
                </Text>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.footerNote}>
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
          </View>
        </View>
      </View>
    );
  }

  _goToSignUpScreen() {
    this.props.navigation.navigate('SignUpScreen');
  }

  onPress = () => {
    this.setState({eyeOpen: false})
    this.setState({eyeClose: true})
    this.setState({hidden: false})
  };

  onPressClose = () => {
    this.setState({eyeOpen: true})
    this.setState({eyeClose: false})
    this.setState({hidden: true})
  };
  
  async _onLoggedIn() {
    const data = {
      email: this.state.email,
      password: this.state.password,
    }
    // console.log(data);
    try {
      this.props.loading(true);
      const response = await axios.post(
        `${apiUrl}/User/login`, data, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      if (response.data.status === 200) {

        this.props.loading(false);
        try {
          await AsyncStorage.setItem('email', data.email);
          await AsyncStorage.setItem('token', response.data.data.token)
          this.props.setToken(response.data.data.token);
          this.props.navigation.dispatch(resetLogin); 

        } catch (error) {
          showError(error)
        }
      } else {
        this.props.loading(false);
        showError(response.data.message)
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
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    setToken: value => dispatch({ type: 'ADD_TOKEN', value: value }),
  }
}

export default connect(null, mapDispatchToProps)(SignInScreen)

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerSection: {
    marginTop: StatusBar.currentHeight + moderateScale(40),
    alignItems: 'center',
  },
  imageBox: {
    height: moderateScale(45),
    width: moderateScale(30),
    paddingLeft: moderateScale(5) ,
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderViolet
  },
  emailSection: {
    flexDirection : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: moderateScale(10),
  },
  inputEmail: {
    width: moderateScale(300),
    height: moderateScale(45),
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderViolet,
    fontSize: moderateScale(15),
    fontFamily: fontFamily.semiBold,
  },
  inputPassword: {
    width: moderateScale(250),
    height: moderateScale(45),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderViolet,
    fontSize: moderateScale(15),
    fontFamily: fontFamily.semiBold,
  },
  formSection: {
    marginTop: moderateScale(100),
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: moderateScale(15),
  },
  visibilitySection: {
    width: moderateScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderViolet,
  },
  buttonItem: {
    alignItems: 'center',
  },
  buttonSignIn: {
    marginVertical: moderateScale(20),
  },
  footerNote: {
    alignItems: 'center',
  },
});
