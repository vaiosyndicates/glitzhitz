import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ChatItem from '../components/chat'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight } from '../styles/variables'

const ChattingScreen = ({navigation}) => {
  return (
    <>
      <View style={styles.page}>
        <HeaderGradient title="Chat Screen" dMarginLeft={0.20} onPress={() => navigation.goBack(null)} />
        <View style={styles.container}>
          <ChatItem isSender={true} text="Lorem Ipsum dolor Sit Amet" date="10-12-2012" />
        </View>
      </View>
    </>
  )
}

export default ChattingScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    marginTop: deviceHeight * 0.05,
  }
})
