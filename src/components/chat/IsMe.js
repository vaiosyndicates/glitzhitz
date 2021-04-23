import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily, fontSize } from '../../styles/variables'

const IsMe = ({text, date, id}) => {
  return (
    <View style={styles.container} key={id}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  )
}

export default IsMe

const styles = StyleSheet.create({
  chatContent: {
    maxWidth: '70%',
    backgroundColor: colors.chat,
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  text: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  date: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    color: colors.grey,
    marginTop: 8,
  },
});
