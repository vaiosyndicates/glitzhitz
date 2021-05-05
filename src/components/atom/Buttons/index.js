import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../../../styles/variables'

const Buttons = ({onPress, title, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttons} disabled={disabled}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Buttons

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: '#DD70F8',
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.24,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    marginTop: deviceHeight * 0.005,
    color: colors.violet1,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
})
