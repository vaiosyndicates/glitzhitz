import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Text from '../../elements/Text';
import CommonStyles from '../../styles/CommonStyles';
import {
  deviceHeight,
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[
        styles.itemBox,
        this.props.hasBorderRight == false && styles.itemBoxNoBorderRight,
        this.props.hasPaddingTop == false && styles.itemBoxNoPaddingTop
      ]}>
        <Text header grey regular style={{marginBottom: 8}}>{this.props.header}</Text>
        <Text header black regular>{this.props.content}
          <Text small grey light>{this.props.unit}</Text>
        </Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  itemBox: {
    width: 110,
    height: 110,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(229,229,229)',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  itemBoxNoPaddingTop: {
    paddingTop: 0,
  },
  itemBoxNoBorderRight: {
    borderColor: 'transparent',
  },
});
