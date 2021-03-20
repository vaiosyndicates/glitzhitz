import React, { Component, useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import CartShop from '../components/Carts/CartShop';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import HeaderGradient from '../components/Header';
import Constants from 'expo-constants';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontFamily,
  fontSize,
} from '../styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';

const CartScreen = ({navigation}) => {
  
  const dispatch = useDispatch();
  const stateCart = useSelector(state => state.cartReducer.cart);

  const deleteCart = (obj) => {
    try {
      dispatch({type: 'DELETE_CART', value: obj});
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.page}>
      <HeaderGradient title="Cart" onPress={()=> navigation.goBack(null)} />
      <View style={styles.container}>
      {stateCart.length > 0 && stateCart.map((cur, key) => {
          return (
            <View style={styles.box}>
              <View style={styles.contentWrapper}>
                <View style={styles.boxWrapper}>
                  <Text style={styles.nameService}>{cur.name}</Text>
                  <Text style={styles.price}> IDR {cur.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={styles.buttonsWrapper}>
                 <Button icon={require('../../img/glitz/minus.png')} mode="outlined" style={styles.buttons} onPress={() => deleteCart({id: cur.id, name: cur.name, price: cur.price, parent: cur.parent})} />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default CartScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  box: {
    borderColor: colors.grey,
    borderBottomWidth: 1,
    height: deviceHeight * 0.15,
    borderColor: colors.lightGrey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  container: {
    marginHorizontal: deviceWidth * 0.08,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    borderRadius: 10 ,
    marginTop: deviceWidth * 0.10,
    elevation: 15,
  },
  nameService: {
    marginLeft: deviceWidth * 0.05,
    justifyContent: 'center',
    color: colors.violet1,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.medium,
  },
  price: {
    marginLeft: deviceWidth * 0.05,
    marginTop: deviceHeight * 0.02,
    color: colors.black,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular
  },
   boxWrapper: {
     backgroundColor: colors.white,
     marginTop: deviceHeight * 0.035,
    width: deviceWidth * 0.65,
    maxWidth: deviceWidth * 0.65,
   },
   contentWrapper: {
     flexDirection: 'row',
   },
   buttons: {
    borderWidth: 0,
  },
  buttonsWrapper: {
    marginTop: deviceHeight * 0.05,
  }
});

