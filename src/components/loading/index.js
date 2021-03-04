import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { colors, fontFamily, fontSize } from '../../styles/variables';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.green1} />
      <Text style={styles.text}>Please Wait</Text>
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
});
