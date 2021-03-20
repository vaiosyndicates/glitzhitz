import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonHeader from '../elements/ButtonHeader';
import { colors, fontFamily, fontSize } from '../styles/variables';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const HeaderGradient = ({title, onPress}) => {
  return (
    <View style={styles.pages}>
      <LinearGradient
        colors={['#C32DBC', '#AC25AF', '#981EA3', '#650C85', '#450072' ]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.content}>
        <ButtonHeader dWidth={deviceWidth} dHeight={deviceHeight} onPress={onPress}/>
        <Text style={styles.titles}>{title}</Text>
      </View>
    </View>
  )
}

export default HeaderGradient

const styles = StyleSheet.create({
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.12,
  },
  content: {
    flexDirection: 'row',
    marginTop: Constants.statusBarHeight,
    position: 'absolute',
  },
  titles: {
    fontSize: fontSize.region,
    marginLeft: deviceWidth * 0.30,
    marginTop: deviceHeight * 0.010,
    fontFamily: fontFamily.medium,
    color: colors.white,
  }
})
