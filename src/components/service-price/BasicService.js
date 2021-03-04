import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT
} from '../../styles/variables';

import SlideItem from './SlideItem';

export default class BasicService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideItems: [
        {
          id: 0,
          servicePrice: '149'
        },
        {
          id: 1,
          servicePrice: '169'
        },
        {
          id: 2,
          servicePrice: '179'
        },
      ]
    }
  }

  _renderItem(item) {
    return (
      <SlideItem
        servicePrice={item.servicePrice}
      />
    );
  }

  render() {
    const itemWidth = deviceWidth - 85;

    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.slideItems}
        renderItem={this._renderItem.bind(this)}
        sliderWidth={deviceWidth}
        itemWidth={itemWidth}
        currentIndex={2}
      />
    );
  }
}
