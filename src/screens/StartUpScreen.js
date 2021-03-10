import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import * as Font from 'expo-font';

import IntroOneScreen from './IntroOneScreen';
import StartHeightScreen from './StartHeightScreen';
import { connect } from 'react-redux';

class StartUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
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
  }

  render() {
    if (this.state.fontLoaded === false) {
      return (
        <View />
      )
    }

    setTimeout(() => {
      this.props.navigation.navigate('GetStartedScreen');
    }, 2000);

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

const mapStateToProps = (state) => ({
  authToken: state.tokenReducer.authToken
});

export default connect(mapStateToProps)(StartUpScreen)
