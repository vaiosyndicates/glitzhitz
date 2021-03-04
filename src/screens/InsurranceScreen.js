import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import InsurranceCard from '../components/user-profile/InsurranceCard';

export default class InsurranceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurranceList: [
        {
          id: 0,
          insurranceTitle: 'Personal Insurrance',
          image: require('../../img/person/logoHospital_2.png'),
          imageWidth: 30.5,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'VMH9231458760',
          group: '24-789',
          date: '09/2019',
          plan: 'Pro',
        },
        {
          id: 1,
          insurranceTitle: 'Life Insurrance',
          image: require('../../img/person/logoHospital_1.png'),
          imageWidth: 30,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'HL1231416845',
          group: '25-146',
          date: '11/2072',
          plan: 'Pro',
        },
        {
          id: 2,
          insurranceTitle: 'Family Insurrance',
          image: require('../../img/person/logoHospital_4.png'),
          imageWidth: 30,
          imageHeight: 30,
          name: 'Bernice Luna',
          code: 'VMH9231458760',
          group: '24-789',
          date: '09/2019',
          plan: 'Pro',
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Insurrance'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/add.png'),
                buttonAction: this._handleClickAddButton.bind(this),
                buttonWidth: 20,
                buttonHeight: 20,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.insurranceList.map((item, index) => (
                <InsurranceCard
                  key={item.id}
                  header={item.insurranceTitle}
                  image={item.image}
                  imageWidth={item.imageWidth}
                  imageHeight={item.imageHeight}
                  name={item.name}
                  code={item.code}
                  group={item.group}
                  date={item.date}
                  plan={item.plan}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickAddButton() {
    // TODO: 
  }
}
