import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

import {
  colors,
  fontSize,
  fontFamily,
  deviceHeight,
  deviceWidth
} from '../styles/variables';

export default class MenuItemBox extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <React.Fragment key={this.props.ids}>
        <LinearGradient
          start={{x: 0.2, y: 0.2}} end={{x: 1.0, y: 2.0}}
          colors={['rgb(255,255,255)', 'rgb(255,255,255)']}
          style={styles.card}
          key={`data-${ this.props.ids }`}>
          <TouchableHighlight
            key={`data-${ this.props.ids }`}
            underlayColor={colors.softBlue}
            style={styles.highLightCard}
            onPress={this.props.onPressCard}>
            <View key={`data-${ this.props.ids }`}>
              <Image
                key={`data-${ this.props.ids }`}
                source={{uri: `${this.props.icon}`}}
                style={[
                  styles.icon,
                  {width: deviceWidth * 0.39, height:this.props.iconHeight, marginTop: deviceHeight * -0.02, marginLeft: deviceWidth * -0.03, borderRadius: 5, }
                ]}
              />
              <View style={styles.titleSection}>
                <Text style={styles.header}>{this.props.header}</Text>
              </View>
            </View>
          </TouchableHighlight>
        </LinearGradient>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: deviceHeight * 0.17,
    borderWidth: 0,
    borderRadius: 5,
    marginTop: deviceHeight * 0.01,
    marginBottom: deviceHeight * 0.03,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 12
        },
        shadowRadius: 5,
        shadowOpacity: 0.0
      },
      android: {
        width: deviceWidth * 0.39,
      },
    }),
  },
  highLightCard: {
    height: deviceHeight * 0.19,
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
  titleSection: {
    backgroundColor: colors.blurry,
    position: 'absolute',
    marginLeft: deviceWidth * -0.03,
    marginTop: deviceHeight * 0.085,
    width: deviceWidth * 0.39,
    height: deviceHeight * 0.08,
    paddingLeft: deviceWidth * 0.11,
    paddingTop: deviceHeight * 0.01,
    borderRadius: 5,
  }
});

MenuItemBox.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  onPressCard: PropTypes.func,
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
};
