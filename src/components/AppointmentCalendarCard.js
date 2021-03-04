import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import {
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class AppointmentCalendarCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor={'transparent'}
          onPress={this.props.onPressItem}
        >
          <View style={styles.container}>
            <View style={{
              height: 50,
              borderStyle: 'solid',
              borderRadius: 8,
              borderColor: this.props.highlightColor,
              borderWidth: 2.5}}
            />
            <View style={styles.left}>
              <Text style={styles.header}>{this.props.content}</Text>
              <Text style={styles.desc}>{this.props.time}</Text>
            </View>
            <View style={styles.right}>
              <Image
                source={this.props.image}
                style={{width: this.props.imageWidth, height: this.props.imageHeight}}
              />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  left: {
    flex: 1,
    paddingLeft: 25,
  },
  header: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.itemHeader,
  },
  desc: {
    color: colors.lightGrey,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
  },
  right: {
    paddingHorizontal: 15,
  },
});
