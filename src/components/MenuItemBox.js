import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import {
  colors,
  fontSize,
  fontFamily
} from '../styles/variables';

export default class MenuItemBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LinearGradient
        start={{x: 0.2, y: 0.2}} end={{x: 1.0, y: 2.0}}
        colors={['rgb(150,150,150)', 'rgb(105,105,105)']}
        style={styles.card}>
        <TouchableHighlight
          underlayColor={colors.softBlue}
          style={styles.highLightCard}
          onPress={this.props.onPressCard}>
          <View>
            <Image
              source={this.props.icon}
              style={[
                styles.icon,
                {width:this.props.iconWidth, height:this.props.iconHeight}
              ]}
            />
            <Text style={styles.header}>{this.props.header}</Text>
            <Text style={styles.subHeader}>{this.props.subHeader}</Text>
          </View>
        </TouchableHighlight>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 135,
    borderWidth: 0,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 12,
      },
    }),
  },
  highLightCard: {
    height: 135,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 9,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    color: colors.white,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.extraBold,
  },
  subHeader: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    opacity: 0.6
  },
  icon: {
    marginBottom: 24,
  },
});

MenuItemBox.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  onPressCard: PropTypes.func,
  icon: PropTypes.number,
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
};
