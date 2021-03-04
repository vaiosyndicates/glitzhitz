import React, { Component } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  blueGradient,
  colors
} from '../styles/variables';

export default class CallDoctorScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[CommonStyles.normalPage, {alignItems: 'center'}]}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          backgroundColor={colors.softBlue}
        />
        <View style={styles.textCont}>
          <Text grey regular style={{marginBottom: 8, fontSize: 24}}>
            Calling...
          </Text>
          <Text header black semiBold>Alexander Wolfe</Text>
        </View>
        <View style={styles.parentCir}>
          <View style={styles.childCir}>
            <Image
              source={require('../../img/person/doctor.png')}
              style={{width: 160, height: 184}}
            />
          </View>
        </View>
        <TouchableHighlight
          style={styles.buttonBox}
          underlayColor={'transparent'}
          onPress={this._handleClickEndCallButton.bind(this)}>
          <View>
            <Image
              source={require('../../img/healer/esclip.png')}
              style={{alignItems: 'center', width: 85, height: 90}}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _handleClickEndCallButton() {
    this.props.navigation.goBack(null);
  }
}

const ELEMENT_HEIGHT = 365;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  textCont: {
    alignItems: 'center',
    marginTop: spaceHeight * 0.2,
  },
  parentCir: {
    height: 230,
    width: 230,
    marginTop: spaceHeight * 0.22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(229,229,229)',
    borderRadius: 200
  },
  childCir: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 22,
    borderWidth: 1,
    borderColor: 'rgb(229,229,229)',
    borderRadius: 200
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  }
});
