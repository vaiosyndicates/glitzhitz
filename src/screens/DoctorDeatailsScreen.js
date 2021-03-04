import React, { Component } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import { deviceWidth, colors } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import ItemWithDetail from '../components/ItemWithDetail';

export default class DoctorDeatailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const shadowOpt = {
      btnWidth: 260,
      btnHeight: 40,
    }

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Doctor Profiles'
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
            <View style={styles.avatarContainer}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={this._handleClickCallButton.bind(this)}>
                <Image
                  source={require('../../img/healer/icCall.png')}
                  style={{width: 90, height: 90}}
                />
              </TouchableHighlight>
              <View style={{marginLeft: -15}}>
                <Image
                  source={require('../../img/person/largeDoctor.png')}
                  style={{width: 160, height: 160}}
                />
              </View>
              <TouchableHighlight
                style={{paddingBottom: 20}}
                underlayColor={'transparent'}
                onPress={this._handleClickSpeechButton.bind(this)}>
                <Image
                  source={require('../../img/healer/icMessage.png')}
                  style={{width: 58, height: 58}}
                />
              </TouchableHighlight>
            </View>
            <LinearGradient
              start={{x: 0.4, y: 0.5}} end={{x: 1.0, y: 1.0}}
              colors={['rgb(255,111,111)', 'rgb(255,35,35)']}
              style={styles.redCircle} />
            <View style={styles.infoContainer}>
              <Text header black mediumBold>Alexander Wolfe</Text>
              <Text small lightGrey regular
                style={{marginTop: -8, marginBottom: 7}}
              >
                Cardiologist
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../img/healer/star.png')}
                  style={{width: 16, height: 15.3}}
                />
                <Text header softBlue regular style={{paddingLeft: 4}}>
                  5.0
                  <Text> </Text>
                  <Text style={{color: colors.grey}}>(234 reviewer)</Text>
                </Text>
              </View>
            </View>
            <View style={[CommonStyles.buttonBox, {marginTop: 15, marginBottom: 20}]}>
              <GradientButton
                onPressButton={this._handleClickBookAppointment.bind(this)}
                setting={shadowOpt}
                btnText="Book Appointment"
              />
            </View>
            <View>
              <ItemWithDetail
                image={{
                  url: require('../../img/healer/user2.png'),
                  width: 18,
                  height: 26
                }}
                header='Personal Information'
                onPressItem={this._handleClickDoctorInformation.bind(this)}
              />
              <ItemWithDetail
                image={{
                  url: require('../../img/healer/blueHospital.png'),
                  width: 25.5,
                  height: 25
                }}
                header='Working address'
                onPressItem={this._handleClickDoctorWorkingAddress.bind(this)}
              />
              <ItemWithDetail
                image={{
                  url: require('../../img/healer/star.png'),
                  width: 26,
                  height: 25
                }}
                header='Reviewer'
                onPressItem={this._handleClickDoctorReview.bind(this)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Go to BookAppointmentScreen
  _handleClickBookAppointment() {
    this.props.navigation.navigate('BookAppointmentScreen');
  }

  // Go to DoctorInformationScreen
  _handleClickDoctorInformation() {
    this.props.navigation.navigate('DoctorInformationScreen');
  }

  // Go to DoctorWorkingAddressScreen
  _handleClickDoctorWorkingAddress() {
    this.props.navigation.navigate('DoctorWorkingAddressScreen');
  }

  // Go to DoctorReviewScreen
  _handleClickDoctorReview() {
    this.props.navigation.navigate('DoctorReviewScreen');
  }

  // Go to CallDoctorsScreen
  _handleClickCallButton() {
    this.props.navigation.navigate('CallDoctorScreen');
  }

  _handleClickSpeechButton() {
    this.props.navigation.navigate('ChatScreen');
  }

  _handleClickHeartButton() {
    // TODO: Click heart button
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    height: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 6,
    marginRight: 20,
  },
  redCircle: {
    position: 'absolute',
    top: 18, 
    right: (deviceWidth - 130) / 2,
    width: 15,
    height: 15,
    borderRadius: 200,
  },
  infoContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
