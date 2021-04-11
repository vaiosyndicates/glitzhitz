import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily } from '../../styles/variables'

const InputChat = () => {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export default InputChat

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.grey3,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.black,
    maxHeight: 45,
  },
});
