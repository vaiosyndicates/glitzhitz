import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../../../styles/variables'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const AddressList = ({title, data, isMap, latitude, longitude, flag}) => {
  const stateMaps = useSelector(state => state.mapsReducer.maps);
  // console.log(longitude)
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text style={styles.addressTitle}>{title}</Text>
        </View>
        {isMap &&
          <View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={{height: deviceHeight * 0.20}}
              region={{
                latitude: stateMaps.latitude === 0 ? parseFloat(latitude) : parseFloat(stateMaps.latitude),
                longitude:  stateMaps.longitude === 0 ? parseFloat(longitude) : parseFloat(stateMaps.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
            <Marker
              coordinate={{
                latitude: stateMaps.latitude === 0 ? parseFloat(latitude) : parseFloat(stateMaps.latitude),
                longitude:  stateMaps.longitude === 0 ? parseFloat(longitude) : parseFloat(stateMaps.longitude),
              }}
            />
            </MapView>
          </View>
        }
        <View>
          <Text style={styles.addressContent}>{data}</Text>
        </View>
      </View>
      <Text></Text>
    </View>
  )
}

export default AddressList

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addressContent: {
    color: colors.black,
    fontFamily: fontFamily.light,
    fontSize: fontSize.small,
    flexWrap: 'wrap',
    maxWidth: deviceWidth * 0.90,
  },
  addressTitle: {
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.light,
    marginBottom: deviceHeight * 0.02,
  },
})
