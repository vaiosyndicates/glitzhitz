import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth,
  shadowOpt,
  colors,
  fontFamily,
  fontSize,
  deviceHeight
} from '../styles/variables';
import HeaderGradient from '../components/Header';
import { TextInput } from 'react-native-gesture-handler';
import ScrollPicker from '../elements/ScrollPicker';
import { Timepickers } from '../components/molekul';
import DatePicker from 'react-native-date-picker'

export default class BookAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date(),
      newDate: Date('2021-05-3T00:00:00'),
      isTimeVisible: false,
      time: '00:00',
      address: '',
      show: false,
      hours: 0,
      minutes: 0,
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.state)
  }

  render() {
    let hour = []
    for (let index = 1; index <= 24; index++) {
      hour.push(index)      
    }
    const scrollHeight = 130;
    return (
      <>
      <View style={styles.pages}>
        <HeaderGradient title="Date Time" onPress={()=> this.props.navigation.goBack(null)} dMarginLeft={0.22} />
          <KeyboardAvoidingView behavior="height" style={Platform.OS !== 'android' && { flex: 1 }}>
            <Pressable
              onPress={() => {
                this._hideTimePicker()
            }}
            >
            <ScrollView vertical>
              <View style={CommonStyles.wrapperBox}>
                <View style={[
                  CommonStyles.itemWhiteBox,
                  {flex: 1, alignItems: 'center'}
                ]}>
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
                      backgroundColor:  colors.violet1,
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
                      backgroundColor:  colors.violet1,
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
                      color: colors.violet1,
                      backgroundColor:  colors.violet1,
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
                    <Text itemHeader softBlue mediumBold>{this.state.time}</Text>
                    <TouchableOpacity onPress={this._showTimePicker.bind(this)}>
                      <Icon
                        style={{fontSize: 20, paddingLeft: 10, paddingTop: 2}}
                        name="chevron-thin-right"
                        color="rgb(105,105,105)"
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <DatePicker
                    date={new Date()}
                    mode="time"
                  /> */}
                  <DateTimePickerModal
                    isVisible={this.state.isTimeVisible}
                    mode="time"
                    locale="en_GB"
                    date={new Date()}
                    onConfirm={this._handleConfirm.bind(this)}
                    onCancel={this._hideTimePicker.bind(this)}
                  />
                </View>
                <View style={styles.addressContainer}>
                  <Text style={styles.titleAddress}>Detail Address</Text>
                  <Text style={styles.subtitleAddress}>
                    Fill in your address include House / Apartment number and nearby landmark
                  </Text>
                  <TextInput 
                    placeholder='Your Full Address'
                    style={styles.inputs}
                    onChangeText={text => this.setState({address: text})}
                  />
                </View>
                <View style={[CommonStyles.buttonBox, {marginTop: 20, marginBottom: 10}]}>
                  <GradientButton
                    onPressButton={this._handleBookAppoitment.bind(this)}
                    setting={shadowOpt}
                    btnText="Review Booking"
                  />
                </View>
              </View> 
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
      {this.state.show && 
        <Timepickers 
          onChanged = {date => {
            let myDate = new Date(date);
            let hours = myDate.getHours();
            let minutes = ( myDate.getMinutes()<10?'0':'') + myDate.getMinutes();

            this.setState({hours: hours});
            this.setState({minutes: minutes});
            this.setState({time: `${hours}:${minutes}`})
          }}
          onPress={() => this._hideTimePicker()} 
        />}

      </>
    );
  }

  _handleBookAppoitment() {
    // TODO:
    let date = Moment(this.state.date).toDate()
    const flag = typeof this.props.navigation.state.params != "undefined" ? this.props.navigation.state.params.flag : 1 ;
    let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const data = {
      book_date: currentDate,
      book_time: this.state.time,
      fullAddress: this.state.address,
      items: flag === 3 ? this.props.navigation.state.params.items : [] ,
      totals: flag === 3 ? this.props.navigation.state.params.totals : 0 ,
      flag: flag === 3 ? 3 : 1,
    }

    // console.log(data);
    this.props.navigation.navigate('DetailOrderScreen', data);
  }

  _handleConfirm(time) {
    this._hideTimePicker();
    let hour = time.getHours();
    let minute = (time.getMinutes()<10?'0':'') + time.getMinutes();
    this.setState({time: `${hour}:${minute}`})
  }

  _hideTimePicker() {
    // this.setState({isTimeVisible: false})
    this.setState({show: false})
  }

  _showTimePicker() {
    // this.setState({isTimeVisible: true})
    this.setState({show: true})
  }

  _handleChange = (value) => {
    this.setState({hours: value.hours});
    this.setState({minutes: value.minutes});
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
  },
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  addressContainer: {
    marginHorizontal: deviceWidth * 0.04,
  },
  titleAddress: {
    fontFamily: fontFamily.medium,
    color: colors.black,
    fontSize: fontSize.region,
    marginTop: deviceHeight * 0.04,
  },
  subtitleAddress: {
    color: colors.grey,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.medium,
    maxWidth: deviceWidth * 0.90,
    marginTop: deviceHeight * 0.02,
  },
  inputs: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    fontSize: fontSize.small,
    marginBottom: deviceHeight * 0.06,
  },
  container: {
    flex: 1,
  },
});
