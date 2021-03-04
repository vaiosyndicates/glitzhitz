import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
} from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import {
  shadowOpt,
  spaceHeight
} from '../styles/variables';

export default class AppointmentScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Appointment'
        />
        <View style={CommonStyles.screenTitleBox}>
          <Text title lightGrey extraBold style={{lineHeight: 49}}>
            CREATE AN APPOINTMENT.
          </Text>
        </View>
        <View style={styles.form}>
          <SelectBox
            label='Choose Hospital'
          />
          <SelectBox
            label='Dr.Amanda'
          />
          <SelectBox
            label='Book Time'
          />
          <SelectBox
            label='Complain'
          />
        </View>
        <View style={styles.buttonBox}>
          <GradientButton
            onPressButton={this._handleAddAppointment.bind(this)}
            setting={shadowOpt}
            btnText="ADD APPOINTMENT"
          />
        </View>
      </View>
    );
  }

  _handleAddAppointment() {
    this.props.navigation.navigate("AppointmentCalendarScreen");
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
