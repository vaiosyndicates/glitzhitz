import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import GradientNavigationBar from '../elements/GradientNavigationBar';
import GradientButton from '../elements/GradientButton';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  deviceHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  shadowOpt
} from '../styles/variables';

export default class AddDrugsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Add Drugs'
        />
        <View style={styles.addDrugBtn}>
          <Image
            source={require('../../img/healer/addDrug.png')}
            style={{width: 90, height: 90}}
          />
        </View>

        <View style={styles.form}>
          <SelectBox
            label='Medication Name'
          />
          <View style={styles.selectboxField}>
            <TouchableHighlight
              underlayColor={'transparent'}
            >
              <View style={styles.selectboxRow}>
                <Text style={CommonStyles.selectboxLabel}>Dosage</Text>
                <Icon
                  style={{fontSize: 20, textAlign: 'center'}}
                  name="chevron-thin-down"
                  color="rgb(229,229,229)"
                />
              </View>
            </TouchableHighlight>
            <View style={{
              width: deviceWidth - 95,
              height: 0.7,
              backgroundColor: 'rgb(229,229,229)'
            }} />
            <TouchableHighlight
              underlayColor={'transparent'}
            >
              <View style={styles.selectboxRow}>
                <Text style={CommonStyles.selectboxLabel}>Unit</Text>
                <Icon
                  style={{fontSize: 20, textAlign: 'center'}}
                  name="chevron-thin-down"
                  color="rgb(229,229,229)"
                />
              </View>
            </TouchableHighlight>
          </View>
          <SelectBox
            label='Appearance'
          />
          <SelectBox
            label='Infomation'
          />
        </View>

        <View style={styles.btn}>
          <GradientButton
            onPressButton={this._handleAddDrugs.bind(this)}
            setting={shadowOpt}
            btnText="ADD DRUGS"
          />
        </View>
      </View>
    );
  }

  // Go to ListDrugsScreen
  _handleAddDrugs() {
    this.props.navigation.navigate('ListDrugsScreen');
  }
}

const ELEMENT_HEIGHT = 440;
const spaceHeight = deviceHeight - (ELEMENT_HEIGHT + NAV_HEIGHT + STATUSBAR_HEIGHT);

const styles = StyleSheet.create({
  addDrugBtn: {
    alignItems: 'center',
    marginTop: spaceHeight * 0.3,
    marginBottom: spaceHeight * 0.29,
  },
  form: {
    height: 305,
    alignItems: 'center',
  },
  selectboxField: {
    width: deviceWidth - 55,
    height: 91,
    marginBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor:'rgb(229,229,229)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
    backgroundColor:'#fff',
  },
  selectboxRow: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20,
  },
});
