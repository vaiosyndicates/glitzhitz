import React, {Component} from 'react';
import { Image } from 'react-native';

import PrimeTabBar from '../elements/PrimeTabBar';

export default class CustomTabBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PrimeTabBar
        isActive={this.props.isActive}
        tabHomeBtn={{
          active: require('../../img/healer/activeStethoscope.png'),
          inactive: require('../../img/healer/stethoscope.png'),
          width: 28,
          height: 30,
          onPressButton: this._onHomeIconClick.bind(this),
        }}
        tabOneBtn={{
          active: require('../../img/healer/activeDrugs.png'),
          inactive: require('../../img/healer/drugs.png'),
          width: 24,
          height: 24,
          action: this._onDrugsIconClick.bind(this),
        }}
        tabTwoBtn={{
          active: require('../../img/healer/activeDoctors.png'),
          inactive: require('../../img/healer/doctors.png'),
          width: 18,
          height: 24,
          action: this._onDoctorsIconClick.bind(this),
        }}
        tabThreeBtn={{
          active: require('../../img/healer/activeDashboard.png'),
          inactive: require('../../img/healer/dashboard.png'),
          width: 24,
          height: 20,
          action: this._onDashboardIconClick.bind(this),
        }}
        tabFourBtn={{
          active: require('../../img/healer/activeProfile.png'),
          inactive: require('../../img/healer/profile.png'),
          width: 20,
          height: 24,
          action: this._onProfileIconClick.bind(this),
        }}
      />
    );
  }

  // Handle click buttons of tabbar
  _onHomeIconClick() {
    this.props.navigation.navigate('MainServiceScreen');
  }

  _onDrugsIconClick() {
    this.props.navigation.navigate('DrugScreen');
  }

  _onDoctorsIconClick() {
    this.props.navigation.navigate('ListDoctorsScreen');
  }

  _onDashboardIconClick() {
    this.props.navigation.navigate('DashboardTestIndicatorsScreen');
  }

  _onProfileIconClick() {
    this.props.navigation.navigate('UserProfileScreen');
  }
}
