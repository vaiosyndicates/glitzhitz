import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Image, 
  ScrollView,
  RefreshControl,
 } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';

import CustomTabBar from '../components/CustomTabBar';
import ItemWithDetail from '../components/ItemWithDetail';
import ProfileCard from '../components/user-profile/ProfileCard';
import { connect } from 'react-redux';
import { showError, showSuccess } from '../util/ShowMessage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetLogout } from '../util/ResetRouting';
import HeaderGradient from '../components/Header';
import { colors, fontFamily, fontSize } from '../styles/variables';
import {apiUrl} from '../util/API'
import { TimeOut } from '../components/molekul'
class UserProfileScreen extends Component {
  _isMounted = false;
  signal = axios.CancelToken.source();
  
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      email: '',
      phone: '',
      gender: '',
      isFetching: false,
    }
  }

  render() {
    return (
      <>
      <View style={styles.page}>
       <HeaderGradient title="User Profile" onPress={()=> this.props.navigation.goBack(null)} dMarginLeft={0.25} />
        <ScrollView 
          style={CommonStyles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={CommonStyles.itemWhiteBox}>
            <View style={styles.rowTop}>
              <ProfileCard
                header='Name'
                content={this.state.name}
                hasPaddingTop={false}
              />
              <ProfileCard
                header='Phone'
                content={this.state.phone}
                unit=''
                hasPaddingTop={false}
              />
              <ProfileCard
                header='Gender'
                content={this.state.gender}
                unit=''
                hasPaddingTop={false}
                hasBorderRight={false}
              />
            </View>
            <View style={styles.rowBottom}>
              <Text header grey regular style={styles.headerAddress}>Address</Text>
              <Text header black reguler style={styles.contentAddress}>{this.state.address}</Text>
            </View>
          </View>
          <View style={styles.otherCont}>
          <ItemWithDetail
              image={{
                url: require('../../img/healer/avatar.png'),
                width: 22,
                height: 25 
              }}
              header='Edit Profile'
              onPressItem={() => this.onClickEdit()}
            />
            <ItemWithDetail
              image={{
                url: require('../../img/glitz/logout.png'),
                width: 22,
                height: 25 
              }}
              header='Sign Out'
              onPressItem={this._handleClickLogOut.bind(this)}
            />
          </View>
        </ScrollView>
        <CustomTabBar
          navigation={this.props.navigation}
          isActive='tabFour'
        />
      </View>
      {this.props.getTimeout.status && <TimeOut onPress={() => this._handleRefresh()} name={this.props.getTimeout.code === 500 ? 'INTERNAL SERVER ERROR' : 'NETWORK ERROR'} errorCode={this.props.getTimeout.code} />}      
      </>
    );
  }

  onClickEdit() {
    const data = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phone: this.state.phone,
    }
    this.props.navigation.navigate("EditProfileScreen", data);
  }

  _handleRefresh() {
    console.log('refresh')
    this.props.timeout(false);
    this.getProfiles()
  }

  _onRefresh = () => {
    this.setState({isFetching: true});
    this.getProfiles();
  }

  async _handleClickLogOut() {
    const token = this.props.authToken;
    const data = {
      token: token
    };

    try {
      // this.props.loading(true);
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(`${apiUrl}/User/logout`, {}, {
          headers: {
            'Authorization': tokenizer
          }
        });

      if(response.status === 200) {
        this.props.loading(false);
        try {
          await AsyncStorage.removeItem('token');
          this.props.clearProfile();
          this.props.clearToken();
          this.props.clearMaps();
          this.props.clearCart();
          showSuccess('Logout Success');
          setTimeout(() => {
            this.props.navigation.dispatch(resetLogout); 
          }, 2000);
        } catch(e) {
          showError(e)
        }
      } else {
        this.props.loading(false);
        showError('Logout Failed')
      }

    } catch(e) {
      console.log(e.response.data);
      showError('Logout Failed');
    }
  }

  async getProfiles() {
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/User/profile`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: this.signal.token,
      });
      if(response.status === 200){
        this.props.loading(false);
        this.setState({name: response.data.data.user[0].name});
        this.setState({address: response.data.data.user[0].address});
        this.setState({email: response.data.data.user[0].email});
        this.setState({phone: response.data.data.user[0].phone});
        this.setState({gender: response.data.data.user[0].gender});
        this.setState({isFetching: false});

      } else{
        this.props.loading(false);
        showError('Fetching Data Failed');
      }

    } catch (error) {
      if (axios.isCancel(error)) {
        this.props.loading(false);
        console.log('Error: ', error.message);
      } else {
        this.props.loading(false);
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

  async componentDidMount(){
    this._isMounted = true;
    this.props.loading(true);

    if(this._isMounted === true) {
      this.getProfiles()
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.signal.cancel('Api is being canceled');
  }
}

const mapStateToProps = (state) => ({
  authToken: state.tokenReducer.authToken,
  getTimeout: state.timeoutReducer.timeout,
});

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    clearProfile: value => dispatch({ type: 'CLEAR_PROFILE'}),
    clearToken: value => dispatch({ type: 'CLEAR_TOKEN'}),
    clearMaps: value => dispatch({ type: 'CLEAR_MAPS'}),
    clearCart: value => dispatch({ type: 'CLEAR_CART'}),
    timeout: value => dispatch({ type: 'SET_TIMEOUT', value: value }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

UserProfileScreen.defaultNavigationOptions = {
  tabBarVisible: false,
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  avaCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  nameCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  rowTop: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(229,229,229)',
    paddingTop: 20,
  },
  rowBottom: {
    flexDirection: 'column',
    paddingBottom: 20,
  },
  otherCont: {
    marginBottom: 28,
  },
  headerAddress: {
    textAlign: 'center',
  },
  contentAddress: {
    textAlign: 'center',
  }
});
