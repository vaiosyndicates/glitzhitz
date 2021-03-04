import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
} from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import {
  colors,
  fontFamily,
  fontSize,
} from '../styles/variables';

export default class DrugsDetailCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[CommonStyles.itemWhiteBox, {padding: 18}]}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>{this.props.header}</Text>
          <Image
            source={require('../../img/healer/expan.png')}
            style={{width: 22, height: 22}}
          />
        </View>
        <View>
          <Text style={styles.content}>{this.props.content}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  header: {
    marginBottom: 6,
    color: colors.black,
    fontSize: fontSize.header,
    fontFamily: fontFamily.semiBold,
  },
  content: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
});

DrugsDetailCard.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
};
