import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput 
} from 'react-native'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth, fontFamily, shadowOpt } from '../styles/variables'
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../util/API';
import axios from 'axios';
import { Divider } from 'react-native-paper';
import GradientButton from '../elements/GradientButton';
import { showSuccess } from '../util/ShowMessage';
import { resetActivity } from '../util/ResetRouting';

const RefundScreen = ({navigation}) => {
  let signal = axios.CancelToken.source();
  let mounted = false;
  const [selectedLanguage, setSelectedLanguage] = useState('402');
  const [channels, setChannels] = useState([])
  const [account, setAccount] = useState('')

  useEffect(() => {
    mounted = true
    if( mounted ) {
      getChannel()
    }
    return () => {
      mounted = false
    }
  }, [])

  const handleRefund = async() => {
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const data = navigation.state.params.id_order;
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
      showError(error.message)
      console.log(error.response)
    }
  }

  return (
    <View style={styles.page}>
      <HeaderGradient title="Refund" onPress={()=> navigation.goBack(null)} dMarginLeft={0.29} />
      <View style={styles.container}>
        <View>
          <View style={styles.headerSection}>
            <Text style={styles.refundTitle}>REFUND POLICIES</Text>
            <Text style={styles.refundsubTitle}>Refund will be process differentialy according to your payment method</Text>
          </View>
          <Divider />
          <View style={styles.bankSection}>
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
            <View>
              <TextInput
                placeholder='Account Number'
                style={styles.textInput}
                underlineColorAndroid='transparent'
                keyboardType="number-pad"
                onChangeText={text => setAccount(text)}
              />
            </View>
          </View>
          <View style={styles.buttonSection}>
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> handleRefund()}
              setting={shadowOpt}
              btnText="Refund"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default RefundScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginHorizontal: deviceWidth * 0.03,
  },
  refundTitle: {
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontSize: deviceWidth * 0.045,
  },
  refundsubTitle: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: deviceWidth * 0.03,
  },
  headerSection: {
    marginVertical: deviceHeight * 0.02,
  },
  textInput: {
    height: deviceHeight * 0.04,
    marginVertical: deviceHeight * 0.05,
    borderBottomWidth: 0.5,
    borderColor: colors.borderViolet,
  },
  pickerBank: {
    borderBottomWidth: 0.5,
    borderColor: colors.borderViolet,
  },
  buttonSection: {
    marginLeft: deviceWidth * 0.02,
  }
})
