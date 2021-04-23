import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import { Svg } from 'expo';
import { LinearGradient } from 'expo-linear-gradient'

import { 
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class GradientButton extends Component {
  render = () => {
    // Get the shadow settings and give them default values
    const {
      setting: {
        btnWidth = 0,
        btnHeight = 0,
        fontSize = 18,
        shadowHeight = 100,
        backgroundColor = '#4b66ea',
        color = "#000",
        realColor = "#fff",
        style = {}
      },
      onPressButton,
      btnText,
      disabled,
    } = this.props;

    // Define button style
    const styles = StyleSheet.create({
      button: {
        width: btnWidth,
        height: btnHeight,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: btnHeight / 2,
      },
      text: {
        fontFamily: fontFamily.semiBold,
        fontSize: fontSize,
        color: '#fff',
      },
    });

    // Return a view ,whose background is a svg picture
    return (
      <View>
        <View
          style={{
            width: btnWidth,
            height: shadowHeight,
            position:"absolute",
            top: -8,
            left: -15,
          }}
        >
          <Image
            source={require('../../img/healer/shadow.png')}
            style={{
              width: btnWidth + 30,
              height: (btnWidth + 30) * 145 / 660,
            }}
          />
        </View>
        <LinearGradient
          start={{x: 0.2, y: 0.4}} end={{x: 1.0, y: 1.0}}
          colors={disabled ? colors.gradient  : colors.gradient  }
          style={[styles.button, {position: 'relative'}]}>
          <TouchableHighlight
            underlayColor={'rgb(105,105,105)'}
            style={styles.button}
            onPress={onPressButton}
            disabled={disabled}>
            <Text style={styles.text}>{btnText}</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    )
  }
}
