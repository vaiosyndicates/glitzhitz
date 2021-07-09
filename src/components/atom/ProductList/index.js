import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, deviceHeight, fontFamily, fontSize } from '../../../styles/variables'

const ProductList = ({title, flag, data}) => {
  // console.log(data);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.productSection}>
          { data.length > 0 && data.map((cur, i) => {
            return (
              <React.Fragment key={i}>
                <View style={styles.productList}>
                  <Text style={styles.productName}>{cur.name}</Text>
                  <Text style={styles.productPrice}>{parseFloat(cur.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
              </React.Fragment>
            )})
          }
        </View>
      </View>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  page: {
    flex: 1,    
  },
  container: {
    flex: 1,
  },
  productList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
    marginVertical: deviceHeight * 0.01,
  },
  productPrice: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
    marginVertical: deviceHeight * 0.01,
  },
  sectionTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
    marginVertical: deviceHeight * 0.01,
  },
  productSection: {
    flex: 1,
  }
})
