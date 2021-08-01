import React, { Component, useEffect, useState } from 'react';
import { 
  Text, 
  TextInput, 
  View, 
  StyleSheet, 
  Image, 
  Platform, 
  ScrollView,
  BackHandler,
  Alert,
} from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import CartShop from '../components/Carts/CartShop';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import HeaderGradient from '../components/Header';
import CustomTabBar from '../components/CustomTabBar';
import Constants from 'expo-constants';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontFamily,
  fontSize,
  shadowOpt,
} from '../styles/variables';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import {showError, showSuccess} from '../util/ShowMessage';
import { WebView } from 'react-native-webview';
import { resetActivity, resetLogin } from '../util/ResetRouting';

const FaspayScreen = ({navigation}) => {
  
  const dispatch = useDispatch();
  const stateCart = useSelector(state => state.cartReducer.cart);

  useEffect(() => {
    if(navigation.state.params.isCC || navigation.state.params.hasOwnProperty('isCC')) {
      dispatch({type: 'SET_LOADING', value: false});
    }

    const backAction = () => {
      Alert.alert("Hold on!", `${navigation.state.params.channel_code === '812' ? `Check activity menu for details order` : `Check activity menu for details order`}`, [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => navigation.dispatch(resetActivity)}
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, [])

  const handleBackNavigation = () => {
    Alert.alert("Hold on!", "Are you sure you want to leave this page?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => navigation.dispatch(resetLogin)}
    ]);
  }


  const handleBack = () => {
    const data = {
      id_order: navigation.state.params.id_order,
      flag: 2,
    }
    // console.log(data);
    navigation.navigate('DetailOrderScreen', data);
  }

  return (
    <View style={styles.page}>
      <HeaderGradient title="Payment" onPress={()=> handleBackNavigation()} dMarginLeft={0.25} />
      {navigation.state.params.isCC ?
      <WebView
        source={{uri: 'http://api.glitzandhitz.com/index.php/Payment/creditcard',
          body: JSON.stringify(navigation.state.params),
          method:'POST'}}
        javaScriptCanOpenWindowsAutomatically={true}
        javaScriptEnabled={true}
      />
      :
      <WebView source={{ uri: `${navigation.state.params.url}`}} />
      }

{/* 
      <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
      <GradientButton
        onPressButton={() => handleBack()}
        setting={shadowOpt}
        btnText="Confirmation Booking"
      />

      </View> */}

    </View>
  );
}

export default FaspayScreen

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

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
  noBorderBox: {
    borderColor: colors.grey,
    height: deviceHeight * 0.15,
    borderColor: colors.lightGrey,
    borderBottomWidth: 0,
  },
  container: {
    marginHorizontal: deviceWidth * 0.08,
    backgroundColor: colors.white,
    borderBottomWidth: 0,
    borderColor: colors.lightGrey,
    borderRadius: 10 ,
    marginTop: deviceWidth * 0.10,
    elevation: 15,
    marginBottom: deviceHeight * 0.10,
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
  },
  containerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.30,
    marginLeft: deviceWidth * 0.15,
    position: 'absolute',
  },
  imageCarts: {
    width: deviceWidth * 0.70,
    height: deviceHeight * 0.30,
  },
  titleCarts: {
    textAlign: 'center',
    fontSize: fontSize.title,
    fontFamily: fontFamily.medium,
    color: colors.violet1,
  }
});