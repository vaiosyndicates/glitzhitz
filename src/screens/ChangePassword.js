import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native'
import CommonStyles from '../styles/CommonStyles';
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import { deviceHeight, shadowOpt, colors } from '../styles/variables';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {resetAction} from '../util/ResetRouting';
import { showError, showSuccess } from '../util/ShowMessage';

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.loadingReducer.loading);
  const dispatch = useDispatch();

  const handleChangePW = async () => {
    dispatch({type: 'SET_LOADING', value: true});
    const data = {
      phone: navigation.state.params.phone,
      otp: navigation.state.params.otp,
      password: password
    }
    console.log(data);
    try {
      dispatch({type: 'SET_LOADING', value: false});
      const response = await axios.put(
        'http://api.glitzandhitz.com/index.php/User/change_password', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );
      
      if (response.status === 200) {

        dispatch({type: 'SET_LOADING', value: false});
        showSuccess('Registration Success');
        setTimeout(() => {
          navigation.dispatch(resetAction); 
        }, 2000);

      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError(response.message)
      }

    } catch (error) {
      dispatch({type: 'SET_LOADING', value: false});
      showError(error.message);
    }
  }

  return (
    <View style={CommonStyles.normalSinglePage}>
      <ScrollView contentContainerStyle={{height: deviceHeight}} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBox}>
          <Text extraLarge black extraBold>Change Password</Text>
        </View>
        <View style={styles.formBox}>
          <View style={CommonStyles.textInputField}>
            <Image
              source={require('../../img/healer/padlock.png')}
              style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
            />
            <TextInput
              placeholder='Password'
              style={CommonStyles.textInput}
              underlineColorAndroid='transparent'
              onChangeText={(value) => setPassword(value)}
              secureTextEntry
            />
          </View>
          <View style={CommonStyles.buttonBox}>
            <GradientButton
              onPressButton={() => handleChangePW()}
              setting={shadowOpt}
              btnText="Change Password"
              disabled={
                password.length < 3
                  ? true
                  : false
              }/>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ChangePassword

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 52,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.38,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.32,
        marginBottom: spaceHeight * 0.18,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 255,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.15,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    marginTop: 40,
  }
});
