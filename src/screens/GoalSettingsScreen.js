import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { blueGradient, colors, fontSize, fontFamily } from '../styles/variables';

export default class GoalSettingsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Goal Setting'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={styles.goalSettingBox}>
            <View style={styles.titleCont}>
              <Text grey mediumBold style={{fontSize: 24}}>
                Total Goal
              </Text>
              <Text periBlue mediumBold style={{fontSize: 94}}>
                49.7
                <Text style={{fontSize: 48, fontFamily: fontFamily.regular}}>
                %
                </Text>
              </Text>
            </View>
            <View style={styles.settingCont}>
              <Item
                headerText='Desinfectant'
                icon={require('../../img/healer/desinfectant.png')}
                iconWidth={16}
                iconHeight={22}
                number='89'
                percentage={69}
                bluePartWidth={70}
              />
              <Item
                headerText='Transfusion'
                icon={require('../../img/healer/transfusion.png')}
                iconWidth={16}
                iconHeight={22}
                number='167'
                percentage={86}
                bluePartWidth={85}
              />
              <Item
                headerText='Weight'
                icon={require('../../img/healer/blueHospital.png')}
                iconWidth={17}
                iconHeight={22}
                number='254'
                percentage={54}
                bluePartWidth={55}
              />
              <Item
                headerText='Desinfectant'
                icon={require('../../img/healer/desinfectant.png')}
                iconWidth={16}
                iconHeight={22}
                number='89'
                percentage={69}
                bluePartWidth={70}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      headerText,
      icon,
      iconWidth,
      iconHeight,
      number,
      percentage,
      bluePartWidth,
    } = this.props;

    return (
      <View style={[CommonStyles.itemWhiteBox, {paddingVertical: 16,paddingHorizontal: 21}]}>
        <View style={styles.goalRow}>
          <Image
            source={icon}
            style={{width:iconWidth, height:iconHeight}}
          />
          <View style={{flex:1}}>
            <Text itemHeader grey mediumBold style={{marginLeft: 23}}>
              {headerText}
            </Text>
          </View>
          <Image
            source={require('../../img/healer/more.png')}
            style={{width: 7, height: 27}}
          /> 
        </View>
        <View style={styles.valueRow}>
          <Text mediumBold style={{paddingTop: 10, fontSize: 32}}>
            {number}
            <Text regular style={{fontSize: 18}}>bpm</Text>
          </Text>
          <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <Text normal periBlue mediumBold style={{marginBottom: 5}}>
              {percentage}%
            </Text>
            <View style={styles.progressBar}>
              <LinearGradient
                start={blueGradient.colorsStart} end={blueGradient.colorsEnd}
                colors={blueGradient.colors}
                style={{width: bluePartWidth, borderRadius: 30}} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goalSettingBox: {
    marginTop: 30,
    marginBottom: 20,
  },
  titleCont: {
    marginRight: 30,
    marginLeft: 30,
  },
  settingCont: {
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 29,
  },
  valueRow: {
    height: 53,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressBar: {
    flexDirection: 'row',
    width: 100,
    height: 4,
    borderRadius: 30,
    backgroundColor: 'rgb(229,229,229)',
  },
});
