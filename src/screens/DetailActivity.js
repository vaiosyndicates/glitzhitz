import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { color } from 'react-native-reanimated'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../styles/variables'

const DetailActivity = ({navigation}) => {

  const handleReorder = () => {
    console.log('tes');
  }

  return (
    <View style={styles.page}>
      <HeaderGradient title="Detail" onPress={()=> navigation.goBack(null)} dMarginLeft={0.30} />
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.textHeader}>Review Booking</Text>
          <View style={styles.box}>
            <View style={styles.boxDate}>
              <Text style={styles.boxDateTitle}>Date</Text>
              <Text style={styles.boxDateDate}>{navigation.state.params.date_order}</Text>
            </View>
            <View style={styles.mitraSection}>
                <View style={styles.mitraInfo}>
                  <View>
                    <Image 
                      source={{uri: 'https://reactjs.org/logo-og.png'}}
                      style={styles.avatar} />
                  </View>
                  <View style={styles.mitraAbility}>
                    <Text style={styles.mitraName}>Hala Madrid</Text>
                    <Text style={styles.mitraSpeciality}>Sepsialis Indomie</Text>
                  </View>
                </View>
                <View></View>
                <View style={styles.buttonSection}>
                  <TouchableOpacity onPress={() => handleReorder()} style={styles.buttons}>
                    <Text style={styles.textButton}>REORDER</Text>
                  </TouchableOpacity>
                </View>
              </View>
            <View style={styles.mapSection}>
              <Text style={styles.mapTitle}>ADDRESS</Text>
              <Text style={styles.detailAddress}>{navigation.state.params.address}</Text>
            </View>
            <View style={styles.bookingSection}>
              <Text style={styles.bookingTitle}>YOUR BOOKING</Text>
              {navigation.state.params.item.map((cur, i) => {
                return (
                  <React.Fragment key={cur.id_service}>
                    <View style={styles.bookingCart}>
                      <Text style={styles.service}>{cur.item}</Text>
                      <Text style={styles.price}>{cur.price}</Text>
                    </View>
                  </React.Fragment>
                )
              })}
            </View>
            <View style={styles.totalSection}>
              <View></View>
              <View style={styles.totalWrap}>
                <Text style={styles.totalTitle}>Total</Text>
              </View>
              <View style={styles.totalWrap}>
                <Text style={styles.totalPrice}>Rp. {navigation.state.params.total_price}</Text>
              </View>
            </View>
            <View style={styles.confirmSection}>
              <View>
                <Text style={styles.payTitle}>PAY WITH</Text>
              </View>
              <View></View>
              <View>
                <Image style={{width: 75, height: 25}} source={{uri: `data:image/png;base64,${navigation.state.params.payment_icon}`}} />
                {/* <Text style={styles.merchantTitle}>{ trx.hasOwnProperty('order') && trx.order.length > 0 ? trx.order[0].payment_channel : 'undefined'}</Text> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DetailActivity

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white
  },
  container: {
    marginHorizontal: deviceWidth * 0.05,
  },
  box: {
    marginTop: deviceHeight * 0.01,
  },
  textHeader: {
    fontSize: fontSize.medium,
    color: colors.black,
    fontFamily: fontFamily.light,
  },
  boxContainer: {
    marginTop: deviceHeight * 0.04,
    marginBottom: deviceHeight * 0.04,
    paddingHorizontal: deviceWidth * 0.01,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  boxDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
  },
  boxDateTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.medium,
  },
  boxDateDate: {
    fontSize: fontSize.small,
    color: colors.black,
    fontFamily: fontFamily.medium,
  },
  mapTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  mapSection: {
    flex: 1,
    backgroundColor: 'red',
    marginTop: deviceHeight * 0.03,
  },
   detailAddress: {
    color: colors.black,
    fontFamily: fontFamily.light,
    fontSize: fontSize.small,
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.90,
   },
   bookingSection: {
    marginTop: deviceHeight * 0.12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    borderTopColor: colors.violet2,
    paddingBottom: deviceWidth * 0.05
   },
   bookingCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: deviceHeight * 0.01,
   },
   service: {
     fontSize: fontSize.small,
     fontFamily: fontFamily.medium,
     color: colors.grey,
     marginTop: deviceHeight * 0.02,
   },
   price: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    color: colors.grey,
    marginTop: deviceHeight * 0.02,
  },
  bookingTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
    marginTop: deviceHeight * 0.02,
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalWrap: {
    marginHorizontal: deviceWidth* 0.01,
    marginTop: deviceHeight * 0.02,
  },
  totalTitle: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.normal,
  },
  totalPrice: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.normal,
  },
  confirmSection: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.02,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusSection: {
    flexDirection: 'row',
    marginTop: deviceHeight * 0.03,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  payTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  statusTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
  },
  merchantTitle: {
    fontSize: fontSize.small,
    color: colors.borderViolet,
    fontFamily: fontFamily.medium,
  },
  statusMessage: {
    fontSize: fontSize.small,
    color: colors.borderViolet,
    fontFamily: fontFamily.medium,
  },
  mitraSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: deviceHeight * 0.02,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    paddingBottom: deviceWidth * 0.05,
  },
  avatar: {
    width: deviceWidth * 0.22,
    height: deviceHeight * 0.11,
    borderRadius: deviceWidth * 0.22 / 2  ,
  },
  mitraInfo: {
    flexDirection: 'row',
  },
  mitraAbility: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: deviceWidth * 0.02,
  },
  mitraName: {
    color: colors.grey,
    fontSize: fontSize.header,
    fontFamily: fontFamily.regular,
  },
  mitraSpeciality: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  buttons: {
    backgroundColor: '#DD70F8',
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.24,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    marginTop: deviceHeight * 0.005,
    color: colors.violet1,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  buttonSection: {
   marginTop: deviceWidth * 0.06,
  }
})
