import React, {Component} from 'react';
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
    this. state = {
      services: [
        {
          id: 0,
          text: '2 Doctor',
        },
        {
          id: 1,
          text: '3 Book Appointment',
        },
        {
          id: 2,
          text: '1 Free Exams',
        },
        {
          id: 3,
          text: '4 Hours Call',
        }
      ]
    }
  }

  render() {
    const { servicePrice } = this.props;
    return (
      <View style={styles.slide}>
        <View style={styles.priceCont}>
          <Text semiBold white style={{fontSize: 48}}>
            ${servicePrice}
          </Text>
          <Text light white style={{fontSize: 15, opacity: 0.6}}>
            Per Month
          </Text>
        </View>
        <View style={styles.servicesCont}>
          {
            this.state.services.map((item, index) => (
              <Text header white regular 
                key={item.id}
                style={{lineHeight: 40}}
              >
                {item.text} 
              </Text>
            ))
          } 
        </View> 
      </View>
    );
  }
}

const elementHeight = NAV_HEIGHT + 99;
const itemWidth = deviceWidth - 85;
const itemHeight = deviceHeight - elementHeight - 70;

const styles = StyleSheet.create({
  slide: {
    alignItems: 'center',
    width: itemWidth,
    height: itemHeight,
    borderRadius: 8,
    backgroundColor: 'rgb(105,105,105)',
  },
  priceCont: {
    alignItems: 'center',
    marginTop: itemHeight * 0.06 + STATUSBAR_HEIGHT,
    marginBottom: itemHeight * 0.09,
  },
  servicesCont: {
    alignItems: 'center',
  },
});
