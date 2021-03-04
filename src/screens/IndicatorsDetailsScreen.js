import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import AreaSpline from '../components/indicators-settings/charts/AreaSpline';
import Pie from '../components/indicators-settings/charts/Pie';
import Theme from '../components/indicators-settings/theme';
import data from '../components/indicators-settings/data';

import Text from '../elements/Text';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  colors,
  fontFamily,
  fontSize
} from '../styles/variables';
import GradientNavigationBar from '../elements/GradientNavigationBar';

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

export default class IndicatorsDetailsScreen extends Component {
  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
  }

  render() {
    const height = 145;
    const width = deviceWidth - 15;

    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Desinfectant'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/pencil1.png'),
                buttonWidth: 22,
                buttonHeight: 22,
              },
            ]
          }
        />
        <ScrollView>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.total}>
              <Text softBlue light style={{fontSize: 54, textAlign: 'center'}}>89
                <Text grey light style={{fontSize: 27}}>bmp</Text>
              </Text>
              <Text lightGrey light style={{textAlign: 'center'}}>
                Jul 28, 2017
              </Text>
            </View>

            <AreaSpline
              width={width}
              height={height}
              data={this.state.spendingsPerYear}
              strokeColor={'rgb(75,102,234)'}
              fillColor={Theme.colors[this.state.activeIndex]}
            />

            <View style={styles.calendar}>
              <Text style={styles.dayTxt}>Mon</Text>
              <Text style={styles.dayTxt}>Tue</Text>
              <Text style={styles.dayTxt}>Wed</Text>
              <Text style={styles.dayTxt}>Thu</Text>
              <Text style={styles.dayTxt}>Fri</Text>
              <Text style={styles.dayTxt}>Sat</Text>
              <Text style={styles.dayTxt}>Sun</Text>
            </View>

            <View style={[CommonStyles.itemWhiteBox, {flexDirection: 'row'}]}>
              <View style={styles.leftCol}>
                <View style={styles.topItem}>
                  <Text style={styles.header}>GOAL</Text>
                  <Text style={styles.date}>Jul 28, 2017</Text>
                  <Text black style={{fontSize: 26, lineHeight: 26}}>108
                    <Text small grey light>bmp</Text>
                  </Text>
                </View>
                <View style={{
                  width: (deviceWidth - 70)/2,
                  alignSelf: 'flex-end',
                  borderBottomWidth: 1,
                  borderColor: colors.borderColor
                }} />
                <View style={styles.bottomItem}>
                  <Text style={styles.header}>MIN</Text>
                  <Text style={styles.date}>Jul 28, 2017</Text>
                  <Text red style={{fontSize: 26, lineHeight: 26}}>18
                    <Text small grey light>bmp</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.rightCol}>
                <View style={styles.topItem}>
                  <Text style={styles.header}>PROGRESS</Text>
                  <Text style={styles.date}>Jul 28, 2017</Text>
                  <Text black style={{fontSize: 26, lineHeight: 26}}>72
                    <Text small grey light>bmp</Text>
                  </Text>
                </View>
                <View style={{
                  width: (deviceWidth - 70)/2,
                  borderBottomWidth: 1,
                  borderColor: colors.borderColor
                }} />
                <View style={styles.bottomItem}>
                  <Text style={styles.header}>MAX</Text>
                  <Text style={styles.date}>Jul 28, 2017</Text>
                  <Text periBlue style={{fontSize: 26, lineHeight: 26}}>96
                    <Text small grey light>bmp</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  onClickSearchButton() {
    // TODO: Click search button
  }
}

const styles = StyleSheet.create({
  total: {
    marginBottom: 25,
  },
  calendar: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 21,
  },
  dayTxt: {
    width: (deviceWidth - 60)/7,
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    textAlign: 'center'
  },
  leftCol: {
    marginVertical: 20,
    borderRightWidth: 1,
    borderColor: colors.borderColor
  },
  rightCol: {
    marginVertical: 20,
  },
  bottomItem: {
    width: (deviceWidth - 30)/2,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  topItem: {
    width: (deviceWidth - 30)/2,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    color: colors.grey,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.regular,
  },
  date: {
    marginTop: 5,
    color: colors.lightGrey,
    fontSize: 10,
    fontFamily: fontFamily.light,
  }
});
