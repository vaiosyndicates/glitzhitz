import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fontFamily, fontSize } from '../../../styles/variables'

const TotalSection = ({title, total, flag}) => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.totalSection}>
          <View></View>
          <View>
            <Text style={styles.totalTitle}>{title}</Text>
          </View>
          <View>
            {/* <Text style={styles.totalPrice}>Rp. {flag === 3 ? parseFloat(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</Text> */}
            <Text style={styles.totalPrice}>Rp. {flag === 3 ? parseFloat(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : flag === 2 ? parseFloat(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }</Text>

          </View>
        </View>
      </View>
    </View>
  )
}

export default TotalSection

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalTitle: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.normal,
  },
})
