import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, blueGradient, colors, fontSize, fontFamily } from '../styles/variables';
import DevicesContent from '../components/indicators-settings/DevicesContent';
import TypesContent from '../components/indicators-settings/TypesContent';
import GradientNavigationBar from '../elements/GradientNavigationBar';

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenType: { type: 'deviceScreen'},
    };
  }

  render() {
    const screenType = this.state.screenType.type;
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Settings'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.parentCircle}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.setState({fontLoaded: true, screenType: {type: 'deviceScreen'}})}
              >
                <View>
                  { screenType == 'deviceScreen' ?
                    <LinearGradient
                      start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
                      colors={blueGradient.colors}
                      style={styles.activeChildCircle}>
                      <Text style={styles.activeBtnText}>Devices</Text>
                    </LinearGradient>
                    :
                    <Text style={styles.btnText}>Devices</Text>
                  }
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={() => this.setState({fontLoaded: true, screenType: {type: 'typeScreen'}})}>
                <View>
                  { screenType == 'typeScreen' ?
                    <LinearGradient
                      start={blueGradient.colorsStart}
                      end={blueGradient.colorsEnd}
                      colors={blueGradient.colors}
                      style={styles.activeChildCircle}>
                      <Text style={styles.activeBtnText}>Types</Text>
                    </LinearGradient>
                    :
                    <Text style={styles.btnText}>Types</Text>
                  }
                </View>
              </TouchableHighlight>
            </View>
            { this.renderBody() }
          </View>
        </ScrollView>
      </View>
    );
  }

  // Render content
  renderBody() {
    if (this.state.screenType.type == 'deviceScreen') {
      return (
        <DevicesContent />
      );
    } else {
      return (
        <TypesContent />
      );
    }
  }
}

const styles = StyleSheet.create({
  parentCircle: {
    height: 49,
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(229,229,229)',
    borderRadius: 50
  },
  btnText: {
    width: (deviceWidth - 40)/2,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: 'transparent',
    color: colors.lightGrey,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    textAlign: 'center',
  },
  activeChildCircle: {
    height: 39,
    width: (deviceWidth - 40)/2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  }
});
