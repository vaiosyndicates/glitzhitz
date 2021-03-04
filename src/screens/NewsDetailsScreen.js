import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';
import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, blueGradient, NAV_HEIGHT, TAB_HEIGHT, colors } from '../styles/variables';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

export default class NewsDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.normalPage}>
        <ScrollView style={styles.scrollView}>
          <Image
            source={require('../../img/person/img.png')}
            style={{width: deviceWidth, height: 215}}
          >
            <PrimeNavigationBar
              navigation={this.props.navigation}
              back
              outerContainerStyle={{
                backgroundColor: 'transparent',
              }}
              backIconStyle={{
                ...PrimeNavigationBar.defaultProps.backIconStyle,
                color: '#fff',
              }}
            />
          </Image>
          <View style={styles.newsDetailContainer}>
            <Text black mediumBold style={{height: 79, fontSize: 24}}>
              Can It Help Your Blurred Vision Food
            </Text>
            <Text normal lightGrey regular style={{marginBottom: 12}}>
              July 9, 2017 by
              <Text> </Text>
              <Text style={{color: colors.softBlue}}>Troy Burton</Text>
            </Text>
            <Text grey regular
              style={{lineHeight: 30, fontSize: 16, marginBottom: 25}}
            >
              A healthy lifestyle can help people with various disorders and diseases better control them,
              gaining a better quality of life. High blood pressure is one the diseases that can be better controlled with a healthy lifestyle.{"\n"}{"\n"}
              <Text>
                In some people, a healthy lifestyle
                Can prevent high blood pressure from developing. Many of us have heard over and over to
                “lose weight and get more exercise” because it will help a person to maintain better health.{"\n"}{"\n"}
              </Text>
              <Text>
                Maintaining a healthy weight and exercising regularly can do a lot to help prevent and control high blood pressure.
                High blood pressure and a high weight are closely related.
                Being overweight significantly raises a person’s risk of developing high blood pressure.
                An overweight person raises their risk by as much as six times.
                But, as a person starts to take the extra pounds off, their blood pressure typically goes down too.
                Try to eat more fruits, vegetables, whole grains, low-fat dairy products, and lean protein.
                Exercise is another important factor in preventing and controlling high blood pressure
                Exercising makes the heart stronger and enables it to pump blood throughout the body with less effort.
                The easier it is for the heart to pump blood, the easier it is on the arteries.
                Regular physical activity helps a person reach and maintain a healthy weight.
              </Text>
            </Text>
          </View>
          <LinearGradient
            start={{x: 0.4, y: 0.5}} end={{x: 1.0, y: 1.0}}
            colors={blueGradient.colors}
            style={styles.category}>
            <Text header white semiBold style={{backgroundColor: 'transparent'}}>
              Food
            </Text>
          </LinearGradient>
        </ScrollView>
        <View style={styles.bottomMenu}>
          <TouchableOpacity
            onPress={this._handleClickCommentButton.bind(this)}>
            <View style={styles.menuItem}>
              <Image
                source={require('../../img/healer/speechBubble1.png')}
                style={{width: 23, height: 20}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Image
                source={require('../../img/healer/like.png')}
                style={{width: 23, height: 21.5}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._handleClickBookmarkButton.bind(this)}>
            <View style={styles.menuItem}>
              <Image
                source={require('../../img/healer/bookmark.png')}
                style={{width: 14, height: 22}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Image
                source={require('../../img/healer/levels.png')}
                style={{width: 21, height: 22}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Image
                source={require('../../img/healer/circular.png')}
                style={{width: 22, height: 22}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _handleClickCommentButton() {
    this.props.navigation.navigate('NewsCommentScreen');
  }

  _handleClickBookmarkButton() {
    this.props.navigation.navigate('BookmarkScreen');
  }
}

const styles = StyleSheet.create({
  normalPage: {
    position: 'relative',
    flex: 1,
    height: deviceHeight,
    backgroundColor: 'white',
  },
  scrollView: {
    marginBottom: TAB_HEIGHT,
  },
  newsDetailContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 35,
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  category: {
    position: 'absolute',
    top: 190,
    left: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: 105,
    height: 39,
    borderRadius: 22,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 5
        },
        shadowRadius: 5,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 12,
      },
    }),
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: deviceWidth,
    height: TAB_HEIGHT,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 8,
        shadowOpacity: 0.5
      },
      android: {
        elevation: 25,
      },
    }),
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: deviceWidth / 5,
  }
});
