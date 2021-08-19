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
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
import { backgroundColor } from 'react-native-calendars/src/style';

export default class BookAppointmentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date(),
      dateSelected: {},
      onlyDate: '',
      newDate: Date('2021-05-3T00:00:00'),
      isTimeVisible: false,
      time: '00:00',
      address: '',
      show: false,
      hours: 0,
      minutes: 0,
      curDate: new Date(),
      flagging: false,
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.state)
  }

  render() {
    return (
      <>
        <View style={styles.page}>
          <HeaderGradient title="Date Time" onPress={()=> this.props.navigation.goBack(null)} dMarginLeft={0.22} />
          <View style={styles.container}>
          <ScrollView vertical> 
            <View style={styles.wrapper}>
              <View style={styles.calenderSection}>
                <Calendar
                  current={this.state.date}
                  minDate={this.state.date}
                  enableSwipeMonths={true}
                  markedDates={this.state.dateSelected}
                  onthFormat={'MM yyyy'}
                  onDayPress={(day) => {
                    // console.log(day)
                    let fullDate = `${day.day}-${day.month}-${day.year}`
                    this.setState({flagging: true})
                    this.setState({
                      dateSelected:{[day.dateString]:{selected: true, selectedColor: '#466A8F', datePicked: day.dateString}}
                    })
                    this.setState({onlyDate: fullDate})
                  }}
                  style={{
                    borderColor: colors.borderViolet,
                    elevation: 5,
                  }}
                  theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: colors.violet1,
                    selectedDayTextColor: colors.white,
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: '#ffffff',
                    indicatorColor: 'blue',
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16,
                    'stylesheet.calendar.header': {
                      header: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: colors.violet1,
                      },
                      week: {
                        marginTop: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: colors.violet1,
                      }
                    }
                  }}
                />
              </View>
              <View>
                <View style={[
                    CommonStyles.itemWhiteBox,
                    { 
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: moderateScale(15),
                      paddingVertical: moderateScale(15),
                      marginTop: moderateScale(25)
                    }
                ]}>
                    <Text header grey mediumBold>Time</Text>
                    <TouchableOpacity onPress={this._showTimePicker.bind(this)}>
                      <View style={styles.right}>
                        <Text itemHeader softBlue mediumBold>{this.state.time}</Text>
                          <Icon
                            style={{fontSize: 20, paddingLeft: 10, paddingTop: 2}}
                            name="chevron-thin-right"
                            color="rgb(105,105,105)"
                          />
                      </View>
                    </TouchableOpacity>
                </View>
              </View>
              <View style={styles.footerContainer}>
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
                <View style={styles.buttonContainer}>
                  <GradientButton
                    onPressButton={this._handleBookAppoitment.bind(this)}
                    setting={shadowOpt}
                    btnText="Review Booking"
                  />
                </View>
              </View>
            </View>
          </ScrollView>

          </View>
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
          curDate= {this.state.curDate}
        />}
      </>
    );
  }

  _handleBookAppoitment() {
    // TODO:
    let date = Moment(this.state.date).toDate()
    let markedDate = this.state.onlyDate
    const flag = typeof this.props.navigation.state.params != "undefined" ? this.props.navigation.state.params.flag : 1 ;
    let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    const data = {
      book_date: this.state.flagging ? markedDate : currentDate,
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

  // _changeTime = () => {
  //   let myDate = this.state.date;
  //   let parsed = Date.parse(myDate)

  //   let hours = new Date(parsed).getHours();
  //   let minutes = ( new Date(parsed).getMinutes()<10?'0':'') + new Date(parsed).getMinutes();

  //   this.setState({hours: hours});
  //   this.setState({minutes: minutes});
  //   this.setState({time: `${hours}:${minutes}`})   
  // }

}

const styles = StyleSheet.create({
  calenderSection: {
    paddingHorizontal: moderateScale(15)
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    alignItems: 'center',
  },
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
    marginHorizontal: moderateScale(15),
  },
  titleAddress: {
    fontFamily: fontFamily.medium,
    color: colors.black,
    fontSize: moderateScale(20),
    marginTop: moderateScale(10),
  },
  subtitleAddress: {
    color: colors.grey,
    fontFamily: fontFamily.regular,
    fontSize: moderateScale(15),
    maxWidth: moderateScale(350),
    marginTop: moderateScale(10),
  },
  inputs: {
    borderBottomWidth: 1,
    borderColor: colors.grey,
    fontSize: moderateScale(12),
    marginBottom: deviceHeight * 0.06,
  },
  container: {
    flex: 1,
  },
});
