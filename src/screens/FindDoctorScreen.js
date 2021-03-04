import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform } from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import { shadowOpt, spaceHeight } from '../styles/variables';

export default class FindDoctorScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Find Doctor'
        />
        <View style={CommonStyles.screenTitleBox}>
          <Text title lightGrey extraBold>
            FEELING TIRED?
          </Text>
          <Text title lightGrey extraBold>
            FIND A DOCTOR.
          </Text>
        </View>
        <View style={styles.form}>
          <SelectBox
            label='Specialist Doctor'
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
            onPressButton={this._handleFindDoctor.bind(this)}
            setting={shadowOpt}
            btnText="FIND NOW"
          />
        </View>
      </View>
    );
  }

  _handleFindDoctor() {
    this.props.navigation.navigate('ResultFindDoctorScreen');
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
