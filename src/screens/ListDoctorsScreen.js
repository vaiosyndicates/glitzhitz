import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import ListItem from '../components/ListItem';
import CustomTabBar from '../components/CustomTabBar';

export default class ListDoctorsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [
        {
          id: 0,
          image: {
            url: require('../../img/person/pixta14912862M.png'),
            width: 70,
            height: 70,
          },
          name: 'May Hampton',
          career: 'Cardiologist',
          distance: 0.8,
          isSpecial: true
        },
        {
          id: 1,
          image: {
            url: require('../../img/person/pixta19791094M.png'),
            width: 70,
            height: 70,
          },
          name: 'Jose Holland',
          career: 'Pediatrician',
          distance: 0.8,
          isSpecial: false
        },
        {
          id: 2,
          image: {
            url: require('../../img/person/pixta19279319M.png'),
            width: 70,
            height: 70,
          },
          name: 'Fannie Larson',
          career: 'Gynecological',
          distance: 0.8,
          isSpecial: true
        },
        {
          id: 3,
          image: {
            url: require('../../img/person/pixta21931547M.png'),
            width: 70,
            height: 70,
          },
          name: 'Della Jensen',
          career: 'Cardiologist',
          distance: 0.8,
          isSpecial: true
        },
        {
          id: 4,
          image: {
            url: require('../../img/person/pixta14912862M.png'),
            width: 70,
            height: 70,
          },
          name: 'May Hampton',
          career: 'Cardiologist',
          distance: 0.8,
          isSpecial: true,
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          titleText='Doctor'
          menu
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/search.png'),
                buttonAction: this._handleClickPlaceButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 24,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.scrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.doctorsList.map((item, index) => (
                <ListItem
                  key={item.id}
                  image={{
                    url: item.image.url,
                    width: item.image.width,
                    height: item.image.height,
                  }}
                  header={item.name}
                  subText={item.career}
                  bottomText={item.distance}
                  isSpecial={item.isSpecial}
                  onPressButton={this._handleClickListDoctorsItem.bind(this)}
                />
              ))
            }
          </View>
        </ScrollView>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabTwo'
        />
      </View>
    );
  }

  // Goto MapScreen
  _handleClickPlaceButton() {
    this.props.navigation.navigate('MapScreen');
  }

  // Goto DoctorDeatailsScreen
  _handleClickListDoctorsItem() {
    this.props.navigation.navigate('DoctorDeatailsScreen');
  }
}

ListDoctorsScreen.defaultNavigationOptions = {
  tabBarVisible: false
}
