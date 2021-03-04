import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  TAB_HEIGHT
} from '../styles/variables';

export default class PrimeTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[this.props.outerContainerStyle, styles.outerContainer]}>
        <View style={[this.props.innerContainerStyle, styles.innerContainer]}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabOneBtn.action}>
            {this.props.isActive == 'tabOne' &&
              <Image
                source={this.props.tabOneBtn.active}
                style={{
                  width: this.props.tabOneBtn.width,
                  height: this.props.tabOneBtn.height
                }}
              />
            }
            {this.props.isActive != 'tabOne' &&
              <Image
                source={this.props.tabOneBtn.inactive}
                style={{
                  width: this.props.tabOneBtn.width,
                  height: this.props.tabOneBtn.height
                }}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabTwoBtn.action}>
            {this.props.isActive == 'tabTwo' &&
              <Image
                source={this.props.tabTwoBtn.active}
                style={{
                  width: this.props.tabTwoBtn.width,
                  height: this.props.tabTwoBtn.height
                }}
              />
            }
            {this.props.isActive != 'tabTwo' &&
              <Image
                source={this.props.tabTwoBtn.inactive}
                style={{
                  width: this.props.tabTwoBtn.width,
                  height: this.props.tabTwoBtn.height
                }}
              />
            }
          </TouchableOpacity>
          <View style={styles.btn} />
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabThreeBtn.action}>
            {this.props.isActive == 'tabThree' &&
              <Image
                source={this.props.tabThreeBtn.active}
                style={{
                  width: this.props.tabThreeBtn.width,
                  height: this.props.tabThreeBtn.height
                }}
              />
            }
            {this.props.isActive != 'tabThree' &&
              <Image
                source={this.props.tabThreeBtn.inactive}
                style={{
                  width: this.props.tabThreeBtn.width,
                  height: this.props.tabThreeBtn.height
                }}
              />
            }
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.btn}
            onPress={this.props.tabFourBtn.action}>
            {this.props.isActive == 'tabFour' &&
              <Image
                source={this.props.tabFourBtn.active}
                style={{
                  width: this.props.tabFourBtn.width,
                  height: this.props.tabFourBtn.height
                }}
              />
            }
            {this.props.isActive != 'tabFour' &&
              <Image
                source={this.props.tabFourBtn.inactive}
                style={{
                  width: this.props.tabFourBtn.width,
                  height: this.props.tabFourBtn.height
                }}
              />
            }
          </TouchableOpacity>
        </View>
        {
          <TouchableOpacity
            style={styles.inactiveHomeBtn}
            onPress={this.props.tabHomeBtn.onPressButton}>
            <Image
              source={this.props.tabHomeBtn.inactive}
              style={{
                width: this.props.tabHomeBtn.width,
                height: this.props.tabHomeBtn.height
              }}
            />
          </TouchableOpacity>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    height: TAB_HEIGHT + 50,
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: TAB_HEIGHT,
    marginTop: 50,
  },
  btn: {
    width: deviceWidth / 5,
    height: TAB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHomeBtn: {
    position: 'absolute',
    left: (deviceWidth - 70)/2,
    bottom: -3,
  },
  inactiveHomeBtn: {
    position: 'absolute',
    left: (deviceWidth - 60)/2,
    bottom: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'rgb(243,246,254)',
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'rgba(229,229,229,0.8)',
    borderStyle: 'solid',
  }
});

PrimeTabBar.propTypes = {
  outerContainerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
  tabHomeBtn: PropTypes.any,
  tabOneBtn: PropTypes.any,
  tabTwoBtn: PropTypes.any,
  tabThreeBtn: PropTypes.any,
  tabFourBtn: PropTypes.any,
};

PrimeTabBar.defaultProps = {
  innerContainerStyle: {
    backgroundColor: 'rgb(243,246,254)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(229,229,229,0.4)',
    borderStyle: 'solid',
  },
};
