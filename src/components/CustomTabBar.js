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
        tabOneBtn={{
          active: require('../../img/glitz/home_able.png'),
          inactive: require('../../img/glitz/home_disable.png'),
          width: 24,
          height: 24,
          action: this. _onHomeIconClick.bind(this),
          title: 'Home'
        }}
        tabTwoBtn={{
          active: require('../../img/glitz/history_able.png'),
          inactive: require('../../img/glitz/history_disable.png'),
          width: 18,
          height: 24,
          action: this._onDoctorsIconClick.bind(this),
          title: 'Activity'
        }}
        tabThreeBtn={{
          active: require('../../img/glitz/cart_able.png'),
          inactive: require('../../img/glitz/cart_disable.png'),
          width: 24,
          height: 22,
          action: this._onCartsClick.bind(this),
          title: 'Cart'
        }}
        tabFourBtn={{
          active: require('../../img/glitz/profile_able.png'),
          inactive: require('../../img/glitz/profil_disable.png'),
          width: 20,
          height: 26,
          action: this._onProfileIconClick.bind(this),
          title: 'Profile'
        }}
      />
    );
  }

  // Handle click buttons of tabbar
  _onHomeIconClick() {
    this.props.navigation.navigate('MainServiceScreen');
  }

  _onCartsClick() {
    const data = {
      flag: 'main'
    }
    this.props.navigation.navigate('CartScreen', data);
  }

  _onDoctorsIconClick() {
    this.props.navigation.navigate('ActivityScreen');
  }
  
  _onProfileIconClick() {
    this.props.navigation.navigate('UserProfileScreen');
  }
}
