import React from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import { colors, fontFamily, fontSize } from '../../styles/variables'

const IsSender = ({text, date, photo, id}) => {
  return (
    <View style={styles.container} key={id}>
       <Image 
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} 
        style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  )
}

export default IsSender

const styles = StyleSheet.create({
  chatContent: {
    maxWidth: '80%',
    backgroundColor: colors.green1,
    padding: 12,
    paddingRight: 18,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  date: {
    fontSize: 11,
    fontFamily: fontFamily.regular,
    color: colors.grey,
    marginTop: 8,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
