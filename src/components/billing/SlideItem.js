import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';

import Text from '../../elements/Text';
import CommonStyles from '../../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT
} from '../../styles/variables';

export default class SlideItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [
        {
          id: 0,
          text: 'Your Name',
        }
      ]
    }
  }

  render() {
    const { servicePrice } = this.props;
    return (
      <View style={styles.slide}>
        <View style={styles.billingText}>
          <Text semiBold white style={{ fontSize: 22 }}>
            Visa
          </Text>
          <Text semiBold white style={{ fontSize: 18 }}>
            debit
          </Text>
        </View>
        <View style={styles.priceCont}>
          <Text semiBold white style={{ fontSize: 22 }}>
            1234 5678 90** ****
          </Text>
        </View>
        <View style={styles.billingText}>
          <Text semiBold white header>
            Your name
          </Text>
          <Text semiBold white header>
            12/2025
          </Text>
        </View>
      </View>
    );
  }
}

const elementHeight = NAV_HEIGHT + 99;
const itemWidth = deviceWidth - 85;
const itemHeight = deviceHeight - elementHeight - 350;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: 20,
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
    backgroundColor: 'rgb(105,105,105)',
  },
  priceCont: {
    alignItems: "flex-start",
    marginTop: itemHeight * 0.06 + STATUSBAR_HEIGHT,
    marginBottom: itemHeight * 0.09,
  },
  billingText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: itemHeight * 0.06 + STATUSBAR_HEIGHT,
    marginBottom: itemHeight * 0.09,
  },
  servicesCont: {
    alignItems: 'center',
  },
});
