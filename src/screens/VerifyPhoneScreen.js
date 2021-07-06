import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, StatusBar, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import {sizeHeight, sizeWidth} from '../util/Size';

import { deviceWidth, deviceHeight, shadowOpt, colors, fontSize } from '../styles/variables';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError, showSuccess } from '../util/ShowMessage';
import { NavigationActions, StackActions } from 'react-navigation';
import {resetAction} from '../util/ResetRouting';

class VerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    }
  }

  render() {    
    return (
      <View style={[CommonStyles.normalPage, {flex: 0}]}>
        <View style={styles.titleBox}>
          <Text header black semiBold >Verify Phone</Text>
          <Text normal grey regular
            style={{ width: deviceWidth - 70, marginTop: 15, textAlign: 'center' }}
          >
            We already send the otp code to your registered number
          </Text>
        </View>
        <CodeInput
          ref="codeInputRef1"
          className={'border-circle'}
          codeLength={6}
          placeholder="1"
          inputPosition='center'
          activeColor={'#76908E'}
          selectionColor={'#76908E'}
          inactiveColor={'#76908E'}
          keyboardType="numeric"
          codeInputStyle={[{
            color: '#76908E',
            borderWidth: sizeWidth(0.3),
            width: sizeWidth(12.8),
            height: sizeWidth(12.8),
            borderColor: "#76908E",
            borderRadius: sizeWidth(6.4)
          }]}
          containerStyle={{
            marginBottom: sizeHeight(12), 
            marginTop: sizeHeight(0.5),
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',
            paddingHorizontal: 27.5,
          }}
          onFulfill={(code) => {
            this._onFulfill(code)
          }}
        />
        <View style={CommonStyles.buttonBox}>
          <GradientButton
            onPressButton={this._handleVerify.bind(this)}
            setting={shadowOpt}
            btnText="Verify"
          />
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text
            style={{ color: colors.softBlue, fontSize: fontSize.header }}
            onPress={() => this._handleResend()}>
            Resend
            </Text>
        </View>
      </View>
    );
  }

  _onFulfill(code) {
    // TODO
    this.setState({otp: code})
  }

  async _handleVerify() {
    // TODO
    const action = this.props.navigation.state.params.action;
    const { navigation } = this.props;
    const data = {
      phone: this.props.navigation.state.params.phone,
      otp: this.state.otp,
    };

    try {
      this.props.loading(true);
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/cek_otp', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );

      if (response.data.status === 200) {
        this.props.loading(false);

        if(action === 'register') {
          showSuccess('Registration Success');
          setTimeout(() => {
            navigation.dispatch(resetAction); 
          }, 2000);

        } else if(action === 'forgot') {
          this.props.navigation.navigate('ChangePasswordScreen', data);
        }

      } else {
        this.props.loading(false);
        showError('Wrong OTP Code');
      }

    } catch (error) {
      this.props.loading(false);
      console.log(error);
    }
  }

  async _handleResend() {
    // TODO
    const data = {
      phone: this.props.navigation.state.params.phone
    }

    try {
      this.props.loading(true);
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/resend_otp', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );
      
      if(response.status === 200) {
        this.props.loading(false);
        showSuccess('OTP Re-send')
      } else {
        this.props.loading(false);
        showError(response.message)
      }

    } catch (error) {
      this.props.loading(false);
      showError(error.message)
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value })
  }
}

export default connect(null, mapDispatchToProps)(VerifyPhoneScreen)

const styles = StyleSheet.create({
  titleBox: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 48,
  }
});
