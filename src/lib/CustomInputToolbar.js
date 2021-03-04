import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Image,
  Platform,
} from 'react-native';
import { Composer } from 'react-native-gifted-chat';

import CustomSend from './CustomSend';
import CustomActions from './CustomActions';

export default class CustomInputToolbar extends React.Component {
  renderActions() {
    return (
      <CustomActions
        {...this.props}
      />
    );
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <CustomSend {...this.props}/>;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return (
      <Composer
        {...this.props}
        textInputStyle={{
          fontSize: 15,
          fontFamily: 'Poppins-Regular', 
          lineHeight: 23,
        }}
        placeholderTextColor='rgb(150,150,150)'
      />
    );
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>
          {this.props.renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderComposer()}
          {this.renderActions()}
          {this.renderSend()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgb(229,229,229)',
    backgroundColor: 'rgb(243,246,254)',
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  accessory: {
    height: 44,
  },
});

CustomInputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  primaryStyle: {},
  accessoryStyle: {},
};

CustomInputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
};
