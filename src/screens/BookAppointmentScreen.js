import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  shadowOpt,
  colors,
  fontFamily,
  fontSize
} from '../styles/variables';

export default class BookAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date()
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Book Appointment'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={[
              CommonStyles.itemWhiteBox,
              {flex: 1, alignItems: 'center', marginTop: 75}
            ]}>
              <Text header black mediumBold
                style={{marginTop: 75, marginBottom: 20}}
              >
                Alexander Wolfe
              </Text>
              <Calendar
                onChange={(date) => this.setState({date})}
                selected={this.state.date}
                minDate={Moment().startOf('day')}
                maxDate={Moment().add(10, 'years').startOf('day')}
                style={{
                  borderColor: 'transparent',
                  alignSelf: 'center',
                  width: deviceWidth - 30,
                  paddingBottom: 10,
                }}
                barView={{
                  backgroundColor: 'rgb(130,160,246)',
                  paddingVertical: 5,
                }}  
                barText={{
                  fontSize: 18,
                  fontFamily: fontFamily.extraBold,
                  color: colors.white,
                }}
                stageView={{
                  padding: 0,
                }}
                dayHeaderView={{
                  backgroundColor: 'rgb(130,160,246)',
                  borderBottomColor: 'transparent',
                }}
                dayHeaderText={{
                  fontSize: 12,
                  fontFamily: fontFamily.regular,
                  color: colors.white,
                }}
                dayRowView={{
                  borderColor: 'transparent',
                  height: 31,
                }}
                dayText={{
                  color: 'rgb(74,74,74)',
                  fontSize: 12,
                  fontFamily: fontFamily.regular,
                }}
                dayDisabledText={{
                  color: 'rgb(200,200,200)',
                  fontSize: 12,
                  fontFamily: fontFamily.regular,
                }}
                daySelectedText={{
                  color: colors.white,
                  fontFamily: fontFamily.regular,
                  backgroundColor: 'rgb(130,160,246)',
                  borderRadius: 15,
                  borderColor: "transparent",
                  overflow: 'hidden',
                }}
                monthText={{
                  fontFamily: fontFamily.regular,
                  color: 'rgb(74,74,74)',
                  borderColor: 'rgb(74,74,74)',
                }}
                monthDisabledText={{
                  fontFamily: fontFamily.regular,
                  color: 'rgb(200,200,200)',
                  borderColor: 'rgb(200,200,200)',
                }}
                yearText={{
                  fontSize: 18,
                  fontFamily: fontFamily.extraBold,
                  color: colors.white,
                }}
              /> 
            </View>
            <View style={styles.avatar}>
              <Image
                source={require('../../img/person/doctor.png')}
                style={{width: 130, height: 150}}
              />
            </View>
            <View style={[
              CommonStyles.itemWhiteBox,
              { flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 21,
                paddingVertical: 15,
                marginTop: 10
              }
            ]}>
              <Text header grey mediumBold>Time</Text>
              <View style={styles.right}>
                <Text itemHeader softBlue mediumBold>8:00 AM</Text>
                <Icon
                  style={{fontSize: 20, paddingLeft: 10, paddingTop: 2}}
                  name="chevron-thin-right"
                  color="rgb(105,105,105)"
                />
              </View>
            </View>
            <View style={[CommonStyles.buttonBox, {marginTop: 20, marginBottom: 10}]}>
              <GradientButton
                onPressButton={this._handleBookAppoitment.bind(this)}
                setting={shadowOpt}
                btnText="BOOK NOW"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleBookAppoitment() {
    // TODO:
  }
}

const styles = StyleSheet.create({
  avatar: {
    position: 'absolute',
    top: 10,
    right: (deviceWidth - 130)/2,
    elevation: 7,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
