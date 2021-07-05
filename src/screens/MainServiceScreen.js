import React, { Component } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Image, 
  Platform, 
  TouchableHighlight, 
  ScrollView, 
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';
import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, NAV_HEIGHT, TAB_HEIGHT, STATUSBAR_HEIGHT, fontSize, colors, fontFamily, deviceWidth, lineHeight } from '../styles/variables';

import MenuItemBox from '../components/MenuItemBox';
import CustomTabBar from '../components/CustomTabBar';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../util/API';
import { TimeOut } from '../components/molekul';

class MainServiceScreen extends Component {
  _isMounted = false;
  signal = axios.CancelToken.source();

  constructor(props) {
    super(props);
    this.state = {
      didLoaded: true,
      data: [],
	    name: '',
      refreshing: false,
      timeout: false,
    }
  }

  async componentDidMount() {
    this._isMounted = true;
    if(this._isMounted === true) {
      this.getProfiles();
      this.getCategory();
      this.changeKey();
    }
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getProfiles();
    this.getCategory();
  }

  async getProfiles() {
    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/User/profile`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: this.signal.token,
      });
      if(response.status === 200){
        const data = {
          id: response.data.data.user[0].android_device_id,
          name: response.data.data.user[0].name,
          phone: response.data.data.user[0].phone,
          address: response.data.data.user[0].address,
          email: response.data.data.user[0].email,
          gender: response.data.data.user[0].gender,
          birth: response.data.data.user[0].birth,
        }
        this.setState({name: data.name});
        this.props.profile(data);

      } else {
        showError('Failed');
      }
    } catch (error) {
      console.log(error)
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        if(error.hasOwnProperty('response')) {
          switch (error.response.status) {
            case 404:
              this.props.timeout({code: 404, status: true});
              break;

            case 405:
              this.props.timeout({code: 405, status: true});
              break;

            case 505:
              this.props.timeout({code: 505, status: true});
              break;
          }
        } else {
          console.log('Error: ', error.message);
        }

      }
    }
  }

  async getCategory() {
    // console.log(apiUrl)
    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.get(`${apiUrl}/Service/category`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: this.signal.token,
      });
      // console.log(response);
      if(response.status === 200){
        this.setState({data: response.data.data.services})
        this.props.service(response.data.data.services)
        this.setState({refreshing: false});
      } else {
        this.setState({data: []})
        showError('Failed');
      }

    } catch (error) {
      // console.log(error.message)
      // console.log(this.props.getTimeout)
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message);
      } else {
        if(error.hasOwnProperty('response')) {
          switch (error.response.status) {
            case 404:
              this.props.timeout({code: 404, status: true});
              break;

            case 405:
              this.props.timeout({code: 405, status: true});
              break;

            case 500:
              this.props.timeout({code: 500, status: true});
              break;
  
            default:
              break;
          }
        } else {
          console.log('Error: ', error.message);
        }

      }
    }
  }

  async changeKey() {
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const fcmToken = await AsyncStorage.getItem('fcmToken');

      const data = {
        android_device_id: fcmToken
      }

      const response = await axios.post(
        `${apiUrl}/User/update_key`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      if(response.status === 200){
        console.log(response.status);
      } else {
        showError('Error change key');
      }

    } catch (error) {
      showError('Network Error')
      // console.log(error)
    }
  }



  componentWillUnmount() {
    this.setState({didLoaded: false});
    this._isMounted = false;
    this.signal.cancel('Api is being canceled');
  }

  findMiddle(){
    const rdx = this.props.getService;
    const datas = (rdx === null || typeof rdx == 'undefined' ? this.state.data : this.props.getService);
    let mid = datas[Math.ceil((datas.length - 1) / 2)];
    return datas.indexOf(mid);
  }

  splitArray() {
    const rdx = this.props.getService;
    const datas = (rdx === null || typeof rdx == 'undefined' ? this.state.data : this.props.getService);
    let first = datas.slice(0, this.findMiddle());
    let second = datas.slice(- this.findMiddle());
    return [first, second] ;
  }
  

  render() {
    let  [first, second] = this.splitArray();
    return (
      <>
        <View style={styles.page}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../img/glitz/logoWhite.png')}
              style={{width: 150, height: 80}}
            />
          </View>
          <LinearGradient
            colors={colors.gradient}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          <View style={styles.personal}>
            <Text style={styles.personalHellos}>Hello {(this.props.getProfile === null || typeof this.props.getProfile == 'undefined' ? this.state.name : this.props.getProfile.name)}</Text>
            <Text style={styles.personalAsk}>How we can help you today ?</Text>
          </View>
          <View style={{height: deviceHeight * 0.03}} />
          <ScrollView vertical 
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <View style={styles.fullField}>
              <View style={styles.colMainLeft}>
                {first.length > 0 && first.map((current, i) => {
                  return (
                    <React.Fragment key={current.id_service}>
                      <TouchableOpacity onPress={() => this._handleClickShopping(current.id_service, current.name, current.image)}>
                      {/* <TouchableOpacity onPress={() => this._handleClickEmailButton()}> */}
                        <ImageBackground 
                          source={{ uri: current.image }}
                          imageStyle={{ borderRadius: 6}}
                          style={styles.image}
                        >
                            <View style={styles.bannerSection}>
                              <Text style={styles.textBanner}>{ current.name}</Text>
                            </View>
                        </ImageBackground>
                      </TouchableOpacity>

                    </React.Fragment>
                  );
                })}
              </View>
              <View style={styles.colMainRight}>
                {second.length > 0 && second.map((current, i) => {
                    return (
                      <React.Fragment key={current.id_service}>
                        <TouchableOpacity onPress={() => this._handleClickShopping(current.id_service, current.name, current.image)}>
                          <ImageBackground 
                            source={{ uri: current.image }} 
                            style={styles.image}
                            imageStyle={{ borderRadius: 6}}
                          >
                              <View style={styles.bannerSection}>
                                <Text style={styles.textBanner}>{ current.name}</Text>
                              </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      </React.Fragment>
                    );
                  })}
              </View>
            </View>
          </ScrollView>
          <View style={{height: 55}} />
          <CustomTabBar
            navigation={this.props.navigation}
            isActive='tabOne'
          />
        </View>
        {this.props.getTimeout.status && <TimeOut onPress={() => this._handleRefresh()} name={this.props.getTimeout.code === 500 ? 'INTERNAL SERVER ERROR' : 'NETWORK ERROR'} errorCode={this.props.getTimeout.code} />}
      </>
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
    this.props.navigation.navigate("StartBirthdayScreen");
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

  _handleClickShopping(ids, name, image) {
    const data = {
      ids: ids,
      name: name,
      image: image
    };
    this.props.navigation.navigate('ShoppingScreen', data);
  }

  _handleRefresh() {
    console.log('refresh')
    this.props.timeout(false);
    this.getProfiles();
    this.getCategory();
  }
}

const mapStateToProps = (state) => ({
  getProfile: state.profileReducer.profile,
  getToken: state.tokenReducer.authToken,
  getService: state.serviceReducer.service,
  getTimeout: state.timeoutReducer.timeout,
});

const mapDispatchToProps = dispatch => {
  return {
    profile: value => dispatch({ type: 'SAVE_USER', value: value }),
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    service: value => dispatch({ type: 'SAVE_SERVICE', value: value }),
    timeout: value => dispatch({ type: 'SET_TIMEOUT', value: value }),

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
    marginLeft: deviceWidth * 0.05,
  },
  colMainLeft: {
    flex: 1,
    marginRight: deviceWidth * 0.015,
  },
  colMainRight: {
    flex: 1,
    marginLeft: deviceWidth * 0.015,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight * 0.30,
  },
  imageContainer: {
    position: 'absolute',
    zIndex: 1,
    left: deviceWidth * 0.32,
    top: deviceHeight * 0.05,
  },
  personal: {
    marginTop: deviceHeight * -0.1,
    marginLeft: deviceWidth * 0.05,
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
  },
  page: {
    flex: 1,
  },
  image: {
    width: deviceWidth * 0.40,
    height: deviceHeight * 0.20,
    marginVertical: deviceHeight * 0.02,
    resizeMode: "cover",
    justifyContent: "flex-end"
  },
  bannerSection: {
    backgroundColor: colors.blurry,
    height: deviceHeight * 0.05,
    justifyContent: 'center',
    borderRadius: 6,
  },
  textBanner: {
    color: colors.white,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: fontSize.medium,
    maxWidth: deviceWidth * 0.20,
    marginLeft: deviceWidth * 0.09,
    fontFamily: fontFamily.medium,
  }
});
