import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, PickerIOS, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';
import ScrollPicker from '../elements/ScrollPicker';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, shadowOpt, blueGradient } from '../styles/variables';
import MainServiceScreen from './MainServiceScreen';

export default class StartHeightScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heightIndex: 179,
      unitIndex: 'Kg',
    };
  }

  onHeightSelected(index) {
  }

  onUnitSelected(index) {
  }

  render() {
    let heightItems = [];
    for(let i = 1; i <= 200; i++) {
      heightItems.push(i.toString());
    }

    let units = ['Cm', 'Inch'];

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
          <Text header grey mediumBold>YOUR HEIGHT</Text>
        </View>
        <View style={[CommonStyles.pickerBox, {justifyContent: 'space-between'}]}>
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={heightItems}
            selectedIndex={0}
            itemHeight={50}
            wrapperHeight={scrollHeight}
            highlightColor={'#000000'}
            renderItem={(data, index, isSelected) => {
              return (
                <Text
                  style={
                    isSelected ? [CommonStyles.itemText, CommonStyles.itemTextSelected] : CommonStyles.itemText
                  }
                >
                  {data}
                </Text>
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
            renderItem={(data, index, isSelected) => {
              return (
                <Text
                  style={
                    isSelected ? [CommonStyles.itemText, CommonStyles.itemTextSelected] : CommonStyles.itemText
                  }
                >
                  {data}
                </Text>
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
    this.props.navigation.navigate('MainServiceScreen');
  }
}

const styles = StyleSheet.create({
  picker: {
    width: deviceWidth / 2,
    height: 402,
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
});
