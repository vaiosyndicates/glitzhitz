import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native'
import { colors, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { LinearGradient } from 'expo-linear-gradient'
import GradientButton from '../elements/GradientButton'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const GetStarted = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../img/glitz/logo_glitz.png')}
          style={{width: 180, height: 150}}
        />
      </View>
      <View style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Make You Feel Beauty is Our Duty</Text>
        </View>
        <View style={styles.body}>
          <LinearGradient
            colors={['#FF5ED2', '#E200CC', '#7A0189', '#350057' ]}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
          <View style={styles.footer}>
            <View style={styles.buttonGroup}>
              <GradientButton
                setting={shadowOpt}
                btnText="SIGN IN"
                onPressButton={() => navigation.navigate('SignInScreen')}
                disabled= {false}/>
                <Text style={{height: moderateScale(20)}} />
              <GradientButton
                setting={shadowOpt}
                btnText="SIGN UP"
                onPressButton={() => navigation.navigate('SignUpScreen')}
                disabled= {false}/>
            </View>
          </View>
          </LinearGradient>
        </View>
      </View>
    </View>
  )
}

export default GetStarted

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: colors.white,
  },
  page: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: moderateScale(120),
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: moderateScale(60),
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: moderateScale(600),
    width: moderateScale(570),
    borderRadius: moderateScale(600) /2,
    marginLeft: deviceWidth * -0.25
  },
  linearGradientOval: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.10,
    width: '100%',
    borderRadius: deviceHeight * 0.10 /2
  },  
  header: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: moderateScale(60),
    marginTop: moderateScale(40),
  },
  textHeader: {
    fontSize: moderateScale(30),
    fontFamily: fontFamily.regular,
    color: colors.white,
    flexWrap: 'wrap',
    width: deviceWidth * 0.70,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    width: deviceWidth * 0.85,
    zIndex: 1,
  },
  buttonGroup: {
    marginTop: deviceHeight * 0.02,
  }
})
