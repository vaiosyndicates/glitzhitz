import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';

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
    }
  }

  render() {
    return (
      <View style={styles.page}>
       <HeaderGradient title="User Profile" onPress={()=> this.props.navigation.goBack(null)} dMarginLeft={0.20} />
        <ScrollView style={CommonStyles.scrollView}>
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
                url: require('../../img/glitz/logout.png'),
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

  async _handleClickLogOut() {
    const token = this.props.authToken;
    const data = {
      token: token
    };

    try {
      this.props.loading(true);
      const response =  await axios.post(
        'http://api.glitzandhitz.com/index.php/User/add', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );

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
      console.log(e);
      showError('Logout Failed');
    }
  }

  async componentDidMount(){
    this._isMounted = true;
    this.props.loading(true);

    if(this._isMounted === true) {
      try {

        const tokenizer = await AsyncStorage.getItem('token');
        const response = await axios.get('http://api.glitzandhitz.com/index.php/User/profile', {
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
          console.log(error);
          showError('Failed');
        }
        
      }
    }

  }

  componentWillUnmount() {
    this._isMounted = false;
    this.signal.cancel('Api is being canceled');
  }
}

const mapStateToProps = (state) => ({
  authToken: state.tokenReducer.authToken
});

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    clearProfile: value => dispatch({ type: 'CLEAR_PROFILE'}),
    clearToken: value => dispatch({ type: 'CLEAR_TOKEN'}),
    clearMaps: value => dispatch({ type: 'CLEAR_MAPS'}),
    clearCart: value => dispatch({ type: 'CLEAR_CART'}),
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
