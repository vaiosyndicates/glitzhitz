import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, PickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ScrollPicker from '../elements/ScrollPicker';
import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, shadowOpt, blueGradient } from '../styles/variables';
import StartWeightScreen from './StartWeightScreen';

export default class StartGenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderIndex: 'MALE',
    };
  }

  onGenderSelected(index) {
  }

  render() {
    const genders = ['FEMALE', 'MALE', 'OTHER', 'SECRET'];
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
          <Text header grey mediumBold>YOUR GENDER</Text>
        </View>
        <View style={CommonStyles.pickerBox}>
          <ScrollPicker
            ref={(sp) => {this.sp = sp}}
            dataSource={genders}
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
    const screen = StartWeightScreen;
    const params = null;
    const path = null; 
    const { router } = screen;
    const action = path && router.getActionForPathAndParams(path, params);

    this.props.navigation.navigate('StartWeightScreen', {}, action);
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
