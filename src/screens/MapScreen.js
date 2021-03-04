import React, { Component } from 'react';
import { View, StyleSheet, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';
import { MapView } from 'expo';

import { deviceWidth, deviceHeight, NAV_HEIGHT, STATUSBAR_HEIGHT } from '../styles/variables';

import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import MapCard from '../components/MapCard';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorsList: [
        {
          id: 0,
          image: require('../../img/person/pixta21931547M.png'),
          name: 'Della Jensen',
          career: 'Cardiologist',
          ranking: 4.2,
          isSpecial: true
        },
        {
          id: 1,
          image: require('../../img/person/pixta19279319M.png'),
          name: 'Fannie Larson',
          career: 'Gynecological',
          ranking: 4.2,
          isSpecial: true
        },
        {
          id: 2,
          image: require('../../img/person/pixta14912862M.png'),
          name: 'May Hampton',
          career: 'Cardiologist',
          ranking: 4.2,
          isSpecial: true
        },
        {
          id: 3,
          image: require('../../img/person/pixta19791094M.png'),
          name: 'Jose Holland',
          career: 'Pediatrician',
          ranking: 4.2,
          isSpecial: false
        },
      ],
      markers: [
        {
          id: 0,
          latlng: {
            latitude: 37.78825,
            longitude: -122.4324,
          }
        },
        {
          id: 1,
          latlng: {
            latitude: 38.78825,
            longitude: -123.4324,
          }
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Maps'
        />
        <View style={CommonStyles.noTabScrollView}>
          <View style ={styles.container}>
            <MapView
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
            >
              {
                this.state.markers.map((marker,index) => (
                  <MapView.Marker
                    key={marker.id}
                    coordinate={marker.latlng}
                    image={require('../../img/person/pixta21931547M.png')}
                  />
                ))
              } 
            </MapView>
            <View style={styles.info}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {
                  this.state.doctorsList.map((item, index) => (
                    <MapCard
                      key={item.id}
                      image={item.image}
                      name={item.name}
                      career={item.career}
                      ranking={item.ranking}
                      isSpecial={item.isSpecial}
                    />
                  ))
                }
              </ScrollView>
            </View>
            <TouchableHighlight
              underlayColor={'transparent'}
              style={styles.circleBtn}>
              <View>
                <Image
                  source={require('../../img/healer/blueEsclip.png')}
                  style={{alignItems: 'center', width: 70, height: 75}}
                >
                  <Image
                    source={require('../../img/healer/whitePlaceholder.png')}
                    style={{width: 21.5, height: 26, marginTop: 18}}
                  />
                </Image>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    height: deviceHeight,
    width: deviceWidth,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  info: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 85,
      },
      android: {
        bottom: 95,
      },
    }),
  },
  circleBtn: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        bottom: 60,
      },
      android: {
        bottom: 70,
      },
    }),
    right: 15,
  }
});
