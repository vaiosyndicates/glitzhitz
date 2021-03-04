import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';

export default class NewsCommentCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[CommonStyles.itemWhiteBox, {padding: 16}]}>
        <View style={styles.card}>
          <View style={styles.left}>
            <Image
              source={this.props.avatar}
              style={{width: 40, height: 40}}
            />  
            <Text style={styles.name}>{this.props.name}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.time}>{this.props.time}</Text>
          </View>
        </View>
        <Text style={styles.comment}>{this.props.comment}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'space-between',
    marginBottom: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: 10,
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
    lineHeight: 29 
  },
  time: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    lineHeight: 30 
  },
  comment: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    lineHeight: 23,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
