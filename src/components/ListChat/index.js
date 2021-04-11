import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { colors, fontFamily, fontSize } from '../../styles/variables'

const ListChat = ({pic, name, excerpt, type, onPress, icon, time}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} 
        style={styles.avatar} />

      <View style={styles.content(icon)}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.excerpt}>{excerpt}</Text>
      </View>
      {type === 'hasNext' && <IconChevronRight />}
      {time && <Text style={styles.time}>{time}</Text>}
    </TouchableOpacity>
  )
}

export default ListChat

const styles = StyleSheet.create({
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderViolet,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.semiBold,
    color: colors.black,
    marginTop: 4,
  },
  time: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    color: colors.black,
  },
  content: (icon) => ({
    flex: 1,
    marginLeft: icon ? 16 : 0,
  }),
  excerpt: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    color: colors.lightGrey,
  },
})
