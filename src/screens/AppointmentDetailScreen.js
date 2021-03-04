import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import PrimeButton from '../elements/PrimeButton';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class AppointmentDetailScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const greyShadowOpt = {
      btnWidth: deviceWidth - 55,
      btnHeight: 45,
      backgroundColor: colors.grey,
    }

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Appointment Details'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/pencil1.png'),
                buttonAction: this._handleClickPencilButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={[
              CommonStyles.itemWhiteBox,
              {flexDirection: 'row', alignItems: 'center', padding: 20}
            ]}>
              <View style={styles.leftItem}>
                <Image
                  source={require('../../img/person/pixta21931547M.png')}
                  style={{width: 45, height: 45}}
                />  
              </View>
              <View style={styles.rightItem}>
                <Text itemHeader black mediumBold>Dr.Nettie Schmidt</Text>
                <Text lightGrey regular style={{fontSize: fontSize.small, lineHeight: 23}}>
                  Pediatrician
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.datetimeBox]}>
              <View style={styles.leftItem}>
                <View style={styles.icon}>
                  <Image
                    source={require('../../img/healer/calendar.png')}
                    style={{width: 19.5, height: 22}}
                  />  
                </View>
                <View style={styles.borderLine} />
              </View>
              <View style={styles.rightItem}>
                <Text itemHeader black regular>
                  Jan 01, 2017
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.itemWhiteBox,styles.datetimeBox]}>
              <View style={styles.leftItem}>
                <View style={styles.icon}>
                  <Image
                    source={require('../../img/healer/clock.png')}
                    style={{width: 22, height: 22}}
                  />  
                </View>
                <View style={styles.borderLine} />
              </View>
              <View style={styles.rightItem}>
                <Text itemHeader black regular>
                  12:00AM - 02:30PM
                </Text>
              </View>
            </View>
            <View style={CommonStyles.itemWhiteBox}>
              <View style={styles.serBoxHeader}>
                <Text header black semiBold>Order Services</Text>
              </View>
              <View style={styles.serBoxBody}>
                <View>
                  <Text normal grey regular>Overall examination</Text>
                  <Text normal softBlue regular>
                    55 mins
                  </Text>
                </View>
                <Text normal black regular>
                  $150
                </Text>
              </View>
              <View style={styles.serBoxBody}>
                <View>
                  <Text normal grey regular>Blood tests</Text>
                  <Text normal softBlue regular>12 mins</Text>
                </View>
                <Text normal black regular>$243</Text>
              </View>
              <View style={styles.serBoxFooter}>
                <Text normal black semiBold>TOTAL</Text>
                <Text normal black semiBold>$393</Text>
              </View>
            </View>
            <View style={[
              CommonStyles.buttonBox,
              {marginTop: 20, marginBottom: 10}
            ]}>
              <PrimeButton
                onPressButton={this._handleCancelAppointment.bind(this)}
                setting={greyShadowOpt}
                btnText="CANCEL APPOINTMENT"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickPencilButton() {
    // TODO: Click pencil button 
  }

  _handleCancelAppointment() {
    // TODO: Cancel Appointment
  }
}

const styles = StyleSheet.create({
  leftItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 65,
  },
  icon: {
    width: 43, 
  },
  rightItem: {
    flex: 1, 
  },
  borderLine: {
    height: 30,
    borderRightColor: colors.borderColor,
    borderRightWidth: 0.8
  },
  datetimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  serBoxHeader: {
    paddingTop: 16,
    paddingBottom: 9,
    paddingHorizontal: 20,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  serBoxBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderColor: colors.borderColor,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  serBoxFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});
