import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Platform, ScrollView, TouchableHighlight } from 'react-native';

import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import SelectBox from '../elements/SelectBox';

import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, shadowOpt, blueGradient, colors, fontSize, fontFamily } from '../styles/variables';
import BasicBilling from '../components/billing/BasicBilling';

export default class BillingScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Billing'
        />
        <View style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <BasicBilling />
          </View>
        </View>

        <View style={styles.form}>
          <View style={CommonStyles.textInputField}>
            <TextInput
              placeholder='Full name'
              style={CommonStyles.textInputBill}
            />
          </View>

          <View style={CommonStyles.textInputField}>
            <TextInput
              placeholder='Address'
              style={CommonStyles.textInputBill}
              underlineColorAndroid='transparent'
            />
          </View>
 
          <View style={styles.parentCir}>
            <SelectBox
              label='City'
              containerStyle={styles.btnSelect}
              fieldStyle={CommonStyles.selectboxFieldHaft}
            />

            <View style={CommonStyles.textInputFieldHaft}>
              <TextInput
                placeholder='Zipcode'
                style={CommonStyles.textInputBillHaft}
                underlineColorAndroid='transparent'
              />
            </View>

          </View>
          
          <View style={styles.parentCir}>
            <SelectBox
              label='State'
              containerStyle={styles.btnSelect}
              fieldStyle={CommonStyles.selectboxFieldHaft}
            />
            <SelectBox
              label='Country'
              containerStyle={styles.btnSelect}
              fieldStyle={CommonStyles.selectboxFieldHaft}
            />
          </View>

        </View>
        <View style={styles.bottomBtn}>
          <GradientButton
            onPressButton={() => { console.log('Pay') }}
            setting={shadowOpt}
            btnText="PAY NOW"
          />
        </View>
      </View>
    );
  }

}

const spaceHeight = 70;

const styles = StyleSheet.create({
  parentCir: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  btnSelect: {
    height: 45,
    width: (deviceWidth - 45) / 2.5,
  },
  activeChildCir: {
    height: 39,
    width: (deviceWidth - 40) / 3,
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
  },
  bottomBtn: {
    position: 'absolute',
    left: 35,
    bottom: spaceHeight - 60,
  },
  form: {
    height: 255,
    marginBottom: spaceHeight * 0.32,
    paddingHorizontal: 27.5,
  },
});
