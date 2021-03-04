import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, ScrollView, Alert } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import ListItem from '../components/ListItem';

export default class ResultFindDoctorScreen extends Component {
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
          back
          titleText='Doctors'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/whitePlaceholder.png'),
                buttonAction: this._handleClickPlaceButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 24,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.result}>
              <Text medium lightGrey regular>Found
                <Text> </Text>
                <Text black mediumBold>150</Text>
                <Text> </Text>
                doctors near
                <Text> </Text>
                <Text black mediumBold>NewYork</Text>
              </Text>
            </View>
            <View style={styles.resultList}>
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
          </View>
        </ScrollView>
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

const styles = StyleSheet.create({
  result: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  resultList: {
    flex: 1,
  }
});
