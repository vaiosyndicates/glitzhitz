import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  BackHandler,
  Alert
 } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AddressList, PaySection, ProductList, TotalSection } from '../components/atom';
import HeaderGradient from '../components/Header';
import DetailOrder from '../components/molekul'
import SplashMap from '../components/splash-map';
import GradientButton from '../elements/GradientButton';
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables';
import apiUrl from '../util/API';
import { resetLogin } from '../util/ResetRouting';

const DetailOrderScreen = ({navigation}) => {
  const stateMaps = useSelector(state => state.mapsReducer.maps);
  const stateCarts = useSelector(state => state.cartReducer.cart);
  const totalPrice = stateCarts.reduce((accum,item) => accum + parseFloat(item.price), 0)
  const flag = navigation.state.params.flag;
  const paramsnav = navigation.state.params;
  const dispatch = useDispatch();
  let signal = axios.CancelToken.source();
  const [load, setLoad] = useState(false);
  const [trx, setTrx] = useState([]);
  const [seconds, setSeconds] = useState(1);

  useEffect(() => {
    const flag = navigation.state.params.flag;
    if(flag === 2) {
      getOrderActive();
    }
  }, [])

  useEffect(() => {
    if(flag === 2) {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.dispatch(resetLogin)}
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
     
      return () => backHandler.remove();
    } 
  }, [])

  useEffect(() => {
    const flag = navigation.state.params.flag;
    if(flag === 2) {
      const timer = setInterval(() => {
        getOrderActiveBackground();
        setSeconds(seconds + 1);
      }, 5000);
      // clearing interval
      return () => clearInterval(timer);      
    }
  }); 

  const handleBackNavigation = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => navigation.dispatch(resetLogin)}
    ]);
  }

  const getOrderActive = async() => {
    dispatch({type: 'SET_LOADING', value: true});

    const data = {
      id_order: navigation.state.params.id_order ,
    }

    // console.log(data);

    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const headers = {
        Authorization: tokenizer,
        Accept: 'application/json',
      };

      const response = await axios.get(`${apiUrl}/Order/detail`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
        params: data
      });
      

      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(response.data)
        setTrx(response.data.data)
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed')
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      showError('Network Error')
      console.log(error.response)
    }
  }

  const getOrderActiveBackground = async() => {
    const data = {
      id_order: navigation.state.params.id_order ,
    }

    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/Order/detail`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
        params: data
      });

      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        // console.log(response.data.data.order[0])
        setTrx(response.data.data);
      } else {
        showError('Failed')
      }
    } catch (error) {
      showError('Network Error')
      console.log('error')
    }
  }  


  const handlePayment = async() => {
    dispatch({type: 'SET_LOADING', value: true});

    const data = {
      longitude: stateMaps.longitude,
      latitude: stateMaps.latitude,
      address: `${stateMaps.address} ${navigation.state.params.fullAddress}`,
      date: navigation.state.params.book_date,
      time: navigation.state.params.book_time,
      cart: flag === 3 ?  navigation.state.params.items : stateCarts
    };

    // console.log(data);

    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/Payment/checkout`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

        // console.log(response.data.data)
      if(response.status === 200 ) {
        dispatch({type: 'SET_LOADING', value: false});
        const datas = {
          id_order: response.data.data.id_order,
          url: response.data.data.redirect_url
        }
        // console.log(response.data.data);
        navigation.navigate('FaspayScreen', datas);
      } else {
        showError('Failed Booking')
      }

    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      console.log(error.response)
    }
  };

  return (
    <>
    <View style={styles.page}>
      <HeaderGradient title="Detail"  onPress={()=> (flag === 2 ? handleBackNavigation()  : navigation.goBack(null))} dMarginLeft={0.30}  />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screenTitle}>
          <Text style={styles.pageTitle}>REVIEW BOOKING</Text>
        </View>
        <View style={styles.dateSection}>
          <View>
            <Text style={styles.dateDate}>Date: {paramsnav.book_date}</Text>
          </View>
          <View></View>
          <View>
            <Text style={styles.dateTime}>Time: {paramsnav.book_time}</Text>
          </View>
        </View>
        <View style={styles.addressSection}>
          <AddressList title="ADDRESS" data={`${stateMaps.address} ${paramsnav.fullAddress}`} isMap={true}/>
        </View>
        <View style={styles.bookingSection}>
          {flag === 1 &&
            <ProductList title="YOUR BOOKING" data={stateCarts}  />
          }

          {flag === 3 &&
            <ProductList title="YOUR BOOKING" data={navigation.state.params.items}  />
          }

          {flag === 2 && trx.hasOwnProperty('order') &&
            <ProductList title="YOUR BOOKING" data={trx.order[0].item}  />
          }
        </View>
        <View style={styles.totalSection}>
          {flag === 1 &&
            <TotalSection title="TOTAL" total={totalPrice} />
          }

          {flag === 2 && trx.hasOwnProperty('order') &&
            <TotalSection title="TOTAL" total={trx.order[0].total_price} flag={flag} />
          }

          {flag === 3 &&
            <TotalSection title="TOTAL" total={navigation.state.params.totals} flag={flag} />
          }
        </View>
        <View style={styles.paySection}>
        {flag === 2 && trx.hasOwnProperty('order') &&
          <PaySection title='PAY WITH' data={trx.order} />
        }
        </View>
        </ScrollView>
        <View style={styles.buttonSection}>
          {flag === 1 &&
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> handlePayment()}
              setting={shadowOpt}
              btnText="Pay Now"
            />
          }

          {flag === 3 &&
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> handlePayment()}
              setting={shadowOpt}
              btnText="Pay Now"
            />
          }

          {flag === 2 &&
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> setSplash()}
              setting={shadowOpt}
              btnText="Search Mitra"
            />
          }

        </View>
      </View>
    </View>
    {load && <SplashMap />}
    </>
  )
}

export default DetailOrderScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: deviceWidth * 0.05,
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingVertical: deviceHeight * 0.01,
    borderBottomColor: colors.borderViolet,
  },
  screenTitle: {
    marginVertical: deviceHeight * 0.02,
  },
  addressSection: {
    flex: -1,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderViolet,
  },
  bookingSection: {
    // height: deviceHeight * 0.16,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderViolet,
  },
  totalSection: {
    flex: -1,
    marginTop: deviceHeight * 0.02,
  },
  paySection: {
    flex: -1,
    // height: deviceHeight * 0.05,
    marginTop: deviceHeight * 0.03,
  },
  buttonSection: {
    height: deviceHeight * 0.09,
  },
  pageTitle: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontFamily: fontFamily.light,
  },
  dateDate: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
  },
  dateTime: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
  },
})
