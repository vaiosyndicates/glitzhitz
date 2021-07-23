import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors, deviceHeight, fontFamily, fontSize } from '../../../styles/variables'

const PaySection = ({title, data}) => {
  // console.log(data)
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.paySection}>
          <View>
            <Text style={styles.payTitle}>{title}</Text>
          </View>
          <View></View>
          <View>
            <Image style={{width: 75, height: 25}} source={{uri: `data:image/png;base64,${data[0].payment_icon}`}} />
          </View>
        </View>
        {/* <View style={styles.paySection}>
          <View>
            <Text style={styles.payTitle}>PAYMENT CODE</Text>
          </View>
          <View></View>
          <View>
            <Text style={styles.payContent}>{data[0].payment_code}</Text>
          </View>
        </View> */}
        <View style={styles.paySection}>
          <View>
            <Text style={styles.payTitle}>STATUS</Text>
          </View>
          <View></View>
          <View>
            <Text style={styles.payContent}>{data[0].status}</Text>
          </View>
        </View>
      </View>
      <Text></Text>
    </View>
  )
}

export default PaySection

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  paySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: deviceHeight * 0.02,
  },
  payTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  payContent: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
})
