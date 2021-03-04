import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';

import { colors } from '../styles/variables';

export default class PrimePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[this.props.panelStyle, styles.panel]}>
        {this.props.header}
        {this.props.body}
        {this.props.footer}
        {
          (() => {
            if (this.props.isCircleBtn) {
              return (
                <TouchableHighlight
                  underlayColor={'transparent'}
                  style={[this.props.circleContainerStyle, styles.circleContainer]}
                  onPress={this.props.circleBtn.onPress}
                >
                  <Image
                    source={require('../../img/healer/icEdit.png')}
                    style={{alignItems: 'center', width: this.props.circleBtn.width, height: this.props.circleBtn.height}}
                  />
                </TouchableHighlight>
              )
            }
          })()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1
      },
      android: {
        elevation: 6,
      },
    }),
  },
  circleContainer: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 12,
      },
    }),
  }
});

PrimePanel.propTypes = {
  circleBtn: PropTypes.any,

  // Styles
  panelStyle: PropTypes.any,
  circleContainerStyle: PropTypes.any,
  circleBtnStyle: PropTypes.any,
};

PrimePanel.defaultProps = {
  panelStyle: {
    backgroundColor: colors.white,
  },
};
