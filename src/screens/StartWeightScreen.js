import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, PickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScrollPicker from '../elements/ScrollPicker';
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, shadowOpt, blueGradien } from '../styles/variables';
import StartHeightScreen from './StartHeightScreen';

export default class StartWeightScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weightIndex: 55,
      unitIndex: 'Kg',
    };
  }

  onWeightSelected(index) {
  }

  onUnitSelected(index) {
  }

  render() {
    let weights = [];
    for(let i = 1; i <= 200; i++) {
      weights.push(i.toString());
    }

    let units = ['Kg', 'Ib'];

    const PickerItemIOS = PickerIOS.Item;
    const scrollHeight = 330;

    return (
      <View style={CommonStyles.normalPage}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
          rightChildren={
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={this._handleClickNext.bind(this)}
            >
              <Text header softBlue regular>Skip</Text>
            </TouchableOpacity>
          }
        />
        <View style={CommonStyles.labelField}>
          <Text header grey mediumBold>YOUR WEIGHT</Text>
        </View>
        <View style={[CommonStyles.pickerBox, {justifyContent: 'space-between'}]}>
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={weights}
            selectedIndex={0}
            itemHeight={50}
            wrapperHeight={scrollHeight}
            highlightColor={'#000000'}
            renderitem={(data, index, isselected) => {
              return (
                <text
                  style={
                    isselected ? [commonstyles.itemtext, commonstyles.itemtextselected] : commonstyles.itemtext
                  }
                >
                  {data}
                </text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
                //
            }}
          />
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={units}
            selectedIndex={0}
            itemHeight={50}
            wrapperHeight={scrollHeight}
            highlightColor={'#000000'}
            renderitem={(data, index, isselected) => {
              return (
                <text
                  style={
                    isselected ? [commonstyles.itemtext, commonstyles.itemtextselected] : commonstyles.itemtext
                  }
                >
                  {data}
                </text>
              )
            }}
            onValueChange={(data, selectedIndex) => {
                //
            }}
          />
 
        </View>
        <View style={styles.buttonBox}>
          <GradientButton
            onPressButton={this._handleClickNext.bind(this)}
            setting={shadowOpt}
            btnText="NEXT"
          />
        </View>
      </View>
    );
  }

  _handleClickNext() {
    const screen = StartHeightScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('StartHeightScreen', {}, action);
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
});
