import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomTabBar from '../components/CustomTabBar'
import HeaderGradient from '../components/Header'
import ListChat from '../components/ListChat'
import { colors } from '../styles/variables'

const MessagesScreen = ({navigation}) => {
  return (
    <View style={styles.page}>
      <HeaderGradient title="Message" dMarginLeft={0.25} onPress={() => navigation.goBack(null)} />
      <View style={styles.container}>
        <ListChat name="Test" excerpt="Lorem ipsum dolor sit amet" onPress={()=> navigation.navigate('ChattingScreen')} />
      </View>
      <CustomTabBar
        navigation={navigation}
        isActive='tabTwo'
      />
    </View>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  }
})
