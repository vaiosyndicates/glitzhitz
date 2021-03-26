import React, {useEffect, useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {showError, showSuccess} from '../util/ShowMessage';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, deviceWidth, shadowOpt } from '../styles/variables';
import GradientButton from '../elements/GradientButton';

const MapScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const positions = useSelector(state => state.mapsReducer.maps);

  useEffect(() => {
    const accessPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Sallon Permission',
            message: 'Sallon needs access to your current location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(info => {
           const data = {
             latitude: info.coords.latitude,
             longitude: info.coords.longitude,
           }
           dispatch({type: 'ADD_COORDINATE', value: data});
          });
        } else {
          showError('Geolocation permission denied');
          console.log('Geolocation permission denied');
        }
      } catch (err) {
        showError('err');
        console.warn(err);
      }
    };

    accessPermission();
  }, [dispatch]);

  return (
    <View style={{flex: 1}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={{
          latitude: parseFloat(positions.latitude),
          longitude: parseFloat(positions.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          draggable
          coordinate={{
            latitude: parseFloat(positions.latitude),
            longitude: parseFloat(positions.longitude),
          }}
          onDragEnd={(e) => {
            const data = {
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            };
            dispatch({type: 'ADD_COORDINATE', value: data});
            showSuccess('Location Set');
          }}
        />
      </MapView>
      <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15, marginVertical: deviceHeight * 0.90, marginHorizontal: deviceWidth * 0.06, position: 'absolute'}]}>
        <GradientButton
          onPressButton={()=> navigation.navigate('BookAppointmentScreen')}
          setting={shadowOpt}
          btnText="Set Date and Time"
        />
      </View>
    </View>
  );
};

export default MapScreen;

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({});
