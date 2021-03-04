import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { colors, fontSize, fontFamily } from '../styles/variables';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const smallShadowOpt = {
      btnWidth: 125,
      btnHeight: 35,
      shadowHeight: 65,
      fontSize: 15,
    }

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Notification'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={[CommonStyles.itemWhiteBox,styles.card]}>
              <View style={styles.left}>
                <Image
                  source={require('../../img/healer/drugs.png')}
                  style={{width: 24, height: 24}}
                />
              </View>
              <View style={styles.right}>
                <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                  It's time to take medication
                </Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23}}>
                  3 hours ago
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.card]}>
              <View style={styles.left}>
                <Image
                  source={require('../../img/person/pixta21931547M.png')}
                  style={{width: 30, height: 30}}
                />
              </View>
              <View style={styles.right}>
                <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                  Dr.Alexander John send you a messages
                </Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23, paddingBottom: 10}}>
                  1 hours ago
                </Text>
                <GradientButton
                  onPressButton={this._handleClickReply.bind(this)}
                  setting={smallShadowOpt}
                  btnText="REPLY"
                />
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.card]}>
              <View style={styles.left}>
                <Image
                  source={require('../../img/healer/greyClipboard1.png')}
                  style={{width: 19, height: 22}}
                />  
              </View>
              <View style={styles.right}>
                <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                  Meet with Dr.Janna at 11:00
                </Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23}}>
                  39 mins ago
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.card]}>
              <View style={styles.left}>
                <Image
                  source={require('../../img/healer/drugs.png')}
                  style={{width: 24, height: 24}}
                />
              </View>
              <View style={styles.right}>
                <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                  Heart tonic drink now
                </Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23}}>
                  45 mins ago
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.card]}>
              <View style={styles.left}>
                <Image
                  source={require('../../img/healer/drugs.png')}
                  style={{width: 24, height: 24}}
                />
              </View>
              <View style={styles.right}>
                <Text black regular style={{fontSize: fontSize.itemHeader, lineHeight: 27}}>
                  Tonic drink eyes right now
                </Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23}}>
                  45 mins ago
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickReply() {
     this.props.navigation.navigate('ChatScreen');
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  left: {
    flexDirection: 'row',
    width: 44,
  },
  right: {
    flex: 1,
  },
});
