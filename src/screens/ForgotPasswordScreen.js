import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import CheckBox from '../elements/CheckBox';
import CommonStyles from '../styles/CommonStyles';

import { deviceWidth, deviceHeight, shadowOpt, colors } from '../styles/variables';

import SignUpScreen from './SignUpScreen';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
// import SignInScreen from './SignInScreen';

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: '0',
      phone : '',
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalSinglePage}>
        <View style={styles.titleBox}>
          <Text extraLarge black semiBold>MOBILE NUMBER</Text>
        </View>
        <View style={styles.formBox}>
          <View style={CommonStyles.textInputField}>
            <Text region style={styles.region} >+62</Text>
            <TextInput
              placeholder='Phone'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={text => this.setState({phone: text})}
            />
          </View>
          <Text normal grey regular
            style={{width: deviceWidth - 70, marginBottom: 65, textAlign: 'left'}}
          >
            Lost access to your number?
          </Text>
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

  async _handleResetPassword() {
    this.props.loading(true);

    const data = {
      phone: this.state.region + this.state.phone,
      action: 'forgot',
    }
    // console.log(data);
    try {
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/forgot_password', data, {
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
        showError('Wrong Phone Number');
      }
    } catch (error) {
      this.props.loading(false);
      showError(error.message);
    }
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

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value })
  }
}

export default connect(null, mapDispatchToProps)(ForgotPasswordScreen)

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
  },
  region: {
    paddingTop: 5,
    marginLeft:10,
    backgroundColor: 'red',
    width: '15%',
  }
});
