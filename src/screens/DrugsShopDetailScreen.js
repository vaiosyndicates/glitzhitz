import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Platform, ScrollView } from 'react-native';

import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, shadowOpt, colors, fontSize, fontFamily } from '../styles/variables';
import DrugsDetailCard from '../components/DrugsDetailCard';

export default class DrugsShopDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Amoxiclin'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/shoppingBag.png'),
                buttonAction: this._handleClickShoppingBagButton.bind(this),
                buttonWidth: 17,
                buttonHeight: 22,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <Image
              source={require('../../img/person/mockUp.png')}
              style={styles.drugsImg}
            />
            <Text style={styles.price}>$29.00</Text>
            <DrugsDetailCard
              header='What is amoxicillin?'
              content='Amoxicillin is used to treat many different types of infection caused by bacteria, such as tonsillitis…'
            />
            <DrugsDetailCard
              header='Important Information'
              content='Do not use this medication if you are allergic to amoxicillin or to any other  penicillin antibiotic, such as ampicillin'
            />
            <View style={[CommonStyles.buttonBox, {marginTop: -18, marginBottom: 10, elevation: 12}]}>
              <GradientButton
                onPressButton={this._handleBuyDrugs.bind(this)}
                setting={shadowOpt}
                btnText="BUY NOW"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleBuyDrugs() {
    // TODO:
  }

  _handleClickShoppingBagButton() {
    // TODO: Click shoppingBag button
  }
}

const styles = StyleSheet.create({
  drugsImg: {
    position: 'relative',
    width: 340,
    height: 225,
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 20
  },
  price: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingLeft: 15,
    backgroundColor: 'transparent',
    color: colors.darkSkyBlue,
    fontFamily: fontFamily.medium,
    fontSize: 24
  }
});
