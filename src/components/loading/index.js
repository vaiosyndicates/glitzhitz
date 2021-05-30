import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { colors, deviceHeight, fontFamily, fontSize } from '../../styles/variables';
import AnimatedLoader from 'react-native-animated-loader'

const Loading = () => {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color={colors.green1} /> */}
      <AnimatedLoader
          visible={true}
          source={require('../../../assets/json/loader.json')}
          overlayColor="rgba(255,255,255,0.15)"
          animationStyle={styles.lottie}
          speed={3}
        ></AnimatedLoader>
      {/* <Text style={styles.text}>Please Wait</Text> */}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black2,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: fontSize.medium,
    color: colors.green1,
    fontFamily: fontFamily.medium
  },
  lottie: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },  
});
