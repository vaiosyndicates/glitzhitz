import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../util/API';
import axios from 'axios';
import { Divider, List } from 'react-native-paper';
import GradientButton from '../elements/GradientButton';
import { showError, showSuccess } from '../util/ShowMessage';
import { resetActivity } from '../util/ResetRouting';
import Dialog from "react-native-dialog"

const RefundScreen = ({navigation}) => {
  let signal = axios.CancelToken.source();
  let mounted = false;
  const [selectedLanguage, setSelectedLanguage] = useState('402');
  const [channels, setChannels] = useState([])
  const [account, setAccount] = useState('')
  const [name, setName] = useState('')
  const [reason, setReason] = useState('')
  const [modal, setModal] = useState(false)

  useEffect(() => {
    mounted = true
    if( mounted ) {
      getChannel()
    }
    return () => {
      mounted = false
    }
  }, [])

  const handleOpenDialog = async() => {
    setModal(true)
  }

  const handleCancelDialog = () => {
    setModal(false)
  }

  const handleOkDialog =  async() => {
    setModal(false)
    const data = {
      id_order: navigation.state.params.id_order,
      nama_rekening: name,
      bank: selectedLanguage,
      rekening: account,
      alasan: reason,
    }
    // console.log(data)
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/Payment/refund_order`, data, {
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
        showError(response.message)
      }
    } catch (error) {
      showError(`Internal server ${error.message}`)
      console.log(error.response.data)
    }
  }

  const getChannel = async() => {
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/Payment/bank`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
      });
      // console.log(response.data.status)
      switch (response.data.status) {
        case 200:
          setChannels(response.data.data.channel)
          break;
      
        default:
          showError('Failed Get Payment Channel')
          break;
      }
    } catch (error) {
      showError(error.message)
      console.log(error.response.data)
    }
  }

  return (
    <>
    <View style={styles.page}>
      <HeaderGradient title="Refund" onPress={()=> navigation.goBack(null)} dMarginLeft={0.29} />
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="height" style={Platform.OS !== 'android' && { flex: 1 }}> 
          <ScrollView vertical showsVerticalScrollIndicator={false}>
            <View>
              <Divider style={styles.divider} />
              <View style={styles.bankSection}>
                <View>
                  <View style={styles.titleSection}>
                    <Text style={styles.accountTitleName}>Account Name</Text>
                  </View>
                  <View>
                    <TextInput
                      placeholder='Account Name'
                      style={styles.textInput}
                      underlineColorAndroid='transparent'
                      onChangeText={text => setName(text)}
                    />
                  </View>
                </View>
                <View>
                  <View style={styles.titleSection}>
                    <Text style={styles.accountTitleName}>Account Type</Text>
                  </View>
                  <View style={styles.pickerBank}>
                    <Picker
                      selectedValue={selectedLanguage}
                      dropdownIconColor={colors.violet1}
                      style={{marginLeft: deviceWidth * -0.04}}
                      onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                      }>
                        {channels.length > 0 && channels.map((cur, i) => {
                          // console.log(cur)
                          return(
                            <Picker.Item 
                              label={cur.bank} 
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
                <View>
                  <View>
                    <View>
                      <View style={styles.titleSection}>
                        <Text style={styles.accountTitleName}>Account Number or Phone Number</Text>
                      </View>
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
                </View>
                <View>
                  <View>
                    <View>
                      <View style={styles.titleSection}>
                        <Text style={styles.accountTitleName}>Refund Reason</Text>
                      </View>
                    </View>
                    <View>
                      <TextInput
                        placeholder='Refund Reason'
                        style={styles.textInputReason}
                        underlineColorAndroid='transparent'
                        onChangeText={text => setReason(text)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.buttonSection}>
                <GradientButton
                  // onPressButton={()=> setSplash()}
                  // onPressButton={()=> navigation.navigate('FaspayScreen')}
                  onPressButton={()=> handleOpenDialog()}
                  setting={shadowOpt}
                  btnText="Refund"
                  disabled={
                    account.length < 3 ||
                    name.length < 3 ||
                    reason.length < 3 
                      ? true
                      : false
                  }
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
    <Dialog.Container visible={modal}>
      <Dialog.Title style={styles.dialogTitles}>Apakah anda yakin ?</Dialog.Title>
      <Dialog.Title style={styles.dialogTitles}>Dana akan masuk dalam 1 hari kerja </Dialog.Title>
      <Dialog.Button label="Cancel" onPress={() => handleCancelDialog()} />
      <Dialog.Button label="OK" onPress={() => handleOkDialog()} />
    </Dialog.Container>
    </>
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
    height: deviceHeight * 0.05,
    marginVertical: deviceHeight * 0.02,
    borderBottomWidth: 0.5,
    borderColor: colors.borderViolet,
    color: colors.grey,
  },
  textInputReason: {
    height: deviceHeight * 0.05,
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.05,
    borderBottomWidth: 0.5,
    borderColor: colors.borderViolet,
    color: colors.grey,
  },
  pickerBank: {
    borderBottomWidth: 0.5,
    borderColor: colors.borderViolet,
    marginVertical: deviceHeight * 0.02,
    color: colors.grey,
  },
  buttonSection: {
    marginLeft: deviceWidth * 0.02,
  },
  accountTitleName: {
    fontSize: deviceWidth * 0.04,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  titleSection: {
    marginTop: deviceHeight * 0.01,
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
  titleAccordion: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.normal,
    marginLeft: deviceWidth * -0.02,
  },
  textWrap: {
    flexWrap: 'wrap',
    color: colors.black2,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  bankSection: {
    marginTop: deviceHeight * 0.01,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderViolet
  }
})
