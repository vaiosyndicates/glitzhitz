import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { shadowOpt, spaceHeight } from '../styles/variables';
import SelectBox from '../elements/SelectBox';

export default class ResultFindHospitalScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Find Hospital'
        />
        <View style={CommonStyles.screenTitleBox}>
          <Text title lightGrey extraBold>YOU ARE SICK?</Text>
          <Text title lightGrey extraBold>FIND A HOSPITAL.</Text>
        </View>
        <View style={styles.form}>
          <SelectBox
            label='Specialist Hospital'
          />
          <SelectBox
            label='Current Location'
          />
          <SelectBox
            label='Date'
          />
          <SelectBox
            label='Gender'
          />
        </View>
        <View style={styles.buttonBox}>
          <GradientButton
            onPressButton={this._handleFindHospital.bind(this)}
            setting={shadowOpt}
            btnText="FIND NOW"
          />
        </View>
      </View>
    );
  }

  _handleFindHospital() {
    this.props.navigation.navigate("ResultFindHospitalScreen");
  }
}

const styles = StyleSheet.create({
  form: {
    height: 255,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.32, 
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
});
