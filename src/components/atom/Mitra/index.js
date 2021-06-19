import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, deviceHeight, deviceWidth } from '../../../styles/variables'
import Buttons from '../Buttons'

const MitraInfo = ({onPress, disabled, name, speciality}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.mitraInfo}>
          <View>
            <Image
              source={require('../../img/glitz/icon-user-mitra.png')}
              style={styles.avatar} />
          </View>
          <View style={styles.mitraDetail}>
            <Text Text style={styles.mitraName}>{name}</Text>
            <Text style={styles.mitraSpeciality}>{speciality}</Text>
          </View>
        </View>
        <View></View>
        <View style={styles.buttonSection}>
          <Buttons onPress={onPress} disabled={disabled} title='REORDER'/>
        </View>
      </View>
    </View>
  )
}

export default MitraInfo

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: deviceWidth * 0.22,
    height: deviceHeight * 0.11,
    borderRadius: deviceWidth * 0.22 / 2  ,
  },
  mitraInfo: {
    flexDirection: 'row',
  },
  mitraDetail: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: deviceWidth * 0.03,
  },
  buttonSection: {
    justifyContent: 'center',
  }
})
