import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

const ButtonHeader = ({onPress, dWidth, dHeight}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttons(dWidth, dHeight)}>
      <Image
        source={require('../../img/glitz/navigator.png')}
        style={styles.images(dWidth, dHeight)}
      />
    </TouchableOpacity>
  )
}

export default ButtonHeader

const styles = StyleSheet.create({
  buttons: (w, h) => ({
    marginLeft: w * 0.08,
    marginTop: h * 0.02,
  }),
  images: (w, h) => ({
    width: w * 0.07,
    height: h * 0.025,
  }),
})
