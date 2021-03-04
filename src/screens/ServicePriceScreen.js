import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, blueGradient, colors, fontSize, fontFamily } from '../styles/variables';
import BasicService from '../components/service-price/BasicService';

export default class ServicePriceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceType: { type: 'basic'},
    };
  }

  render() {
    const smallShadowOpt = {
      btnWidth: deviceWidth - 155,
      btnHeight: 45,
      backgroundColor: "#fff",
      color: 'rgb(79,109,230)',
    }
    const priceType = this.state.priceType.type;
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Price Table'
        />
        <View style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.parentCir}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.setState({priceType: {type: 'basic'}})}
              >
                <View>
                  {
                    (() => {
                      if (priceType == 'basic') {
                        return (
                          <LinearGradient
                            start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
                            colors={blueGradient.colors}
                            style={styles.activeChildCir}>
                            <Text style={styles.activeBtnText}>Basic</Text>
                          </LinearGradient>
                        )
                      } else {
                        return (
                          <Text style={styles.btnText}>Basic</Text>
                        )
                      }
                    })()
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.setState({priceType: {type: 'pro'}})}
              >
                <View>
                  {
                    (() => {
                      if (priceType == 'pro') {
                        return (
                          <LinearGradient
                            start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
                            colors={blueGradient.colors}
                            style={styles.activeChildCir}>
                            <Text style={styles.activeBtnText}>Pro</Text>
                          </LinearGradient>
                        )
                      } else {
                        return (
                          <Text style={styles.btnText}>Pro</Text>
                        )
                      }
                    })()
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.setState({priceType: {type: 'premium'}})}
              >
                <View>
                  {
                    (() => {
                      if (priceType == 'premium') {
                        return (
                          <LinearGradient
                            start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
                            colors={blueGradient.colors}
                            style={styles.activeChildCir}>
                            <Text style={styles.activeBtnText}>Premium</Text>
                          </LinearGradient>
                        )
                      } else {
                        return (
                          <Text style={styles.btnText}>Premium</Text>
                        )
                      }
                    })()
                  }
                </View>
              </TouchableHighlight>
            </View>
            { this.renderBody() }
          </View>
        </View>
        <View style={styles.bottomBtn}>
          <GradientButton
            onPressButton={() => { console.log('Buy') }}
            setting={smallShadowOpt}
            btnText="BUY NOW"
          />
        </View>
      </View>
    );
  }

  // Render content
  renderBody() {
    switch(this.state.priceType.type) {
      case 'basic':
        return (
          <BasicService />
        );
        break;
      case 'pro':
        return (
          <BasicService />
        );
        break;
      case 'premium':
        return (
          <BasicService />
        );
        break;
      default:
        return (
          <BasicService />
        );
        break;
    }
  }
}

const spaceHeight = 70;

const styles = StyleSheet.create({
  parentCir: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    padding: 5,
    marginHorizontal: 15,
    marginBottom: 30,
    marginTop: 15,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 50
  },
  btnText: {
    width: (deviceWidth - 40)/3,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    color: colors.lightGrey,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
  activeChildCir: {
    height: 39,
    width: (deviceWidth - 40)/3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 6
        },
        shadowRadius: 5,
        shadowOpacity: 0.4
      },
    }),
  },
  activeBtnText: {
    backgroundColor: 'transparent',
    color: colors.white,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  bottomBtn: {
    position: 'absolute',
    left: 77.5,
    bottom: spaceHeight - 60,
  }
});
