import React, { useState } from 'react'
import { StyleSheet, Image, Text, View, Dimensions } from 'react-native'
import { colors, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { LinearGradient } from 'expo-linear-gradient'
import GradientButton from '../elements/GradientButton'

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
          <Text style={styles.textHeader}>“Make You Feel Beauty is Our Duty”</Text>
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
                <Text style={{height: deviceHeight * 0.03}} />
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
    marginTop: 343,
  },
  imageContainer: {
    position: 'absolute',
    marginTop: deviceHeight * 0.10,
    marginLeft: deviceWidth * 0.28,
    marginBottom: deviceHeight * 0.20,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.89,
    width: deviceWidth * 1.5,
    borderRadius: deviceHeight * 0.89 /2,
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
    marginLeft: deviceWidth * 0.14,
    marginTop: deviceHeight * 0.05,
  },
  textHeader: {
    fontSize: fontSize.extraLarge,
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
  textFooter: {
    color: colors.white,
    position: 'absolute',
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
    marginLeft: deviceWidth * 0.01,
    marginBottom: deviceHeight * 0.05,
    marginTop: deviceHeight * -0.30,
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: deviceHeight * 0.02,
  }
})
