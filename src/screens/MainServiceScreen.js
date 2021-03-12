import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, TouchableHighlight } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT, fontSize, colors, fontFamily } from '../styles/variables';

import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';

class MainServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didLoaded: true,
      data: [],
    }
  }

  async componentDidMount() {
    if(this.state.didLoaded == true) {
      try {
        const response = await axios.get('http://api.glitzandhitz.com/index.php/User');
        if(response.status === 200){
          const data = {
            name: response.data.data.user[1].name,
            phone: response.data.data.user[1].phone,
            address: response.data.data.user[1].address,
            email: response.data.data.user[1].email,
            gender: response.data.data.user[1].gender,
            birth: response.data.data.user[1].birth,
          }
          this.props.profile(data);

        } else {
          showError('Failed');
        }
      } catch (error) {
        showError(error);
      }
     }
  }

  componentWillUnmount() {
    this.setState({didLoaded: false});
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../img/glitz/logoWhite.png')}
            style={{width: 100, height: 80}}
          />
        </View>
        <LinearGradient
          colors={['#C32DBC', '#AC25AF', '#981EA3', '#650C85', '#450072' ]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.personal}>
          <Text style={styles.personalHellos}>Hello {this.props.getProfile.name}</Text>
          <Text style={styles.personalAsk}>How we can help you today ?</Text>
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

const mapStateToProps = (state) => ({
  getProfile: state.profileReducer.profile
});

const mapDispatchToProps = dispatch => {
  return {
    profile: value => dispatch({ type: 'SAVE_USER', value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainServiceScreen)

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
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  imageContainer: {
    position: 'absolute',
    zIndex: 1,
    left: 155,
    top: 30,
  },
  personal: {
    marginTop: -70,
    marginLeft: 15,
  },
  personalHellos: {
    fontSize: fontSize.region,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  personalAsk: {
    fontSize: fontSize.header,
    color: colors.white,
    fontFamily: fontFamily.medium,
  }
});
