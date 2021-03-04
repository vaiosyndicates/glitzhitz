import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class ItemWithDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.highlightCard}
          onPress={this.props.onPressItem}
        >
          <View style={styles.card}>
            <View style={styles.left}>
              <View style={styles.leftIcon}>
                <Image
                  source={this.props.image.url}
                  style={{width:this.props.image.width, height:this.props.image.height}}
                />
              </View>
              <View style={{
                height: 30,
                borderColor: 'rgb(229,229,229)',
                borderWidth: 0.8}}
              />
            </View>
            <View style={styles.center}>
              <Text itemHeader grey mediumBold>{this.props.header}</Text>
            </View>
            <View style={styles.right}>
              <Icon
                style={{fontSize: 20, textAlign: 'center'}}
                name="chevron-thin-right"
                color="rgb(105,105,105)"
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

 const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 19
  },
  highlightCard: {
    borderRadius: 12,
  },
  center: {
    flex: 1, 
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 61,
  },
  leftIcon: {
    width: 41,
  },
  right: {
    width: 20,
    alignItems: 'center',
  },
});

ItemWithDetail.propTypes = {
  header: PropTypes.string,
  onPressItem: PropTypes.func,
};
