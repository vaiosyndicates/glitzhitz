import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';

export default class DoctorInformationScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Information'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/whiteHeart.png'),
                buttonAction: this._handleClickHeartButton.bind(this),
                buttonWidth: 26,
                buttonHeight: 23,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <Item
              header='About'
              infoCount={1}
              info1='If you are a male over the age of 40 and are suffering from weakness, impotence, pain, stiffness, drooping'
            />
            <Item
              header='Address & Timing'
              infoCount={2}
              info1='070 Heaney Lakes Suite 380'
              info2='9:00 - 17:00, Monday to Friday'
            />
            <Item
              header='Phone'
              infoCount={2}
              info1='+ 012 345 6789'
              info2='+ 012 345 6789'
            />
            <Item
              header='Certificate'
              infoCount={2}
              info1='AAMA'
              info2='ABMS'
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickHeartButton() {
    // TODO: Click heart button
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      header,
      infoCount,
      info1,
      info2,
    } = this.props;

    let infoTextArr = [];
    if (infoCount == 1) {
      infoTextArr = (
        <Text normal grey regular>{info1}</Text>
      );
    } else {
      infoTextArr = (
        <View>
          <Text normal grey regular style={{marginBottom: 7}}>
            {info1}
          </Text>
          <Text normal grey regular>{info2}</Text>
        </View>
      );
    }
    return (
      <View style={[CommonStyles.itemWhiteBox,
        {
          paddingHorizontal: 20,
          paddingVertical: 16,
        }
      ]}>
        <Text header black semiBold style={{marginBottom: 6}}>
          {header}
        </Text>
        {infoTextArr}
      </View>
    );
  }
}
