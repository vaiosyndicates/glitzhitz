import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import ScrollPicker from '../../../elements/ScrollPicker'
import CommonStyles from '../../../styles/CommonStyles'
import { colors, deviceHeight, deviceWidth } from '../../../styles/variables'

const Timepickers = ({onChanged, onPress, curDate}) => {

  return (
    <View style={styles.page}>
      <View style={styles.closeIcon}>
        <TouchableOpacity onPress={onPress} >
          <Text>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <DatePicker
          date={curDate}
          mode="time"
          androidVariant="nativeAndroid"
          textColor={colors.white}
          onDateChange={onChanged}
        />
      </View>
    </View>
  )
}

export default Timepickers
const scrollHeight = 150;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#E200CC',
    width: '90%',
    height: '25%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: deviceHeight * 0.35,
    left: deviceWidth * 0.05,
    borderRadius: 10,
  },
  container: {
    width: deviceWidth * 0.90,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
