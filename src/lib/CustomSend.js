import PropTypes from 'prop-types';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Image,
} from 'react-native';

export default class CustomSend extends React.Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.text.trim().length === 0 && nextProps.text.trim().length > 0 || this.props.text.trim().length > 0 && nextProps.text.trim().length === 0) {
  //     return true;
  //   }
  //   return false;
  // }
  
  render() {
    // if (this.props.text.trim().length > 0) {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={() => {
          this.props.onSend({text: this.props.text.trim()}, true);
        }}
        accessibilityTraits="button"
      >
        <Image
          source={require('../../img/healer/paperPlane1.png')}
          style={{width: 22, height: 19.5}}
        />
      </TouchableOpacity>
    );
    // }
    // return <View/>;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    marginRight: 15,
    marginLeft: 10,
  },
});

CustomSend.defaultProps = {
  text: '',
  onSend: () => {},
  containerStyle: {},
};

CustomSend.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};
