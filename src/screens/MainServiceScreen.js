import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, TouchableHighlight, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT, fontSize, colors, fontFamily } from '../styles/variables';

import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MainServiceScreen extends Component {
  _isMounted = false;
  signal = axios.CancelToken.source();

  constructor(props) {
    super(props);
    this.state = {
      didLoaded: true,
      data: [],
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    if(this._isMounted === true) {
      try {
        const tokenizer = await AsyncStorage.getItem('token')
        const response = await axios.get('http://api.glitzandhitz.com/index.php/User', {
          headers: {
            Authorization: tokenizer,
          },
          cancelToken: this.signal.token,
        });
        
        if(response.status === 200){
          const data = {
            name: response.data.data.user[1].name,
            phone: response.data.data.user[1].phone,
            address: response.data.data.user[1].address,
            email: response.data.data.user[1].email,
            gender: response.data.data.user[1].gender,
            birth: response.data.data.user[1].birth,
          }
          this.props.profile(data);

        } else {
          showError('Failed');
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          showError(error);
        }        
      }

      try {
        const tokenizer = await AsyncStorage.getItem('token')
        const response = await axios.get('http://api.glitzandhitz.com/index.php/Service', {
          headers: {
            Authorization: tokenizer,
          },
          cancelToken: this.signal.token,
        });

        if(response.status === 200){
          
          this.setState({data: response.data.data.services})
        } else {
          this.setState({data: []})
          showError('Failed');
        }

      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Error: ', error.message);
        } else {
          showError(error);
        }        
      }
     }
  }

  componentWillUnmount() {
    this.setState({didLoaded: false});
    this._isMounted = false;
    this.signal.cancel('Api is being canceled');
  }

  findMiddle(){
    const datas = this.state.data;
    let mid = datas[Math.round((datas.length - 1) / 2)];
    return datas.indexOf(mid);
  }

  splitArray() {
    const datas = this.state.data;
    let first = datas.slice(0, this.findMiddle());
    let second = datas.slice(this.findMiddle() + 1);
    return [first, second] ;
  }
  

  render() {
    let  [first, second] = this.splitArray();
    return (
      <View style={CommonStyles.normalPage}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../img/glitz/logoWhite.png')}
            style={{width: 100, height: 80}}
          />
        </View>
        <LinearGradient
          colors={['#C32DBC', '#AC25AF', '#981EA3', '#650C85', '#450072' ]}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.personal}>
          <Text style={styles.personalHellos}>Hello User</Text>
          <Text style={styles.personalAsk}>How we can help you today ?</Text>
        </View>
        <View style={{height: 14}} />
        <ScrollView vertical>
        <View style={styles.fullField}>
          <View style={styles.colMainLeft}>
            {first.length > 0 && first.map((current, i) => {
              return (
                <MenuItemBox
                  header={current.name}
                  // subHeader='113 Doctors'
                  icon={require('../../img/healer/surgeonIcon.png')}
                  iconWidth={20}
                  iconHeight={26}
                  ids={current.id_service}
                  // onPressCard={this._handleClickFindDoctor.bind(this)}
                />
              );
            })}
          </View>
          <View style={styles.colMainRight}>
            {second.length > 0 && second.map((current, i) => {
                return (
                  <MenuItemBox
                    header={current.name}
                    // subHeader='113 Doctors'
                    icon={require('../../img/healer/surgeonIcon.png')}
                    iconWidth={20}
                    iconHeight={26}
                    ids={current.id_service}
                    // onPressCard={this._handleClickFindDoctor.bind(this)}
                  />
                );
              })}
          </View>
        </View>
        </ScrollView>
        <View style={{height: 45}} />
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabHome'
        />
      </View>
    )
  }

  // Go to AppointmentScreen
  _handleClickAppointment() {
    this.props.navigation.navigate("AppointmentScreen");
  }

  _handleClickNotificationButton() {
    this.props.navigation.navigate("NotificationScreen");
  }

  // Click email button
  _handleClickEmailButton() {
  }

  // Go to FindDoctorScreen
  _handleClickFindDoctor() {
    this.props.navigation.navigate("FindDoctorScreen");
  }

  // Go to FindHospitalScreen
  _handleClickFindHospital() {
    this.props.navigation.navigate("FindHospitalScreen");
  }

  // Go to ServicePriceScreen
  _handleClickServicePrice() {
    this.props.navigation.navigate("ServicePriceScreen");
  }
}

const mapStateToProps = (state) => ({
  getProfile: state.profileReducer.profile,
  getToken: state.tokenReducer.authToken
});

const mapDispatchToProps = dispatch => {
  return {
    profile: value => dispatch({ type: 'SAVE_USER', value: value })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainServiceScreen)

MainServiceScreen.defaultNavigationOptions = {
  tabBarVisible: false,
};

const ELEMENT_HEIGHT = 430;
const spaceHeight = deviceHeight - (NAV_HEIGHT + TAB_HEIGHT + ELEMENT_HEIGHT);

const styles = StyleSheet.create({
  titleBox: {
    marginTop: spaceHeight * 0.12,
    paddingHorizontal: 27,
  },
  fullField: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: spaceHeight * 0.1,
  },
  colMainLeft: {
    flex: 1,
    marginRight: 8,
  },
  colMainRight: {
    flex: 1,
    marginLeft: 8,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%',
  },
  imageContainer: {
    position: 'absolute',
    zIndex: 1,
    left: 155,
    top: 30,
  },
  personal: {
    marginTop: -70,
    marginLeft: 15,
  },
  personalHellos: {
    fontSize: fontSize.region,
    color: colors.white,
    fontFamily: fontFamily.medium,
  },
  personalAsk: {
    fontSize: fontSize.header,
    color: colors.white,
    fontFamily: fontFamily.medium,
  }
});
