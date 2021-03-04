import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';

import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';

export default class MainServiceScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          menu
          titleImg={require('../../img/person/logoHealer2.png')}
          titleImgStyle={{
            width: 73,
            height: 18,
          }}
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/email.png'),
                buttonAction: this._handleClickEmailButton.bind(this),
                buttonWidth: 24,
                buttonHeight: 19,
              },
              {
                key: 2,
                buttonIcon: require('../../img/healer/notification.png'),
                buttonAction: this._handleClickNotificationButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 22,
              }
            ]
          }
        />
        <View style={styles.titleBox}>
          <Text title black mediumBold style={{lineHeight: 49, marginBottom: 10}}>
            Hello Money,
          </Text>
          <Text title lightGrey extraBold>
            HOW CAN WE TAKE CARE YOURSELF?
          </Text>
        </View>
        <View style={styles.fullField}>
          <View style={styles.colMainLeft}>
            <MenuItemBox
              header='Doctors'
              subHeader='113 Doctors'
              icon={require('../../img/healer/surgeonIcon.png')}
              iconWidth={20}
              iconHeight={26}
              onPressCard={this._handleClickFindDoctor.bind(this)}
            />
            <MenuItemBox
              header='Appointment'
              subHeader='59 available'
              icon={require('../../img/healer/medicineBookIcon.png')}
              iconWidth={20}
              iconHeight={26}
              onPressCard={this._handleClickAppointment.bind(this)}
            />
          </View>
          <View style={styles.colMainRight}>
            <MenuItemBox
              header='Hospitals'
              subHeader='269 hospital'
              icon={require('../../img/healer/hospital.png')}
              iconWidth={26}
              iconHeight={25}
              onPressCard={this._handleClickFindHospital.bind(this)}
            />
            <MenuItemBox
              header='Pricing'
              subHeader='26 services'
              icon={require('../../img/healer/clipboard1.png')}
              iconWidth={22}
              iconHeight={26}
              onPressCard={this._handleClickServicePrice.bind(this)}
            />
          </View>
        </View>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabHome'
        />
      </View>
    )
  }

  // Go to AppointmentScreen
  _handleClickAppointment() {
    this.props.navigation.navigate("AppointmentScreen");
  }

  _handleClickNotificationButton() {
    this.props.navigation.navigate("NotificationScreen");
  }

  // Click email button
  _handleClickEmailButton() {
  }

  // Go to FindDoctorScreen
  _handleClickFindDoctor() {
    this.props.navigation.navigate("FindDoctorScreen");
  }

  // Go to FindHospitalScreen
  _handleClickFindHospital() {
    this.props.navigation.navigate("FindHospitalScreen");
  }

  // Go to ServicePriceScreen
  _handleClickServicePrice() {
    this.props.navigation.navigate("ServicePriceScreen");
  }
}

MainServiceScreen.defaultNavigationOptions = {
  tabBarVisible: false,
};

const ELEMENT_HEIGHT = 430;
const spaceHeight = deviceHeight - (NAV_HEIGHT + TAB_HEIGHT + ELEMENT_HEIGHT);

const styles = StyleSheet.create({
  titleBox: {
    marginTop: spaceHeight * 0.12,
    paddingHorizontal: 27,
  },
  fullField: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: spaceHeight * 0.1,
  },
  colMainLeft: {
    flex: 1,
    marginRight: 8,
  },
  colMainRight: {
    flex: 1,
    marginLeft: 8,
  },
});
