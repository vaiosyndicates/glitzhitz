import React, { useState } from 'react'
import { TextInput, View, StyleSheet, Image, ScrollView, Platform, StatusBar } from 'react-native'
import CommonStyles from '../styles/CommonStyles';
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import { deviceHeight, shadowOpt, colors } from '../styles/variables';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.loadingReducer.loading);
  const dispatch = useDispatch();

  const handleChangePW = async () => {
    // dispatch({type: 'SET_LOADING', value: true});
    console.log(password);
    console.log(navigation);
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
