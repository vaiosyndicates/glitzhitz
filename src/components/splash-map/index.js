import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../../styles/variables'
import AnimatedLoader from 'react-native-animated-loader'

const SplashMap = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.titleCarts}>Find Nearby Driver</Text>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../../img/glitz/maps.png')}
            style={styles.imageCarts}
          />
        </View>
        <AnimatedLoader
          visible={true}
          source={require('../../../assets/json/loader.json')}
          overlayColor="rgba(255,255,255,0.15)"
          animationStyle={styles.lottie}
          speed={3}
        ></AnimatedLoader>
      </View>
    </View>
  )
}

export default SplashMap

const styles = StyleSheet.create({
  page: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
  },
  imageCarts: {
    width: deviceWidth * 0.30,
    height: deviceHeight * 0.20,
    left: deviceWidth * 0.16,
    marginTop: deviceHeight * 0.05,
  },
  titleCarts: {
    textAlign: 'center',
    fontSize: fontSize.title,
    fontFamily: fontFamily.medium,
    color: colors.violet1,
  },
  lottie: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceHeight * 0.25,
  },
})
