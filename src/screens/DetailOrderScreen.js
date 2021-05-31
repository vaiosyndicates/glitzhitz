import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  BackHandler,
  Alert,
  Image
 } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AddressList, PaySection, ProductList, TotalSection } from '../components/atom';
import HeaderGradient from '../components/Header';
import DetailOrder from '../components/molekul'
import SplashMap from '../components/splash-map';
import GradientButton from '../elements/GradientButton';
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables';
import {apiUrl} from '../util/API';
import { resetLogin } from '../util/ResetRouting';
import {Picker} from '@react-native-picker/picker';
import { showError } from '../util/ShowMessage';


const DetailOrderScreen = ({navigation}) => {
  let mounted = false;
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
  const [selectedLanguage, setSelectedLanguage] = useState('402');
  const [channels, setChannels] = useState([])
  const [dated, setDated] = useState('')
  const [timed, setTimed] = useState('')

  const setSplash = async() => {
    setLoad(true);
    dispatch({type: 'CLEAR_CART'});

    const data = {
      id_order: trx.order[0].id_order,
    }

    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.post(
        `${apiUrl}/Service/searchmitra`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );
      
      // console.log(response.data)
      switch (response.status) {
        case 200:
          setLoad(false);
          const data = {
            idMitra: response.data.data.id_mitra,
            namaMitra: response.data.data.nama_mitra,
            rating: response.data.data.rating,
            speciality: response.data.data.speciality,
            item: trx.order[0].item,
            total: response.data.data.total,
            serviceTime:  response.data.data.service_time,
            trxID: response.data.data.trx_id,
            id_order: response.data.data.id_order,
            token: response.data.data.token,
          }
          // console.log(data);
          navigation.navigate('MitraScreen', data)
          
          break;
      
        default:
          showError('Search Mitra Failed')
          break;
      }

    } catch (error) {
      showError('Network Error')
      console.log(error)
    }

    // setTimeout(function () {
    //   setLoad(false);


    //   // console.log(data)
    //   navigation.navigate('MitraScreen', data)
      
    // }, 4000)
  };

  useEffect(() => {
    const flag = navigation.state.params.flag;
    console.log(navigation.state.params)
    if(flag === 2) {
      mounted = true
      if(mounted === true) {
        getOrderActive();
      }

      return () => {
        mounted = false;
      }
    } else {
      mounted = true
      if(mounted === true) {
        getChannel()
      }

      return () => {
        mounted = false;
      }      
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
  }, [trx])

  useEffect(() => {
    const flag = navigation.state.params.flag;
    if(flag === 2) {
      const timer = setInterval(() => {
        getOrderActiveBackground();
        setSeconds(seconds + 1);
      }, 5000);
     

      // clearing interval
      return () => {
        mounted = false
        clearInterval(timer);
      }      
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
        // console.log(response.data.data)
        setTrx(response.data.data)
        // const dater = trx.order[0].service_time
        // const dateSplit = dater.split(' ');
        // setDated(dateSplit[0])
        // setTimed(dateSplit[1]);
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed')
      }
    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      showError('Network Error')
      console.log(error)
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

  const getChannel = async() => {
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/Payment/channel`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
      });
      // console.log(response.data.data.channel)
      switch (response.status) {
        case 200:
          setChannels(response.data.data.channel)
          break;
      
        default:
          showError('Failed Get Payment Channel')
          break;
      }
    } catch (error) {
      showError('Network Error')
      console.log(error.response)
    }
  }

  const handlePayment = async() => {
    dispatch({type: 'SET_LOADING', value: true});

    let data = {
      longitude: stateMaps.longitude,
      latitude: stateMaps.latitude,
      address: `${stateMaps.address} ${navigation.state.params.fullAddress}`,
      date: navigation.state.params.book_date,
      time: navigation.state.params.book_time,
      channel_code: selectedLanguage,
      cart: flag === 3 ?  navigation.state.params.items : stateCarts
    };

    console.log('code -------------------'+selectedLanguage);
    if(selectedLanguage === '1') {
      try {
        const tokenizer = await AsyncStorage.getItem('token');
        data.token = tokenizer
        data.isCC = true
        navigation.navigate('FaspayScreen', data);
        
      } catch (error) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error.response)
      }
     
    } else {
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
  
        console.log('-----------------------------------');
        console.log(response.status);
        console.log('-----------------------------------');
        console.log(response.data);
        if(response.status === 200 ) {
          dispatch({type: 'SET_LOADING', value: false});
          dispatch({type: 'CLEAR_CART'});
          const datas = {
            id_order: response.data.data.id_order,
            url: response.data.data.redirect_url,
            isCC: false,
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
    }

  
  };

  return (
    <>
    {/* {console.log(trx.order[0])} */}
    <View style={styles.page}>
      <HeaderGradient title="Detail"  onPress={()=> (flag === 2 ? handleBackNavigation()  : navigation.goBack(null))} dMarginLeft={0.30}  />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.screenTitle}>
          <Text style={styles.pageTitle}>REVIEW BOOKING</Text>
        </View>
        <View style={styles.dateSection}>
          <View>
            <Text style={styles.dateDate}>Date: {flag === 2 && trx.hasOwnProperty('order') ? trx.order[0].service_time.slice(0,10) : paramsnav.book_date }</Text>
          </View>
          <View></View>
          <View>
            <Text style={styles.dateTime}>Time:  {flag === 2 && trx.hasOwnProperty('order') ? trx.order[0].service_time.slice(11,20) : paramsnav.book_time }</Text>
          </View>
        </View>
        <View style={styles.addressSection}>
          <AddressList title="ADDRESS" data=  {flag === 2 && trx.hasOwnProperty('order') ? trx.order[0].address : `${stateMaps.address} ${paramsnav.fullAddress}` } isMap={true} latitude={flag === 2 && trx.hasOwnProperty('order') ? trx.order[0].latitude : stateMaps.latitude} longitude={flag === 2 && trx.hasOwnProperty('order') ? trx.order[0].longitude : stateMaps.longitude} />
        </View>
          {flag !== 2 && 
          <View style={styles.bankList}>
            <Text style={styles.bankTitle}>PAYMENT METHOD</Text>
            <View style={styles.pickerBank}>
              <Picker
                selectedValue={selectedLanguage}
                dropdownIconColor={colors.violet1}
                style={{marginLeft: deviceWidth * -0.04}}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }>
                  {channels.length > 0 && channels.map((cur, i) => {
                    return(
                      <Picker.Item 
                        label={cur.channel} 
                        value={cur.code} 
                        key={cur.code}
                        color={colors.grey}
                        style={styles.bankListItem}
                      />
                    )
                  })}
              </Picker> 
            </View>
          </View>
        }
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
  bankTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  bankList: {
    marginVertical: deviceHeight * 0.02,
  },
  pickerBank: {
    borderBottomWidth: 1,
    borderColor: colors.borderViolet,
  },
})
