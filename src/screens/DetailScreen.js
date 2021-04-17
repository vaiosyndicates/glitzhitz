import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { PureComponent, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import HeaderGradient from '../components/Header'
import SplashMap from '../components/splash-map'
import GradientButton from '../elements/GradientButton'
import CommonStyles from '../styles/CommonStyles'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { resetLogin } from '../util/ResetRouting'
import { showError } from '../util/ShowMessage'

const DetailsScreen = ({navigation}) => {
  const stateMaps = useSelector(state => state.mapsReducer.maps);
  const stateCarts = useSelector(state => state.cartReducer.cart);
  const totalPrice = stateCarts.reduce((accum,item) => accum + parseFloat(item.price), 0)
  const flag = navigation.state.params.flag
  const dispatch = useDispatch();
  let signal = axios.CancelToken.source();

  const [load, setLoad] = useState(false);
  const [trx, setTrx] = useState([]);

  const setSplash = () => {
    setLoad(true);
    setTimeout(function () {
      setLoad(false);
    }, 4000)
  };

  useEffect(() => {
    const flag = navigation.state.params.flag;
    if(flag === 2) {
      getOrderActive();
    }

  }, [])

  const getOrderActive = async() => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.get('http://api.glitzandhitz.com/index.php/User/order', {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
      });

      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        setTrx(response.data.data)
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
      cart: stateCarts
    };

    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/Payment/checkout', data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      console.log('response')
    } catch (error) {
    dispatch({type: 'SET_LOADING', value: false});

    //  console.log(error.response.status)
     if(error.response.status === 401) {
       const datas = {
         url: error.response.data.data.redirect_url
       }
       navigation.navigate('FaspayScreen', datas)
     }
    }
    // const tokenizer = await AsyncStorage.getItem('token');
    // const headers = {
    //   Accept: 'application/json',
    //   Authorization: tokenizer,
    // }

    // console.log(headers);

    // axios.post('http://api.glitzandhitz.com/index.php/Payment/checkout', data, {
    //   headers: headers
    // })
    // .then((response) => {
    //   console.log(response)
    // })
    // .catch((error) => {
    //   console.log('masuk catch')
    //   console.log(error.response.data);
    // })
  };

  return (
    <>
      {console.log(trx.hasOwnProperty('order'))}
      <View style={styles.page}>
        <HeaderGradient title="Detail" onPress={()=> (flag === 2 ? navigation.dispatch(resetLogin)  : navigation.goBack(null))} dMarginLeft={0.28} />
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <Text style={styles.textHeader}>Review Booking</Text>
            <View style={styles.box}>
              <View style={styles.boxDate}>
                <Text style={styles.boxDateTitle}>Date</Text>
                <Text style={styles.boxDateDate}>{`${navigation.state.params.book_date} / ${navigation.state.params.book_time}`}</Text>
              </View>
              <View style={styles.mapSection}>
                <Text style={styles.mapTitle}>ADDRESS</Text>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{marginTop: deviceHeight * 0.01, height: deviceHeight * 0.20}}
                  region={{
                    latitude: parseFloat(stateMaps.latitude),
                    longitude:  parseFloat(stateMaps.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(stateMaps.latitude),
                      longitude:  parseFloat(stateMaps.longitude),
                    }}
                  />
                </MapView>
                <Text style={styles.detailAddress}>{stateMaps.address} ({navigation.state.params.fullAddress})</Text>
                
              </View>
              <View style={styles.bookingSection}>
                <Text style={styles.bookingTitle}>YOUR BOOKING</Text>
                {stateCarts.length > 0 && stateCarts.map((cur, key) => {
                  return (
                    <React.Fragment key={cur.id}>
                    <View style={styles.bookingCart}>
                      <Text style={styles.service}>{cur.name}</Text>
                      <Text style={styles.price}>{cur.price.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    </React.Fragment>
                  );
                })}
              </View>
              <View style={styles.totalSection}>
                <View></View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalTitle}>Total</Text>
                </View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalPrice}>Rp. {totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
              </View>
              {flag === 2 && trx.hasOwnProperty('order') &&
                <>
                <View style={styles.confirmSection}>
                  <View>
                    <Text style={styles.payTitle}>PAY WITH</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.merchantTitle}>{ trx.hasOwnProperty('order') && trx.order.length > 0 ? trx.order[0].payment_channel : 'undefined'}</Text>
                  </View>
                </View>
                <View style={styles.statusSection}>
                  <View>
                    <Text style={styles.statusTitle}>STATUS</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.statusMessage}>{trx.hasOwnProperty('order') && trx.order.length > 0 ? trx.order[0].status: 'undefined'}</Text>
                  </View>
                </View>
                </>
              }
            </View>
          </View>
          <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
          {flag === 1  &&
            <GradientButton
            // onPressButton={()=> setSplash()}
            // onPressButton={()=> navigation.navigate('FaspayScreen')}
            onPressButton={()=> handlePayment()}
            setting={shadowOpt}
            btnText="Pay Now"
          />
          }

          {flag === 2  &&
            <GradientButton
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

export default DetailsScreen

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    marginHorizontal: deviceWidth * 0.05,
  },
  box: {
    marginTop: deviceHeight * 0.01,
  },
  textHeader: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontFamily: fontFamily.light,
  },
  boxContainer: {
    marginTop: deviceHeight * 0.04,
    marginBottom: deviceHeight * 0.04,
    paddingHorizontal: deviceWidth * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  boxDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
  },
  boxDateTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
  },
  boxDateDate: {
    fontSize: fontSize.small,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  mapTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  mapSection: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: deviceHeight * 0.03,
  },
   detailAddress: {
    color: colors.black,
    fontFamily: fontFamily.light,
    fontSize: fontSize.small,
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.90,
   },
   bookingSection: {
    marginTop: deviceHeight * 0.30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    borderTopColor: colors.violet2,
   },
   bookingCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: deviceHeight * 0.01,
   },
   service: {
     fontSize: fontSize.small,
     fontFamily: fontFamily.medium,
     color: colors.grey,
     marginTop: deviceHeight * 0.02,
   },
   price: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    color: colors.grey,
    marginTop: deviceHeight * 0.02,
  },
  bookingTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
    marginTop: deviceHeight * 0.02,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalWrap: {
    marginHorizontal: deviceWidth* 0.01,
    marginTop: deviceHeight * 0.02,
  },
  totalTitle: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.normal,
  },
  totalPrice: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.normal,
  },
  confirmSection: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.02,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusSection: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.03,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  payTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  statusTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  merchantTitle: {
    fontSize: fontSize.small,
    color: colors.borderViolet,
    fontFamily: fontFamily.medium,
  },
  statusMessage: {
    fontSize: fontSize.small,
    color: colors.borderViolet,
    fontFamily: fontFamily.medium,
  }
})
