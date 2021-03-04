import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  blueGradient,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class PrimeNavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.outerContainer, this.props.outerContainerStyle]}>
        <View style={[styles.innerContainer, this.props.innerContainerStyle]}>
          <View style={styles.leftCol}>
            {this.props.menu &&
              <TouchableOpacity
                onPress={this._onClickMenuButton.bind(this)}
              >
                <View style={[this.props.leftBtnStyle, styles.leftBtn]}>
                  <Image
                    source={require('../../img/healer/menu.png')}
                    style={{width: 26, height: 17}}
                  />
                </View>
              </TouchableOpacity>
            }
            {this.props.back &&
              <TouchableOpacity
                onPress={this._onClickBackButton.bind(this)}
              >
                <View style={[this.props.leftBtnStyle, styles.leftBtn]}>
                  <Icon
                    name="md-arrow-back"
                    size={this.props.backIconStyle.size}
                    color={this.props.backIconStyle.color}
                    style={{backgroundColor: 'transparent'}}
                  />
                  <Icon
                    name="md-remove"
                    size={this.props.backIconStyle.size}
                    color={this.props.backIconStyle.color}
                    style={{width: 5, marginLeft: 3, backgroundColor: 'transparent'}}
                  />
                </View>
              </TouchableOpacity>
            }
            {!this.props.menu && !this.props.back && this.props.leftChildren}
          </View>
          <View style={styles.titleCol}>
            {this.props.titleImg != null && this.props.titleText == null &&
              <Image
                source={this.props.titleImg}
                style={{width: this.props.titleImgStyle.width, height: this.props.titleImgStyle.height}}
              />
            }
            {this.props.titleText != null && this.props.titleImg == null &&
              <Text style={[this.props.titleTextStyle, styles.titleText]}>
                {this.props.titleText}
              </Text>
            }
            {this.props.titleText == null && this.props.titleImg == null && this.props.centerChildren}
          </View>
          <View style={styles.rightCol}>
            {this.props.rightButtons != null &&
              this.props.rightButtons.map(button => (
                <View key={button.key}>
                  <TouchableOpacity
                    onPress={button.buttonAction}
                  >
                    <View style={[this.props.rightBtnStyle, styles.rightBtn]}>
                      <Image
                        source={button.buttonIcon}
                        style={{width: button.buttonWidth, height: button.buttonHeight}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
            {!this.props.rightButtons &&
              <View style={[this.props.rightBtnStyle, styles.rightBtn]}>
                {this.props.rightChildren}
              </View>
            }
          </View>
        </View>
      </View>
    );
  }

  // Handle click menu button
  _onClickMenuButton() {
    this.props.navigation.openDrawer()
  }

  // Handle click back button
  _onClickBackButton() {
    this.props.navigation.goBack(null);
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    //position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    ...Platform.select({
      ios: {
        paddingTop: STATUSBAR_HEIGHT,
        height: NAV_HEIGHT + STATUSBAR_HEIGHT,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 12 
        },
        shadowRadius: 5,
        shadowOpacity: 0.3 
      },
      android: {
        height: NAV_HEIGHT,
        elevation: 20,
      },
    }),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleCol: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth * 3/5,
  },
  titleText: {
    backgroundColor: 'transparent',
  },
  leftCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 7.5,
  },
  rightBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

PrimeNavigationBar.propTypes = {
  titleText: PropTypes.string,
  titleImg: PropTypes.number,
  centerChildren: PropTypes.any,
  leftChildren: PropTypes.any,
  rightChildren: PropTypes.any,

  // Styles
  outerContainerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
  gradientBgStyle: PropTypes.any,
  leftBtnStyle: PropTypes.any,
  rightBtnStyle: PropTypes.any,
  titleTextStyle: PropTypes.any,
  titleImgStyle: PropTypes.any,
  backIconStyle: PropTypes.any,
};

PrimeNavigationBar.defaultProps = {
  outerContainerStyle: {
    backgroundColor: colors.white,
  },
  titleTextStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: fontFamily.semiBold,
  },
  backIconStyle: {
    size: 28,
    color: colors.lightGrey,
  },
  leftBtnStyle: {
    height: NAV_HEIGHT,
    paddingHorizontal: 15,
  },
  rightBtnStyle: {
    height: NAV_HEIGHT,
    paddingHorizontal: 7.5,
    alignItems: 'center',
  },
};
