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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../util/API'

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
            getAddress(data);       
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

 const getAddress = async (data) => {
  try {
    const signal = axios.CancelToken.source();
    const tokenizer = await AsyncStorage.getItem('token')
    const response = await axios.get(`${apiUrl}/Service/coordinate2address`, {
      headers: {
        Authorization: tokenizer,
      },
      params: {
        logitude: data.longitude,
        latitude: data.latitude
      },
      cancelToken: signal.token,
    });
    if(response.status === 200){
      onRegionChange(response.data.data, data.latitude, data.longitude);
    } else {
      showError('Failed');
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Error: ', error.message);
    } else {
      showError(error);
    }        
  }
 }

 const onRegionChange = (region, latitude, longitude) => {
   console.log(region.address);
   const data = {
     longitude: longitude,
     latitude: latitude,
     address: region.address
   }
  dispatch({type: 'ADD_COORDINATE', value: data});
 }

 const handleAppointments = () => {
  navigation.navigate('BookAppointmentScreen', navigation.state.params)
 }

  return (
    <>
    <View style={{flex: 1}}> 
    <GooglePlacesAutocomplete
          placeholder='Enter Location'
          minLength={2}
          autoFocus={false}
          fetchDetails
          listViewDisplayed='auto'
          query={{
              key: 'AIzaSyDQSCNZgLm3P4mGA826_GRh86aIC3TDV-s',
              language: 'en',
              types: 'geocode',
          }}    
          styles={{
            container: {
              flex: 1,
              zIndex:100,
              justifyContent: 'center',
              left:20,
              top: 80,
              position: 'absolute',
              width: '90%',
              marginTop: spaceHeight * 0.001, marginVertical: deviceHeight * 0.001, marginHorizontal: deviceWidth * 0.001              
            },
            textInputContainer: {
              flexDirection: 'row',
            },
            textInput: {
              backgroundColor: '#FFFFFF',
              height: 44,
              borderRadius: 5,
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 15,
              flex: 1,
            },
            poweredContainer: {
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              borderColor: '#c8c7cc',
              borderTopWidth: 0.5,
            },
            powered: {},
            listView: {},
            row: {
              backgroundColor: '#FFFFFF',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: '#c8c7cc',
            },
            description: {},
            loader: {
              flexDirection: 'row',
              justifyContent: 'flex-end',
              height: 20,
            },
          }}
          onPress={(data, details = null) => {
            const dt = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            };
            dispatch({type: 'ADD_COORDINATE', value: dt});
            onRegionChange(dt, dt.latitude, dt.longitude);
          }}                      
          currentLocation={false} />      
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
              address: '',
            };
            console.log(data);
            dispatch({type: 'ADD_COORDINATE', value: data});
            showSuccess('Location Set');
          }}
        />
      </MapView>
      <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15, marginVertical: deviceHeight * 0.90, marginHorizontal: deviceWidth * 0.06, position: 'absolute'}]}>
        <GradientButton
          onPressButton={()=> handleAppointments()}
          setting={shadowOpt}
          btnText="Set Date and Time"
        />
      </View>
    </View>
    </>
  );
};

export default MapScreen;

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({});
