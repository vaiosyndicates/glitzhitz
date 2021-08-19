import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize,  shadowOpt } from '../styles/variables'
import CommonStyles from '../styles/CommonStyles';
import GradientButton from '../elements/GradientButton';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showError, showSuccess } from '../util/ShowMessage';
import { resetLogin } from '../util/ResetRouting';
import {apiUrl} from '../util/API';

const UpdateProfile = ({navigation}) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const dispatch = useDispatch();


  useEffect(() => {
    
    setName(navigation.state.params.name);
    setPhone(navigation.state.params.phone);
    setEmail(navigation.state.params.email);
    setAddress(navigation.state.params.address);

  }, [])

  const onUpdate = async() => {
    dispatch({type: 'SET_LOADING', value: true});
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(format.test(phone)) {
      dispatch({type: 'SET_LOADING', value: false});
      showError('Phone number only number allowed')
    } else {
      const data = {
        name: name,
        email: email,
        address: address,
        phone: phone,
      }
      try {
        const tokenizer = await AsyncStorage.getItem('token');
        const response = await axios.post(
          `${apiUrl}/user/update`, data, {
            headers: {
              Accept: 'application/json',
              Authorization: tokenizer,
            }
          }
        );
        
        if(response.status === 200){
          dispatch({type: 'SET_LOADING', value: false});
          showSuccess('Update Success');
          setTimeout(() => {
            navigation.dispatch(resetLogin); 
          }, 2000);
        } else{
          dispatch({type: 'SET_LOADING', value: false});
          showError('Failed Update');
        }
  
      } catch (error) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error)
        showError('Network Error');
      }
    }
  }


  return (
    <View style={CommonStyles.normalSinglePage}>
      <HeaderGradient title="Edit Profile" onPress={()=> navigation.goBack(null)} dMarginLeft={0.22} />
      <View style={styles.content}>
        <View style={CommonStyles.textInputField}>
          <Image
            source={require('../../img/healer/envelope.png')}
            style={{position:'absolute',top: deviceHeight * 0.0085, bottom: 12,left: deviceWidth * 0.03, width: deviceWidth * 0.075, height: deviceHeight * 0.03}}
          />
          <TextInput
            placeholder='Email'
            style={CommonStyles.textInput}
            underlineColorAndroid='transparent'
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View style={CommonStyles.textInputField}>
          <Image
            source={require('../../img/healer/avatar.png')}
            style={{position:'absolute',bottom: 12,left: deviceWidth * 0.04, width: deviceWidth * 0.05, height: deviceHeight * 0.03}}
          />
          <TextInput
            placeholder='Address'
            style={CommonStyles.textInput}
            underlineColorAndroid='transparent'
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <View style={CommonStyles.textInputField}>
          <Image
            source={require('../../img/glitz/phone.png')}
            style={{position:'absolute',top: deviceHeight * 0.0085, bottom: deviceHeight * 0.05,left: deviceWidth * 0.04, width: deviceWidth * 0.05, height: deviceHeight * 0.035}}
          />
          <TextInput
            placeholder='Phone'
            style={CommonStyles.textInput}
            underlineColorAndroid='transparent'
            value={phone}
            keyboardType="number-pad"
            onChangeText={text => setPhone(text)}
          />
        </View>
        <GradientButton
          onPressButton={()=> onUpdate()}
          setting={shadowOpt}
          btnText="Update Profile"
        />
      </View>
    </View>
  )
}

export default UpdateProfile

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInput: {
    width: deviceWidth - 55,
    height: 45,
    paddingLeft: 35,
    color: colors.lightGrey,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.regular,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
  },
  content: {
    marginHorizontal: deviceWidth * 0.05,
    marginTop: deviceHeight * 0.02,
  }
})
