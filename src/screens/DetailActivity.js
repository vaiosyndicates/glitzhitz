import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { color } from 'react-native-reanimated'
import {AddressList, MitraInfo, PaySection, ProductList} from '../components/atom'
import HeaderGradient from '../components/Header'
import GradientButton from '../elements/GradientButton'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowButton, shadowOpt } from '../styles/variables'
import apiUrl from '../util/API'
import { showError, showSuccess } from '../util/ShowMessage'

const DetailActivity = ({navigation}) => {

  const [disabled, setDisabled] = useState(false)
  const [visible, setVisible] = useState(false)

  const handleReorder = () => {
    
    const data = {
      items: navigation.state.params.item,
      totals:  navigation.state.params.total_price,
      flag: 3,
    }
   navigation.navigate('MapScreen', data);

  }

  useEffect(() => {
    checkDisabled()
    return () => {
      checkDisabled()
    }
  }, [])

  const checkDisabled = () => {
    const status = navigation.state.params.status;
    if(status !== 'Completed' && status !== 'Canceled') {
      setDisabled(true);
      setVisible(true);
    } else {
      setDisabled(false);
      setVisible(false);
    }
  };

  const handleDone = async() => {
    const data = {
      id_order: navigation.state.params.id_order,
    }

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
        showSuccess('Order Complete')
        setDisabled(false)
        setVisible(false)
      } else {
        showError('Error')
      }

    } catch (error) {
      console.log(error.response)
    }
  }

  const handleCancel = async() => {
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
        setVisible(false)
        navigation.navigate('ActivityScreen')
      } else {
        showError('Error')
      }
    } catch (error) {
      showError('Network Error')
      console.log(error.response)
    }
  }

  return (
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
            <View style={styles.mitraSection}>
              <MitraInfo onPress={()=> handleReorder()} disabled={disabled}/>
              {/* <MitraInfo onPress={()=> handleReorder()}/> */}

            </View>
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
                <Text style={styles.totalPrice}>Rp. {navigation.state.params.total_price}</Text>
              </View>
            </View>
            <View style={styles.confirmSection}>
              <PaySection title='PAY WITH' data={navigation.state.params.payment} />
            </View>
          </View>
        </View>
        </ScrollView>

      </View>
      {visible &&
        <View style={styles.buttonConfirmSection}>
          <View>
            <GradientButton
              onPressButton={()=> handleDone()}
              setting={shadowButton}
              btnText="DONE"
            />
          </View>
          <View>
            <GradientButton
              onPressButton={()=> handleCancel()}
              setting={shadowButton}
              btnText="CANCEL ORDER"
            />
          </View>
        </View>
      }
    </View>
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
})
