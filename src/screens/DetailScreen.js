import axios from 'axios'
import React, { PureComponent, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSelector } from 'react-redux'
import HeaderGradient from '../components/Header'
import SplashMap from '../components/splash-map'
import GradientButton from '../elements/GradientButton'
import CommonStyles from '../styles/CommonStyles'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables'

const DetailsScreen = ({navigation}) => {
  const stateMaps = useSelector(state => state.mapsReducer.maps);
  const stateCarts = useSelector(state => state.cartReducer.cart);
  const totalPrice = stateCarts.reduce((accum,item) => accum + parseFloat(item.price), 0)

  const [load, setLoad] = useState(false);

  const setSplash = () => {
    setLoad(true);
    setTimeout(function () {
      setLoad(false);
    }, 4000)
  };

  return (
    <>
      <View style={styles.page}>
        <HeaderGradient title="Detail" onPress={()=> navigation.goBack(null)} dMarginLeft={0.28} />
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <Text style={styles.textHeader}>Review Booking</Text>
            <View style={styles.box}>
              <View style={styles.boxDate}>
                <Text style={styles.boxDateTitle}>Date</Text>
                <Text style={styles.boxDateDate}>{`${navigation.state.params.book_date} / ${navigation.state.params.book_time}`}</Text>
              </View>
              <View style={styles.mapSection}>
                <Text style={styles.mapTitle}>ADDRESS</Text>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={{marginTop: deviceHeight * 0.01, height: deviceHeight * 0.20}}
                  region={{
                    latitude: parseFloat(stateMaps.latitude),
                    longitude:  parseFloat(stateMaps.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    coordinate={{
                      latitude: parseFloat(stateMaps.latitude),
                      longitude:  parseFloat(stateMaps.longitude),
                    }}
                  />
                </MapView>
                <Text style={styles.detailAddress}>{navigation.state.params.fullAddress}</Text>
              </View>
              <View style={styles.bookingSection}>
                <Text style={styles.bookingTitle}>YOUR BOOKING</Text>
                {stateCarts.length > 0 && stateCarts.map((cur, key) => {
                  return (
                    <React.Fragment key={cur.id}>
                    <View style={styles.bookingCart}>
                      <Text style={styles.service}>{cur.name}</Text>
                      <Text style={styles.price}>{cur.price.replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    </React.Fragment>
                  );
                })}
              </View>
              <View style={styles.totalSection}>
                <View></View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalTitle}>Total</Text>
                </View>
                <View style={styles.totalWrap}>
                  <Text style={styles.totalPrice}>Rp. {totalPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
            <GradientButton
              onPressButton={()=> setSplash()}
              setting={shadowOpt}
              btnText="Booking Now"
            />

          </View>
        </View>
      </View>
      {load && <SplashMap />}
    </>
  )
}

export default DetailsScreen

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
    maxWidth: deviceWidth * 0.50,
   },
   bookingSection: {
    marginTop: deviceHeight * 0.30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: colors.violet2,
    borderTopColor: colors.violet2,
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
  }  
})
