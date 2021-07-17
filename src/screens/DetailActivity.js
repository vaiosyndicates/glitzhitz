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
  Alert
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
import { resetActivity } from '../util/ResetRouting'

const DetailActivity = ({navigation}) => {

  const [disabled, setDisabled] = useState(false)
  const [visibleDone, setVisibleDone] = useState(false)
  const [visibileCancel, setVisibleCancel] = useState(false)
  const [visibleHowto, setVisibleHowto] = useState(false)
  const [visibleSearch, setVisibleSearch] = useState(false)
  const [visibleVA, setVisibleVA] = useState(false)
  const [visibleMitra, setVisibleMitra] = useState(false)
  const [visibleRefund, setVisibleRefund] = useState(false)
  const [visibleSearchReject, setVisibleSearchReject] = useState(false)
  const [load, setLoad] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalRefund, setModalRefund] = useState(false);
  const [reason, setReason] = useState('');

  useEffect(() => {
    // console.log(navigation.state.params.statusMitra)
    checkDisabled()
    return () => {
      checkDisabled()
    }
  }, [])

  const handleReorder = () => {
    
    const data = {
      items: navigation.state.params.item,
      totals:  navigation.state.params.total_price,
      flag: 3,
    }
   navigation.navigate('MapScreen', data);

  }

  const handleHowTo = () => {
    // console.log(navigation.state.params)
    const data = {
      nama_channel: navigation.state.params.payment[0].payment_code
    }
    navigation.navigate('HowToScreen', data);
  }


  const handleSearch = async() => {
    setLoad(true);
    let searchs = 0;
    const data = {
      id_order: navigation.state.params.id_order,
    }

    const timer = setInterval(async() => {
      if(searchs < 10){
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

          switch (response.status) {
            case 200:
              console.log(response.data.data.hasOwnProperty('id_mitra'))
              if(response.data.data.length > 0 || response.data.data.hasOwnProperty('id_mitra')) {
                setLoad(false);
                clearInterval(timer);
                const data = {
                  idMitra: response.data.data.id_mitra,
                  namaMitra: response.data.data.nama_mitra,
                  rating: response.data.data.rating,
                  speciality: response.data.data.speciality,
                  item: navigation.state.params.item,
                  total: response.data.data.total,
                  serviceTime:  response.data.data.service_time,
                  trxID: response.data.data.trx_id,
                  id_order: response.data.data.id_order,
                  token: response.data.data.token,
                }
                // console.log(data);
                navigation.navigate('MitraScreen', data)
              } else {
                setLoad(true);
                showError('No Mitra Found')
              }
              break;
          
            default:
              setLoad(false);
              showError('Search Mitra Failed')
              break;
          }

        } catch (error) {
          showError('Error')
        }
        searchs += 1;
      }else{ 
        setLoad(false);
        clearInterval(timer);
        showError('Mitra Not Found')
      }
    }, 5000);

    // try {
      
    //   const tokenizer = await AsyncStorage.getItem('token')
    //   const response = await axios.post(
    //     `${apiUrl}/Service/searchmitra`, data, {
    //       headers: {
    //         Accept: 'application/json',
    //         Authorization: tokenizer,
    //       }
    //     }
    //   );

      
    //   // console.log(response.data)

    //   switch (response.status) {
    //     case 200:
    //       console.log(response.data.data.hasOwnProperty('id_mitra'))
    //       setLoad(false);
    //       if(response.data.data.length > 0 || response.data.data.hasOwnProperty('id_mitra')) {
    //         clearInterval(timer);
    //         const data = {
    //           idMitra: response.data.data.id_mitra,
    //           namaMitra: response.data.data.nama_mitra,
    //           rating: response.data.data.rating,
    //           speciality: response.data.data.speciality,
    //           item: navigation.state.params.item,
    //           total: response.data.data.total,
    //           serviceTime:  response.data.data.service_time,
    //           trxID: response.data.data.trx_id,
    //           id_order: response.data.data.id_order,
    //           token: response.data.data.token,
    //         }
    //         // console.log(data);
    //         navigation.navigate('MitraScreen', data)
    //       } else {
    //         setLoad(false);
    //         setFlag(true);
    //         showError('No Mitra Found')
    //       }
    //       break;
      
    //     default:
    //       setLoad(false);
    //       showError('Search Mitra Failed')
    //       break;
    //   }

    // } catch (error) {
    //   setLoad(false);
    //   showError(error.message)
    //   console.log(error.response.data)
    // }
  }

  const handleSearchReject = () => {
    setLoad(true);
    const data = {
      id_order: navigation.state.params.id_order,
      id_mitra: navigation.state.params.id_mitra
    }
    console.log(data)
  }


  const checkDisabled = () => {
    const status = navigation.state.params.status
    const availbility = navigation.state.params.id_mitra
    const channel = navigation.state.params.payment[0].payment_code
    const statusMitra =  navigation.state.params.statusMitra
    // console.log(availbility)
    // console.log(navigation.state.params)
    if(status == 'Completed') {
      setVisibleMitra(true)
    } else if(status == 'Canceled') {
      setDisabled(true);
      setVisibleMitra(true)
    } else if(status == 'Waiting for payment') {
      setDisabled(true);
      setVisibleCancel(true)
      setVisibleHowto(true)
    } else if((status == 'Payment Success' && availbility == null && statusMitra === null) || (status == 'Payment Success' && availbility !== null && statusMitra === null)) {
      setDisabled(true);
      setVisibleSearch(true)
      setVisibleRefund(true)
    } else if(status == 'Payment Success' && availbility !== null && statusMitra == 'Reject') {
      setDisabled(true);
      setVisibleRefund(true)
      setVisibleSearchReject(true)
    }else {
      setDisabled(true);
      setVisibleDone(true);
      setVisibleCancel(true)
      setVisibleMitra(true)
    }

    switch (channel) {
      case '812':
        setVisibleVA(false)
        setVisibleHowto(false)
        break;

      case '302':
        setVisibleVA(false)
        setVisibleHowto(false)
        break;

      case '713':
        setVisibleVA(false)
        setVisibleHowto(false)
        break;

        case '1':
          setVisibleHowto(false)
          break;
    
      default:
        setVisibleVA(true)
        break;
    }
  };

  const handleDone = async() => {
    const data = {
      id_order: navigation.state.params.id_order,
    }

    navigation.navigate('RatingScreen', data)

    // console.log(data)
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/User/order_confirmation`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      if(response.status === 200) {
        const data = {
          id_order: navigation.state.params.id_order,
          nama_mitra: navigation.state.params.namaMitra,
        }
        showSuccess('Order Complete')
        setDisabled(false);
        setVisibleDone(false);
        setVisibleCancel(false)
        setVisibleHowto(false)
        setVisibleSearch(false)
        navigation.navigate('RatingScreen', data)

      } else {
        showError('Bad Response From Server')
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleCancel = async() => {
    setModal(true)
  }

  const handlesetCancel = async() => {
    const data = {
      bill_no: navigation.state.params.id_order,
      trx_id: navigation.state.params.trx_id,
    }

    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/Payment/cancel_payment`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      if(response.status === 200) {
        showSuccess('Order Cancelled')
        setDisabled(false)
        setVisibleDone(false)
        setVisibleCancel(false)
        setVisibleHowto(false)
        setReason('')
        setModal(false)
        setTimeout(() => {
          navigation.dispatch(resetActivity); 
        }, 2000);
      } else {
        showError('Error')
      }
    } catch (error) {
      showError(error.message)
      console.log(error)
    }
  }

  const handleCancelDialog = () => {
    setModal(false)
  }

  const handleCancelDialogRefund = () => {
    setModalRefund(false)
  }

  const handleRefund = () => {
    const channel = navigation.state.params.payment[0].payment_code
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

  const handlesetRefund = async() => {
    setReason('')
    setModalRefund(false)
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const data = {
        id_order: navigation.state.params.id_order,
        alasan: reason,
      }
      const response = await axios.post(
        `${apiUrl}/User/refund_order`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );
      
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
    }
  }

  return (
    <>
      <View style={styles.page}>
        <HeaderGradient title="Detail" onPress={()=> navigation.goBack(null)} dMarginLeft={0.30} />
        <View style={styles.container}>
          <ScrollView style={styles.scrolls} showsVerticalScrollIndicator={false}>
          <View style={styles.boxContainer}>
            <Text style={styles.textHeader}>Review Booking</Text>
            <View style={styles.box}>
              <View style={styles.boxDate}>
                <Text style={styles.boxDateTitle}>Date</Text>
                <Text style={styles.boxDateDate}>{navigation.state.params.date_order}</Text>
              </View>
              {visibleMitra &&
                <View style={styles.mitraSection}>
                  <MitraInfo onPress={()=> handleReorder()} disabled={disabled} ava={navigation.state.params.avaMitra} name={navigation.state.params.namaMitra} speciality={navigation.state.params.speciality} status={navigation.state.params.status} />
                  {/* <MitraInfo onPress={()=> handleReorder()}/> */}
                </View>
              }
              <View style={styles.mapSection}>
                <AddressList title='ADDRESS' data={navigation.state.params.address}/>
              </View>
              <View style={styles.bookingSection}>
                <ProductList title= 'YOUR BOOKING' data={navigation.state.params.item} flag={3} />
              </View>
              <View style={styles.totalSection}>
                <View></View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalTitle}>Total</Text>
                </View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalPrice}>Rp. {parseFloat(navigation.state.params.total_price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
              </View>
              <View style={styles.confirmSection}>
                <PaySection title='PAY WITH' data={navigation.state.params.payment} />
              </View>
              {visibleVA &&
                <View style={styles.virtualSection}>
                  <View>
                    <Text style={styles.virtualTitle}>VIRTUAL ACCOUNT NO`</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.virtualValue}>{navigation.state.params.trx_id}</Text>
                  </View>
                </View>
              }
              <View style={styles.dateOrderSection}>
                <View>
                  <Text style={styles.dateOrderTitle}>DATE AND ORDER TIME</Text>
                </View>
                <View></View>
                <View>
                  <Text style={styles.dateOrderValue}>{navigation.state.params.date_service}</Text>
                </View>
              </View>              

            </View>
          </View>
          </ScrollView>

        </View>
        <View style={styles.buttonConfirmSection}>
        {visibleDone &&
          <View>
            <GradientButton
              onPressButton={()=> handleDone()}
              setting={shadowButton}
              btnText="DONE"
            />
          </View>
        }
        {visibleHowto &&
          <View>
            <GradientButton
              onPressButton={()=> handleHowTo()}
              setting={shadowButton}
              btnText="How To Pay"
            />
          </View>
        }
        {visibleSearch &&
          <View>
            <GradientButton
              onPressButton={()=> handleSearch()}
              setting={shadowButton}
              btnText="Search Mitra"
            />
          </View>
        }

        {visibleSearchReject &&
          <View>
            <GradientButton
              onPressButton={()=> handleSearchReject()}
              setting={shadowButton}
              btnText="Search Mitra"
            />
          </View>
        }

        {visibileCancel &&
          <View>
            <GradientButton
              onPressButton={()=> handleCancel()}
              setting={shadowButton}
              btnText="CANCEL ORDER"
            />
          </View>
        }
        {visibleRefund &&
          <View>
            <GradientButton
              onPressButton={()=> handleRefund()}
              setting={shadowButton}
              btnText="Refund"
            />
          </View>
        }
        </View>
      </View>
      <Dialog.Container visible={modal}>
        <Dialog.Title style={styles.dialogTitles}>Are you sure to cancel this order</Dialog.Title>
        <Dialog.Button label="Cancel" onPress={() => handleCancelDialog()} />
        <Dialog.Button label="OK" onPress={() => handlesetCancel()} />
      </Dialog.Container>

      <Dialog.Container visible={modalRefund}>
        <Dialog.Title style={styles.dialogTitles}>Why you refund this order?</Dialog.Title>
        <Dialog.Input style={styles.dialogInputs} value={reason} onChangeText={(value) => setReason(value)} autoFocus={true} />
        <Dialog.Button label="Cancel" onPress={() => handleCancelDialogRefund()} />
        <Dialog.Button label="OK" onPress={() => handlesetRefund()} />
      </Dialog.Container>
      {load && <SplashMap />}
    </>
  )
}

export default DetailActivity

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
  }
})
