import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as Font from 'expo-font';

import IntroOneScreen from './IntroOneScreen';
import StartHeightScreen from './StartHeightScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { resetLogin, resetLogout } from '../util/ResetRouting';

class StartUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      didLoaded: true,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Poppins-Light': require('../../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
    if(this.state.didLoaded == true) {
      setTimeout(() => {
        this._getToken();
      }, 2000);
    }
  }

  componentWillUnmount() {
    this.setState({didLoaded: false});
  }

  async _getToken() {
    try {
      const value = await AsyncStorage.getItem('token')
      let data;
      if(value !== null) {
        const data = {
          token: value
        };
        this.props.token(data);
        this.props.navigation.dispatch(resetLogin);
      } else {
        this.props.navigation.dispatch(resetLogout);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.fontLoaded === false) {
      return (
        <View />
      )
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff'
        }}
      >
        <Image
          source={require('../../img/glitz/logo_glitz.png')}
          style={{width: 202, height: 171}}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    token: value => dispatch({ type: 'ADD_TOKEN', value: value })
  }
}

export default connect(null, mapDispatchToProps)(StartUpScreen)
