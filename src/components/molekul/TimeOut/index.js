import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../../../styles/variables'
import AnimatedLoader from 'react-native-animated-loader'

const TimeOut = ({name, onPress, errorCode}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <AnimatedLoader
            visible={true}
            source={require('../../../../assets/json/505.json')}
            overlayColor="rgba(255,255,255,0.15)"
            animationStyle={styles.lottie}
            speed={3}>
            <View style={styles.textSection}>
              <Text style={styles.title}>{name} {errorCode}</Text>
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </AnimatedLoader>
        </View>
        <View></View>
      </View>
    </View>
  )
}

export default TimeOut

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  lottie: {
    width: 150,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },   
  title: {
    fontSize: fontSize.header,
    fontFamily: fontFamily.semiBold,
    color: colors.violet1
  },
  textSection: {
    marginVertical: deviceHeight * 0.02,
  },
  buttonText: {
    fontSize: fontSize.header,
    fontFamily: fontFamily.regular,
    color: colors.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.violet1,
    height: deviceHeight * 0.05,
    width: deviceWidth * 0.32,
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSection: {
    marginVertical: deviceHeight * 0.10,
  }
})
