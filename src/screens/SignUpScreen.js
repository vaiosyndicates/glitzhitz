import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';

import { deviceHeight, shadowOpt, colors } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import StartNameScreen from './StartNameScreen';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
// import SignInScreen from './SignInScreen';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      email: '',
      gender: '',
      password: '',
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <ScrollView contentContainerStyle={{height: deviceHeight}} showsVerticalScrollIndicator={false}>
          <View style={styles.titleBox}>
            <Text extraLarge black extraBold>SIGN UP</Text>
          </View>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Fullname'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({name: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Phone'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({phone: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Address'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({address: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/envelope.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 22, height: 17}}
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
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Gender'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({gender: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
              />
              <TextInput
                placeholder='Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({password: text})}
                secureTextEntry
              />
            </View>
            <View style={CommonStyles.buttonBox}>
              <GradientButton
                onPressButton={this._handleClickSignUpButton.bind(this)}
                setting={shadowOpt}
                btnText="SIGN UP"
                disabled={
                  this.state.name.length < 3 ||
                  this.state.phone.length < 3 ||
                  this.state.address.length < 3 ||
                  this.state.email.length < 3 ||
                  this.state.gender.length < 3 ||
                  this.state.password.length < 3
                    ? true
                    : false
                }/>
            </View>
            <View style={styles.noteBox}>
              <Text normal lightGrey regular>
                Have an account?
                <Text> </Text>
                <Text
                  style={{color: colors.softBlue}}
                  onPress={() => this._handleClickSignIn()}>
                  SIGN IN
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  async _handleClickSignUpButton() {
    this.props.loading(true);
    const data = {
      name: this.state.name,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      gender: this.state.gender,
      password: this.state.password,
      android_device_id: DeviceInfo.getUniqueId(),
    };

    try {
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/add', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      if (response.data.status === 200) {

        this.props.loading(false);
        this.props.navigation.navigate('VerifyPhoneScreen', data);

      } else {
        this.props.loading(false);
        showError(response.data.message)
      }

    } catch (error) {
      this.props.loading(false);
      console.log(error.response);
      showError(error.message);
    }
  }

  _handleClickSignIn() {
    // const screen = SignInScreen;
    // const params = null;
    // const path = null;
    // const { router } = screen;
    // const action = path && router.getActionForPathAndParams(path, params);

    // this.props.navigation.navigate('SignInScreen', {}, action);
    this.props.navigation.navigate('SignInScreen');
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value })
  }
}

export default connect(null, mapDispatchToProps)(SignUpScreen)

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 52,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.38,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.32,
        marginBottom: spaceHeight * 0.18,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 255,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.15,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    marginTop: 40,
  }
});