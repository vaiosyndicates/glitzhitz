import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform,
  Animated,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {deviceHeight} from '../../styles/variables';

export default class MoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(this.props.visible ? 1 : 0)
    }
  }

  animate(show) {
    const duration = this.props.duration ? parseInt(this.props.duration) : 500;
    Animated.timing(
      this.state.opacity, {
        toValue: show ? 1 : 0,
        duration: !this.props.noAnimation ? duration : 0
      }
    ).start();
  }

  shouldComponentUpdate(nextProps) {
    return this.props.visible !== nextProps.visible;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (this.props.visible !== nextProps.visible) {
      this.animate(nextProps.visible);
    }
  }

  render() {
    if (this.props.removeWhenHidden && !this.props.visible) {
      return null;
    }

    return (
      <Animated.View style={[styles.moreInnerContainer,{opacity: this.state.opacity}]}>
        <TouchableHighlight
          underlayColor={'rgb(75,102,234)'}
          style={styles.firstButton}
          onPress={this.props.onPressCloseButton}>
          <Image
            source={require('../../../img/healer/phoneCall.png')}
            style={{width: 20, height: 17}}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgb(75,102,234)'}
          style={styles.centerButton}
          onPress={this.props.onPressCloseButton}>
          <Image
            source={require('../../../img/healer/speechBubble1.png')}
            style={{width: 20, height: 17}}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgb(75,102,234)'}
          style={styles.centerButton}
          onPress={this.props.onPressCloseButton}>
          <Image
            source={require('../../../img/healer/speechBubble1.png')}
            style={{width: 20, height: 17}}
          />
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'rgb(75,102,234)'}
          style={styles.lastButton}
          onPress={this.props.onPressCloseButton}>
          <Image
            source={require('../../../img/healer/add.png')}
            style={{width: 20, height: 17}}
          />
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  moreInnerContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    flexDirection: 'row',
    height: 40,
    backgroundColor: 'rgb(105,105,105)',
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1
      },
      android: {
        elevation: 6,
      },
    }),
  },
  firstButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgb(105,105,105)',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  centerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgb(105,105,105)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgb(105,105,105)',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  }
});

MoreModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  removeWhenHidden: PropTypes.bool,
  noAnimation: PropTypes.bool
};
