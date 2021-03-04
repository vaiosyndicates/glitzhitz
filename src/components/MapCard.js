import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  colors,
  fontSize,
  fontFamily,
} from '../styles/variables';

export default class MapScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={this.props.onPressItem}>
          <View style={styles.body}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {
                (() => {
                  if (this.props.isSpecial) {
                    return (
                      <LinearGradient
                        start={{x: 0.4, y: 0.5}} end={{x: 1.0, y: 1.0}}
                        colors={['rgb(255,111,111)', 'rgb(255,35,35)']}
                        style={styles.specialCir} />
                    );
                  } else {
                    return (
                      <View />
                    );
                  }
                })()
              }
              
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../img/healer/star.png')}
                  style={{width: 11, height: 11}}
                /> 
                <Text style={styles.ranking}>{this.props.ranking}</Text>
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 8}}>
              <Image
                source={this.props.image}
                style={{width: 70, height: 70, marginBottom: 10}}
              />
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.career}>{this.props.career}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.footer}>
          <TouchableHighlight
            underlayColor={colors.softBlue}
            style={styles.btnItem}
          >
            <Image
              source={require('../../img/healer/bluePhoneCall.png')}
              style={{width: 16, height: 16}}
            />
          </TouchableHighlight>
          <View style={{
            height: 30,
            borderColor: colors.borderColor,
            borderWidth: 0.8}}
          />
          <TouchableHighlight
            underlayColor={'rgb(75,102,234)'}
            style={styles.btnItem}
          >
            <Image
              source={require('../../img/healer/blueSpeech.png')}
              style={{width: 16, height: 14}}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemWhiteBox: {
    width: deviceWidth / 2.5,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: {
          width: 4,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1 
      },
      android: {
        elevation: 6,
      },
    }),
  },
  body: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(229,229,229)'
  },
  ranking: {
    color: colors.darkSkyBlue,
    fontSize: 12,
    marginTop: -2,
    marginLeft: 5,
    fontFamily: fontFamily.regular,
  },
  name: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: 16,
  },
  career: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  footer: {
    flexDirection: 'row',
  },
  btnItem: {
    height: 30,
    width: (deviceWidth/2.5) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialCir: {
    width: 15,
    height: 15,
    borderRadius: 200,
  },
});
