import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Pressable,
  ImageBackground,
} from 'react-native'
import { color } from 'react-native-reanimated'
import {AddressList, MitraInfo, PaySection, ProductList} from '../components/atom'
import HeaderGradient from '../components/Header'
import SplashMap from '../components/splash-map'
import GradientButton from '../elements/GradientButton'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowButton, shadowOpt } from '../styles/variables'
import {apiUrl} from '../util/API'
import { showError, showSuccess } from '../util/ShowMessage'
import Dialog from "react-native-dialog"
import { useDispatch, useSelector } from 'react-redux';
import { resetActivity } from '../util/ResetRouting'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const DetailActivityOrder = ({navigation}) => {
  let signal = axios.CancelToken.source();
  const [data, setData] = useState([]);
  const [mounted, setMounted] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalRefund, setModalRefund] = useState(false);
  const [reason, setReason] = useState('');
  const [channels, setChannels] = useState([])
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('1');
  const [gender, setGender] = useState('pria')

  var timer
  let tesStatus = ''
  let idMitraReject = ''
  let idOrder = ''

  useEffect(() => {
    if(mounted) {
      getDetail()

    } 
    return () => {
      setMounted(false)
    }
  }, [])


  const getDetail = async() => {
    dispatch({type: 'SET_LOADING', value: true});
    const datas = {
      id_order: navigation.state.params.id_order
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
        params: datas
      });

      // console.log(response.data.data.order)
      
      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        // console.log(response.data.data.order.length)
        // console.log(orderReducer[0])
        setData(response.data.data);
        // console.log(data)
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed Get Data')
      }
    } catch (error) {
        dispatch({type: 'SET_LOADING', value: false});
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          if(error.hasOwnProperty('response')) {
            switch (error.response.status) {
              case 404:
                dispatch({type: 'SET_TIMEOUT', value: {code: 404, status: true}});
                break;
    
              case 405:
                dispatch({type: 'SET_TIMEOUT', value: {code: 405, status: true}});
                break;
    
              case 500:
                dispatch({type: 'SET_TIMEOUT', value: {code: 500, status: true}});
                break;
  
              default:
                break;
            }
          } else {
            showError(error.message)
          }
      }
    }
  }


  // handle reorder
  const handleReorder = () => {
    
    const datas = {
      items: data.order[0].item,
      totals:  data.order[0].total_price,
      flag: 3,
    }

    // console.log(datas)
   navigation.navigate('MapScreen', datas);

  }

  // end handle reorder //

  // cancel button //
  const handleCancel = async() => {
    setModal(true)
  }

  const handleCancelDialog = () => {
    setModal(false)
  }

  const handlesetCancel = async() => {
    setModal(false)
    const datas = {
      id_order: data.order[0].id_order,
      trx_id: data.order[0].trx_id,
    }

    // console.log(datas)

    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/Payment/cancel_payment`, datas, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      // console.log(response.data)

      if(response.data.status === 200) {
        showSuccess('Order Cancelled')
        setModal(false)
        setTimeout(() => {
          navigation.dispatch(resetActivity); 
        }, 2000);
      } else {
        showError('Failed')
      }
    } catch (error) {
      showError(error.message)
      console.log(error.response.data)
    }
  }

  // end cancel button //


  // refund button //

  const handleRefund = () => {
    const channel = data.order[0].payment_code
    switch (channel) {
      case '1':
        setModalRefund(true)
        break;
    
      default:
        const data = {
          id_order: navigation.state.params.id_order,
        }
        navigation.navigate('RefundScreen', data);
        break;
    }
  }


  const handleCancelDialogRefund = () => {
    setModalRefund(false)
  }

  const handlesetRefund = async() => {
    setReason('')
    setModalRefund(false)
    const datas = {
      id_order: navigation.state.params.id_order,
      nama_rekening: name,
      bank: selectedLanguage,
      rekening: account,
      alasan: reason,
    }

    console.log(data)

    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/Payment/refund_order`, datas, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );
      // console.log(response)
      if(response.status === 200) {
        showSuccess('Refund will be processed')
        setTimeout(() => {
          navigation.dispatch(resetActivity); 
        }, 2000);
      } else {
        showError('Error')
      }
    } catch (error) {
      showError(`Internal server ${error.message}`)
      console.log(error.response.data)
    }
  }

  // end refund button //


  // handle How To //
  const handleHowTo = () => {
    // console.log(data.order[0].payment_code)
    const datas = {
      nama_channel: data.order[0].payment_code
    }
    navigation.navigate('HowToScreen', datas);
  }
  // end How To //


  // stop timer
  const stopTimer = () => {
    console.log("Stop");
    clearInterval(timer);
  }

  //



  // search awal //
  const handleSearch = async() => {
    setLoad(true);
    let searchs = 0;

    timer = setInterval(async() => {
      if(searchs < 12){
        searchingMitra()
        searchs += 1;
      }else{ 
        setLoad(false);
        clearInterval(timer);
        getDetail()
        showError('Mitra Not Found')
      }
    }, 5000);
  }


  const searchingMitra = async() => {
    getStatusOrder()
    // console.log(`status ordetr : ${statusOrder}`)
    console.log(`status order activity : ${tesStatus}`)
    if(tesStatus === '' || tesStatus === null){
      // showError('Mitra No Response')
      setLoad(true)

      const datas = {
        id_order: navigation.state.params.id_order ,
        gender: gender,
      }

      console.log(datas);

      try {
        const tokenizer = await AsyncStorage.getItem('token')
        const response = await axios.post(
          `${apiUrl}/Service/searchmitra`, datas, {
            headers: {
              Accept: 'application/json',
              Authorization: tokenizer,
            }
          }
        );
        // console.log(response)
        console.log('*******************')

      } catch (error) {
        showError(error.message)
      }

    } else if(tesStatus === 'Reject') {
      const datas = {
        id_order:  navigation.state.params.id_order,
        id_mitra: idMitraReject,
        gender: gender,
      }

      try {
        const tokenizer = await AsyncStorage.getItem('token')
        const response = await axios.post(
          `${apiUrl}/Service/searchmitra_reject`, datas, {
            headers: {
              Accept: 'application/json',
              Authorization: tokenizer,
            }
          }
        );

        console.log('REJECTREJECTREJECT')

      } catch (error) {
        console.log(error.response.data)
        showError(error.message)
      }

    } else {
      console.log('setan')
      getFullOrder()
      stopTimer()
    }
  }

  const getStatusOrder = async() => {
    const datas = {
      id_order: navigation.state.params.id_order ,
    }
    // console.log(datas)
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
        params: datas
      });

      if(response.status === 200) {
        console.log(` id: ${response.data.data.order[0].status_mitra}`)
        tesStatus = response.data.data.order[0].status_mitra
        idMitraReject = response.data.data.order[0].id_mitra
        idOrder = response.data.data.order[0].id_order
      }
    } catch (error) {
      showError(error.message)
    }
  }

  const getFullOrder = async() => {
    const datas = {
      id_order: navigation.state.params.id_order ,
    }
    // console.log(datas)
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
        params: datas
      });

      if(response.status === 200) {
        // console.log(response.data.data.order[0])
        setLoad(false)
        stopTimer()
        const mitra = {
          idMitra: response.data.data.order[0].id_mitra,
          ava_mitra: response.data.data.order[0].ava_mitra,
          namaMitra: response.data.data.order[0].nama_mitra,
          rating: response.data.data.order[0].rating,
          speciality: response.data.data.order[0].speciality,
          item: response.data.data.order[0].item,
          total: response.data.data.order[0].total_price,
          serviceTime:  response.data.data.order[0].service_time,
          trxID: response.data.data.order[0].trx_id,
          id_order: response.data.data.order[0].id_order,
          token: response.data.data.order[0].android_device_id_mitra,
        }
        // console.log(mitra)
        navigation.navigate('MitraScreen', mitra)
      }


    } catch (error) {
      showError(error.message)
    }
  }

  // end search //

  // search reject
  const handleSearchReject = async() => {
    setLoad(true);
    dispatch({type: 'CLEAR_CART'});
    let searchs = 0;

    timer = setInterval(async() => {
      if(searchs < 12){
        searchingMitraReject()
        searchs += 1;
      }else{ 
        setLoad(false);
        clearInterval(timer);
        // setReject(true)
        getDetail()
        showError('Mitra Not Found')
      }
    }, 5000);
  }


  const searchingMitraReject = async() => {
    getStatusOrder()
    // console.log(`status ordetr : ${statusOrder}`)
    console.log(`status order reject : ${tesStatus}`)
    if(tesStatus === 'Reject' || tesStatus === null || tesStatus === ''){
      // showError('Mitra No Response')
      setLoad(true)

      const datas = {
        id_order: idOrder === null || idOrder === '' ? data.order[0].id_order : idOrder,
        id_mitra: idMitraReject === null || idMitraReject === '' ? data.order[0].id_mitra : idMitraReject,
        gender: gender,
      }

      // console.log(datas);

      try {
        const tokenizer = await AsyncStorage.getItem('token')
        const response = await axios.post(
          `${apiUrl}/Service/searchmitra_reject`, datas, {
            headers: {
              Accept: 'application/json',
              Authorization: tokenizer,
            }
          }
        );

        console.log('masuk reject cok')

      } catch (error) {
        showError(error.message)
        console.log(error.response.data)
      }

    } else {
      console.log('--------------------------')
      console.log('stop rejecting')
      console.log('--------------------------')
      getFullOrder()
      stopTimer()
    }
  }
  // end search reject //

  // done button
  const handleDone = async() => {
    const datas = {
      id_order: navigation.state.params.id_order,
    }


    // console.log(data)
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/User/order_confirmation`, datas, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      if(response.status === 200) {
        const datax = {
          id_order: data.order[0].id_order,
          nama_mitra: data.order[0].nama_mitra,
        }
        showSuccess('Order Complete')
        navigation.navigate('RatingScreen', datax)

      } else {
        showError('Bad Response From Server')
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  // end done //

  // handle gender pria
  const handleGenderMale = () => {
    setGender('pria')
  }

  // end handle

  //handle gender wanita
  const handleGenderFemale = () => {
    setGender('wanita')
  }
  //end handle

  
  return (
    <>
    {/* {console.log(data.order[0].payment_code)} */}
      <View style={styles.page}>
        <HeaderGradient title="Detail" onPress={()=> navigation.goBack(null)} dMarginLeft={0.30} />
        {data.hasOwnProperty('order') &&
          <>
          <View style={styles.container}>
           <ScrollView style={styles.scrolls} showsVerticalScrollIndicator={false}>
            <View style={styles.boxContainer}>
              <Text style={styles.textHeader}>Review Booking</Text>
              <View style={styles.box}>
                <View style={styles.boxDate}>
                  <Text style={styles.boxDateTitle}>Date</Text>
                  <Text style={styles.boxDateDate}>{data.order[0].order_time}</Text>
                </View>
                {data.order[0].status === 'Payment Success' && data.order[0].id_mitra !== null && data.order[0].status_mitra !== 'Reject' &&
                  <View style={styles.mitraSection}>
                    <MitraInfo onPress={()=> handleReorder()} disabled={true} ava={data.order[0].ava_mitra} name={data.order[0].nama_mitra} speciality={data.order[0].spesialis} status={data.order[0].status} />
                  </View>
                }
                {data.order[0].status === 'Completed' && 
                  <View style={styles.mitraSection}>
                    <MitraInfo onPress={()=> handleReorder()} disabled={false} ava={navigation.state.params.avaMitra} name={data.order[0].nama_mitra} speciality={data.order[0].spesialis} status={data.order[0].status} />
                  </View>
                }
                <View style={styles.mapSection}>
                  <AddressList title='ADDRESS' data={data.order[0].address}/>
                </View>
                <View style={styles.bookingSection}>
                  <ProductList title= 'YOUR BOOKING' data={data.order[0].item} flag={3} />
                </View>
                <View style={styles.totalSection}>
                  <View></View>
                  <View style={styles.totalWrap}>
                    <Text style={styles.totalTitle}>Total</Text>
                  </View>
                  <View style={styles.totalWrap}>
                    <Text style={styles.totalPrice}>Rp. {parseFloat(data.order[0].total_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                  </View>
                </View>
                {/* {data.order[0].status === 'Payment Success' &&
                  <View style={styles.genderSection}>
                    <View>
                      <Text style={styles.genderTitle}>GENDER MITRA</Text>
                    </View>
                    <View style={styles.genderItem}>
                      <View>
                        <Pressable onPress={() => handleGenderMale()}>
                          <ImageBackground 
                            source={{ uri: "https://reactjs.org/logo-og.png" }} 
                            resizeMode="cover" 
                            style={styles.images} 
                          />
                        </Pressable>

                      </View>
                      <View>
                        <Pressable onPress={() => handleGenderFemale()}>
                          <ImageBackground 
                            source={{ uri: "https://reactjs.org/logo-og.png" }} 
                            resizeMode="cover" 
                            style={styles.images} 
                          />
                        </Pressable>
                      </View>
                      <View></View>
                      <View></View>
                      <View></View>
                    </View>
                  </View>
                } */}
                <View style={styles.confirmSection}>
                  <PaySection title='PAY WITH' data={data.order} />
                </View>
                <View style={styles.virtualSection}>
                  <View>
                    <Text style={styles.virtualTitle}>VIRTUAL ACCOUNT NO`</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.virtualValue}>{data.order[0].trx_id}</Text>
                  </View>
                </View>
                <View style={styles.dateOrderSection}>
                  <View>
                    <Text style={styles.dateOrderTitle}>DATE AND ORDER TIME</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.dateOrderValue}>{data.order[0].service_time}</Text>
                  </View>
                </View>

              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.buttonConfirmSection}>
          {data.order[0].status === 'Waiting for payment' &&
            <>
              <View>
                <GradientButton
                  onPressButton={()=> handleCancel()}
                  setting={shadowButton}
                  btnText="CANCEL ORDER"
                />
              </View>
              { (data.order[0].payment_code === '402' || data.order[0].payment_code === '801' || data.order[0].payment_code === '800' || 
                 data.order[0].payment_code === '802' || data.order[0].payment_code === '825') &&
                <View>
                  <GradientButton
                    onPressButton={()=> handleHowTo()}
                    setting={shadowButton}
                    btnText="How To Pay"
                  />
                </View>
              }
            </>
          }

          {data.order[0].status === 'Payment Success' && data.order[0].id_mitra === null && data.order[0].status_mitra === null &&
            <>
              <View>
                <GradientButton
                  onPressButton={()=> handleSearch()}
                  setting={shadowButton}
                  btnText="Search Mitra"
                />
              </View>
              <View>
                <GradientButton
                  onPressButton={()=> handleRefund()}
                  setting={shadowButton}
                  btnText="Refund"
                />
              </View>
            </>
          }

          {data.order[0].status === 'Payment Success' && (data.order[0].id_mitra !== null && data.order[0].status_mitra === null) &&
            <>
              <View>
                <GradientButton
                  onPressButton={()=> handleSearch()}
                  setting={shadowButton}
                  btnText="Search Mitra"
                />
              </View>
              <View>
                <GradientButton
                  onPressButton={()=> handleRefund()}
                  setting={shadowButton}
                  btnText="Refund"
                />
              </View>
            </>
          }

          {data.order[0].status === 'Payment Success' && data.order[0].id_mitra !== null && data.order[0].status_mitra === 'Reject' &&
            <>
              <View>
                <GradientButton
                  onPressButton={()=> handleSearchReject()}
                  setting={shadowButton}
                  btnText="Search Mitra"
                />
              </View>
              <View>
                <GradientButton
                  onPressButton={()=> handleRefund()}
                  setting={shadowButton}
                  btnText="Refund"
                />
              </View>
            </>
          }

          {data.order[0].status === 'Payment Success' && data.order[0].id_mitra !== null && data.order[0].status_mitra === 'Approve' &&
            <>
              <View>
                <GradientButton
                  onPressButton={()=> handleDone()}
                  setting={shadowButton}
                  btnText="Done"
                />
              </View>
              <View>
                <GradientButton
                  onPressButton={()=> handleRefund()}
                  setting={shadowButton}
                  btnText="Refund"
                />
              </View>
            </>
          }
        </View>
        </>
        }

      </View>
      <Dialog.Container visible={modal}>
        <Dialog.Title style={styles.dialogTitles}>Are you sure to cancel this order</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={() => handleCancelDialog()} />
        <Dialog.Button label="OK" onPress={() => handlesetCancel()} />
      </Dialog.Container>

      <Dialog.Container visible={modalRefund}>
        <Dialog.Title style={styles.dialogTitles}>Alasan anda refund?</Dialog.Title>
        <Dialog.Title style={styles.dialogTitles}>Dana akan masuk ke rekening dalam estimasi 5 hari kerja</Dialog.Title>
        <Dialog.Input style={styles.dialogInputs} value={reason} onChangeText={(value) => setReason(value)} autoFocus={true} />
        <Dialog.Button label="Cancel" onPress={() => handleCancelDialogRefund()} />
        <Dialog.Button label="OK" onPress={() => handlesetRefund()} />
      </Dialog.Container>
      {load && <SplashMap />}
    </>
    // <View><Text>tes</Text></View>
  )
}

