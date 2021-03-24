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
          <Text style={styles.textHeader}>QUICK REGISTRATION</Text>
        </View>
        <View style={styles.body}>
          <LinearGradient
            colors={['#C32DBC', '#AC25AF', '#981EA3', '#650C85', '#450072' ]}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.footer}>
            <Text style={styles.textFooter}>No more long and exhausted registration. Description of this apps</Text>
            <View style={styles.buttonGroup}>
              <GradientButton
                setting={shadowOpt}
                btnText="SIGN IN"
                onPressButton={() => navigation.navigate('SignInScreen')}
                disabled= {false}/>
                <Text style={{height: 45}} />
              <GradientButton
                setting={shadowOpt}
                btnText="SIGN UP"
                onPressButton={() => navigation.navigate('SignUpScreen')}
                disabled= {false}/>
            </View>
          </View>
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
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    height: '100%',
    width: '100%',
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
  },
  footer: {
    position: 'absolute',
    zIndex: 1,
  },
  textFooter: {
    color: colors.white,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
    marginLeft: deviceWidth * 0.01,
    marginTop: deviceHeight * 0.20,
    marginBottom: deviceHeight * 0.05,
    textAlign: 'center',
  },
  buttonGroup: {
    marginLeft: deviceWidth * 0.07,
  }
})
