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
import { showError } from '../util/ShowMessage';

class VerifyPhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
    }
    const { navigation } = this.props;
    console.log(this.props);
  }

  render() {
    return (
      <View style={[CommonStyles.normalPage, {flex: 0}]}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
        />
        <View style={styles.titleBox}>
          <Text header black semiBold >Verify Phone</Text>
          <Text normal grey regular
            style={{ width: deviceWidth - 70, marginTop: 15, textAlign: 'center' }}
          >
            We just need your resgistered Email to send you password reset intruction
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

    const data = {
      phone: this.props.navigation.state.params.phone,
      otp: this.state.otp,
    };

    try {
      // console.log(data);
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
        console.log(response);
        // this.props.navigation.replace('SignInScreen');

      } else {
        this.props.loading(false);
        showError('Wrong OTP Code');
      }

    } catch (error) {
      this.props.loading(false);
      console.log(error.response.data);
    }
    // this.props.navigation.navigate('StartNameScreen');
  }

  _handleResend() {
    // TODO
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
