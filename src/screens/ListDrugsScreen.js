import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import ItemWithDetail from '../components/ItemWithDetail';
import GradientNavigationBar from '../elements/GradientNavigationBar';

export default class ListDrugsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drugsList: [
        {
          id: 0,
          image: {
            url: require('../../img/healer/pill.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Augmentin Sachet'
        },
        {
          id: 1,
          image: {
            url: require('../../img/healer/bluePills3.png'),
            width: 22,
            height: 22,
          },
          drugName: 'BoneSure'
        },
        {
          id: 2,
          image: {
            url: require('../../img/healer/pill.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Cetirizin hydrochlorid'
        },
        {
          id: 3,
          image: {
            url: require('../../img/healer/bluePills3.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Doxycyclin'
        },
        {
          id: 4,
          image: {
            url: require('../../img/healer/pill.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Nizoral Cream'
        },
        {
          id: 5,
          image: {
            url: require('../../img/healer/bluePills3.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Prednisolon'
        },
        {
          id: 6,
          image: {
            url: require('../../img/healer/pill.png'),
            width: 22,
            height: 22,
          },
          drugName: 'Gastropulgite'
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
          titleText='Drugs List'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/search.png'),
                buttonAction: this._handleClickSearchButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.drugsList.map((item, index) => (
                <ItemWithDetail
                  key={item.id}
                  image={{
                    url: item.image.url,
                    width: item.image.width,
                    height: item.image.height,
                  }}
                  header={item.drugName}
                  onPressItem={this._handleClickListDrugsItem.bind(this)}
                />
              ))
            }
          </View>
        </ScrollView>
        <TouchableHighlight
          underlayColor={'transparent'}
          style={styles.addBtn}
          onPress={this._handleClickAddDrugs.bind(this)}>
          <Image
            source={require('../../img/healer/icAdd.png')}
            style={{width: 70, height: 75}}
          />
        </TouchableHighlight>
      </View>
    );
  }

  _handleClickSearchButton() {
    // TODO: Click search button
  }

  // Goto DoctorDetailsScreen
  _handleClickListDrugsItem() {
    this.props.navigation.navigate('DrugsDetailsScreen');
  }

  // Goto AddDrugsScreen
  _handleClickAddDrugs() {
    this.props.navigation.navigate('AddDrugsScreen');
  }
}

const styles = StyleSheet.create({
  addBtn: {
    position: 'absolute',
    bottom: 3,
    right: 8,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 12,
      },
    }),
  },
});
