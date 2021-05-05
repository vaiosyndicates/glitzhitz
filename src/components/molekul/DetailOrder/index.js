import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import GradientButton from '../../../elements/GradientButton'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../../../styles/variables'
import apiUrl from '../../../util/API'
import { AddressList, PaySection, ProductList, TotalSection } from '../../atom'
import HeaderGradient from '../../Header'
import SplashMap from '../../splash-map'

const DetailOrder = ({navigation, flag, dataCart, dataMaps, totals, params}) => {
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();

  // const data = [
  //   {id: 1, name: 'Service 1', price: 10000, parent: 'SALON'},
  //   {id: 2, name: 'Service 2', price: 10000, parent: 'SALON'},
  //   {id: 1, name: 'Service 1', price: 10000, parent: 'SALON'},
  //   {id: 2, name: 'Service 2', price: 10000, parent: 'SALON'},
  //   {id: 1, name: 'Service 1', price: 10000, parent: 'SALON'},
  //   {id: 2, name: 'Service 2', price: 10000, parent: 'SALON'},
  //   {id: 2, name: 'Service 2', price: 10000, parent: 'SALON'},
  // ]

  const setSplash = () => {
    setLoad(true);
    setTimeout(function () {
      setLoad(false);
    }, 4000)
  };

  const handlePayment = async() => {
    useDispatch({type: 'SET_LOADING', value: true});

    const data = {
      longitude: dataMaps.longitude,
      latitude: dataMaps.latitude,
      address: `${dataMaps.address} ${params.fullAddress}`,
      date: params.book_date,
      time: params.book_time,
      cart: params.flag === 3 ? params.items : dataCart
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
        // console.log(response.data);
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
      <HeaderGradient title="Detail"  dMarginLeft={0.30}  />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screenTitle}>
          <Text style={styles.pageTitle}>REVIEW BOOKING</Text>
        </View>
        <View style={styles.dateSection}>
          <View>
            <Text style={styles.dateDate}>Date: {params.book_date}</Text>
          </View>
          <View></View>
          <View>
            <Text style={styles.dateTime}>Time: {params.book_time}</Text>
          </View>
        </View>
        <View style={styles.addressSection}>
          <AddressList title="ADDRESS" data={`${dataMaps.address} ${params.fullAddress}`} isMap={true}/>
        </View>
        <View style={styles.bookingSection}>
          <ProductList title="YOUR BOOKING" data={dataCart}  />
        </View>
        <View style={styles.totalSection}>
          <TotalSection title="TOTAL" total={totals} />
        </View>
        <View style={styles.paySection}>
          <PaySection title='PAY WITH' />
        </View>
        </ScrollView>
        <View style={styles.buttonSection}>
          {params.flag === 1 &&
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> handlePayment()}
              setting={shadowOpt}
              btnText="Pay Now"
            />
          }

          {params.flag === 2 &&
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

export default DetailOrder

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
