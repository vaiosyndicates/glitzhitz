import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import CartShop from '../components/Carts/CartShop';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontFamily,
  fontSize,
} from '../styles/variables';

export default class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartsList: [
        {
          id: 0,
          image: {
            url: require('../../img/person/mockUp.png'),
            width: 70,
            height: 70,
          },
          name: 'Amoxicillin and Clavulanate',
          price: '29.00',
          count: '2',
        },
        {
          id: 1,
          image: {
            url: require('../../img/person/mockUp.png'),
            width: 70,
            height: 70,
          },
          name: 'Amoxicillin and Clavulanate',
          price: '29.00',
          count: '2',
        },
        {
          id: 2,
          image: {
            url: require('../../img/person/mockUp.png'),
            width: 70,
            height: 70,
          },
          name: 'Amoxicillin and Clavulanate',
          price: '29.00',
          count: '2',
        },
        {
          id: 3,
          image: {
            url: require('../../img/person/mockUp.png'),
            width: 70,
            height: 70,
          },
          name: 'Amoxicillin and Clavulanate',
          price: '29.00',
          count: '2',
        },
        {
          id: 4,
          image: {
            url: require('../../img/person/mockUp.png'),
            width: 70,
            height: 70,
          },
          name: 'Amoxicillin and Clavulanate',
          price: '29.00',
          count: '2',
        },
      ],
      total: '259,0,0',
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Shopping Cart'
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
            {
              this.state.cartsList.map((item, index) => (
                <CartShop
                  key={item.id}
                  image={{
                    url: item.image.url,
                    width: item.image.width,
                    height: item.image.height,
                  }}
                  name={item.name}
                  price={item.price}
                  count={item.count}
                  onPressButton={this._handleClickListCartsItem.bind(this)}
                />
              ))
            }
          </View>
        </ScrollView>
        <View style={styles.buttonBox}>
          <Text style={styles.totalText}>
            Total: <Text style={styles.total}>${this.state.total}</Text>
          </Text >
          <GradientButton
            onPressButton={this._handleCheckOut.bind(this)}
            setting={{ btnWidth: 150, btnHeight: 45 }}
            btnText="CHECK OUT"
          />
        </View>
      </View>
    );
  }

  _handleClickShoppingBagButton() {
    // TODO: Click shoppingBag button
  }
  _handleCheckOut() {
    // TODO: Click shoppingBag button
    this.props.navigation.navigate('BillingScreen');
  }
  // Goto DoctorDetailsScreen
  _handleClickListCartsItem() {
    //this.props.navigation.navigate('CartScreen');
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    height: 100,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
  },
  totalText: {
    color: colors.grey,
    fontSize: fontSize.header,
    fontFamily: fontFamily.regular,
  },
  total: {
    color: colors.softBlue,
  },
});