export default DetailActivityOrder

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 2,
    height: deviceHeight * 0.10,

  },
  container: {
    marginHorizontal: deviceWidth * 0.05,
    flex: 1,
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
    marginTop: deviceHeight * 0.03,
    marginBottom: deviceHeight * 0.04,
    paddingHorizontal: deviceWidth * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // elevation: 5,
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
    marginTop: deviceHeight * 0.01,
  },
   detailAddress: {
    color: colors.black,
    fontFamily: fontFamily.light,
    fontSize: fontSize.small,
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.90,
   },
   bookingSection: {
    marginTop: deviceHeight * 0.03,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    borderTopColor: colors.violet2,
    paddingBottom: deviceWidth * 0.05
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
  },
  mitraSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: deviceHeight * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    paddingBottom: deviceWidth * 0.05,
  },
  avatar: {
    width: deviceWidth * 0.22,
    height: deviceHeight * 0.11,
    borderRadius: deviceWidth * 0.22 / 2  ,
  },
  mitraInfo: {
    flexDirection: 'row',
  },
  mitraAbility: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: deviceWidth * 0.02,
  },
  mitraName: {
    color: colors.grey,
    fontSize: fontSize.header,
    fontFamily: fontFamily.regular,
  },
  mitraSpeciality: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  buttons: {
    backgroundColor: '#DD70F8',
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.24,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    marginTop: deviceHeight * 0.005,
    color: colors.violet1,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  buttonSection: {
   marginTop: deviceWidth * 0.06,
  },
  buttonConfirmSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: deviceHeight * 0.10,
  },
  virtualSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  virtualTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  virtualValue: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  dateOrderSection: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.04,
    justifyContent: 'space-between',
  },
  dateOrderTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  dateOrderValue: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  dialogTitles: {
    color: colors.grey,
    fontSize: deviceWidth * 0.04,
    fontFamily: fontFamily.semiBold,
  },
  dialogInputs: {
    color: colors.grey,
    fontSize: deviceWidth * 0.035,
    fontFamily: fontFamily.regular,
  },
  genderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15)
  },
  images: {
    width: moderateScale(100),
    height: moderateScale(50)
  },
  genderSection: {
    marginTop: moderateScale(10),
  },
  genderTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  }
})
