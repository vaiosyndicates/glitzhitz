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

import { deviceWidth, deviceHeight, shadowOpt, colors } from '../styles/variables';

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
      <View style={CommonStyles.normalSinglePage}>
        <ScrollView contentContainerStyle={{height: deviceHeight - 25}}>
          <View style={styles.titleBox}>
            <Text extraLarge black extraBold>SIGN IN</Text>
          </View>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
               source={require('../../img/healer/envelope.png')}
               style={{position:'absolute',bottom: 12,left: 20,width: 22, height: 17}}
              />
              <TextInput
                placeholder='Username / Email'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({email: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20, width: 17, height: 22, zIndex: 99999}}
              />
              <TextInput
                placeholder='Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={this.state.hidden}
              />
            </View>
            {this.state.eyeOpen &&
              <ImageButton
                appearance={{
                    normal: require("../../img/glitz/eye-open.png"),
                    highlight: require("../../img/glitz/eye-open.png")
                }}
                onPress={this.onPress.bind(this)}
                style={styles.imageButton}
              />
            }
           {this.state.eyeClose &&
              <ImageButton
                appearance={{
                    normal: require("../../img/glitz/eye-closed.png"),
                    highlight: require("../../img/glitz/eye-closed.png")
                }}
                onPress={this.onPressClose.bind(this)}
                style={styles.imageButton}
              />
            }

          </View>
          <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
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
          <View style={styles.noteBoxes}>
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
  titleBox: {
    marginTop: spaceHeight * 0.20,
    marginBottom: spaceHeight * 0.20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: deviceHeight * 0.28,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.05,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: deviceHeight * -0.01,
  },
  noteBoxes: {
    alignItems: 'center',
    marginTop: deviceHeight * -0.05,
  },
  imageButton: {
    marginTop: deviceHeight * -0.075,
    marginLeft: deviceWidth * 0.70
  }
});
