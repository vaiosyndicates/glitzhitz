import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

import { deviceWidth, colors, fontFamily, fontSize } from '../styles/variables';

import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import AppointmentCalendarCard from '../components/AppointmentCalendarCard';

export default class AppointmentCalendarScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Moment,
      appointmentsList: [
        {
          id: 0,
          content: 'Periodic health checks',
          time: '11:00AM - 01:25PM',
          image: require('../../img/person/pixta14912862M.png'),
          imageWidth: 50,
          imageHeight: 50,
          highlightColor: colors.softBlue
        },
        {
          id: 1,
          content: 'Treating Neck',
          time: '11:00AM - 01:25PM',
          image: require('../../img/person/pixta19791094M.png'),
          imageWidth: 50,
          imageHeight: 50,
          highlightColor: 'rgb(255,16,0)'
        },
        {
          id: 2,
          content: 'Periodic health checks',
          time: '11:00AM - 01:25PM',
          image: require('../../img/person/pixta19279319M.png'),
          imageWidth: 50,
          imageHeight: 50,
          highlightColor: 'rgb(231,190,42)'
        },
        {
          id: 3,
          content: 'Periodic health checks',
          time: '11:00AM - 01:25PM',
          image: require('../../img/person/pixta21931547M.png'),
          imageWidth: 50,
          imageHeight: 50,
          highlightColor: colors.softBlue
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          outerContainerStyle={{
            shadowColor: 'transparent',
            elevation: 0,
          }}
          back
          titleText='Calendar'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <Calendar
            onChange={(date) => this.setState({date})}
            selected={this.state.date}
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(10, 'years').startOf('day')}
            style={{
              borderColor: 'transparent',
              alignSelf: 'center',
              width: deviceWidth,
              paddingBottom: 10,
              backgroundColor: colors.softBlue,
            }}
            barView={{
              backgroundColor: colors.softBlue,
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
              backgroundColor: colors.softBlue,
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
              fontSize: 12,
              fontFamily: fontFamily.regular,
              color: colors.white,
            }}
            dayDisabledText={{
              fontSize: 12,
              fontFamily: fontFamily.regular,
              color: colors.darkWhite,
            }}
            daySelectedText={{
              color: colors.softBlue,
              fontFamily: fontFamily.regular,
              backgroundColor: colors.white,
              borderRadius: 15,
              borderColor: "transparent",
              overflow: 'hidden',
            }}
            monthText={{
              fontFamily: fontFamily.regular,
              color: colors.white,
              borderColor: colors.white,
            }}
            monthDisabledText={{
              fontFamily: fontFamily.regular,
              color: colors.darkWhite,
              borderColor: colors.darkWhite,
            }}
            yearText={{
              fontSize: 18,
              fontFamily: fontFamily.extraBold,
              color: colors.white,
            }}
          /> 
          <View style={styles.list}>
            {
              this.state.appointmentsList.map((item, index) => (
                <AppointmentCalendarCard
                  key={item.id}
                  image={item.image}
                  content={item.content}
                  time={item.time}
                  imageWidth={item.imageWidth}
                  imageHeight={item.imageHeight}
                  highlightColor={item.highlightColor}
                  onPressItem={this._handleClickItem.bind(this)}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickItem() {
    this.props.navigation.navigate("AppointmentDetailScreen");
  }
}

const styles = StyleSheet.create({
  list: {
    marginVertical: 20,
  }
});
