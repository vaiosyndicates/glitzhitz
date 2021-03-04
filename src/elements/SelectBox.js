import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, colors } from '../styles/variables';

export default class SelectBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor={'transparent'}
        style={[this.props.containerStyle, styles.container]}
        onPress={this.props.onPressAction}>
        <View style={this.props.fieldStyle}>
          <Text style={this.props.labelStyle}>{this.props.label}</Text>
          {
            (() => {
              if (this.props.isLeftIcon) {
                return (
                  <Icon
                    style={[this.props.leftIconStyle, styles.leftIcon]}
                    name="chevron-thin-down"
                  />
                )
              }
            })()
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  leftIcon: {
    textAlign: 'center',
  }
});

SelectBox.propTypes = {
  label: PropTypes.string,
  isLeftIcon: PropTypes.bool,
  onPressAction: PropTypes.func,

  // Styles
  containerStyle: PropTypes.any,
  fieldStyle: PropTypes.any,
  labelStyle: PropTypes.any,
  leftIconStyle: Text.propTypes.style,
};

SelectBox.defaultProps = {
  isLeftIcon: true,
  containerStyle: {
    height: 45,
    width: deviceWidth - 55,
  },
  fieldStyle: CommonStyles.selectboxField,
  labelStyle: CommonStyles.selectboxLabel,
  leftIconStyle: {
    fontSize: 20,
    color: colors.borderColor,
  }
};
