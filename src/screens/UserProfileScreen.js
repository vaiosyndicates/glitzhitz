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
class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          menu
          titleText='Profile'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/settings.png'),
                buttonAction: this.onClickSettingButton.bind(this),
                buttonWidth: 22,
                buttonHeight: 22,
              }
            ]
          }
        />
        <ScrollView style={CommonStyles.scrollView}>
          <View style={styles.avaCont}>
            <Image
              source={require('../../img/person/avatar_2.png')}
              style={{width: 160, height: 160}}
            />
          </View>
          <View style={styles.nameCont}>
            <Text header black mediumBold>Willie Wright</Text>
          </View>
          <View style={CommonStyles.itemWhiteBox}>
            <View style={styles.rowTop}>
              <ProfileCard
                header='Age'
                content='48'
                unit='years'
                hasPaddingTop={false}
              />
              <ProfileCard
                header='Blood'
                content='AB'
                unit=''
                hasPaddingTop={false}
              />
              <ProfileCard
                header='Gender'
                content='Female'
                unit=''
                hasPaddingTop={false}
                hasBorderRight={false}
              />
            </View>
            <View style={styles.rowBottom}>
              <ProfileCard
                header='Height'
                content='198'
                unit='cm'
              />
              <ProfileCard
                header='Weight'
                content='66'
                unit='kg'
              />
              <ProfileCard
                header='Goal'
                content='78'
                unit='%'
                hasBorderRight={false}
              />
            </View>
          </View>
          <View style={styles.otherCont}>
            <ItemWithDetail
              image={{
                url: require('../../img/healer/target.png'),
                width: 26,
                height: 26
              }}
              header='Goal Settings'
              onPressItem={this._handleClickGoalSettings.bind(this)}
            />
            <ItemWithDetail
              image={{
                url: require('../../img/healer/heart.png'),
                width: 26,
                height: 23.5 
              }}
              header='Doctor Favorites'
              onPressItem={this._handleClickDoctorFavorites.bind(this)}
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

  onClickSettingButton() {
    this.props.navigation.navigate("SettingsScreen");
  }

  // Go to GoalSettingsScreen 
  _handleClickGoalSettings() {
    this.props.navigation.navigate("GoalSettingsScreen");
  }

  // Go to DoctorFavoritesScreenr
  _handleClickDoctorFavorites() {
    this.props.navigation.navigate("DoctorFavoritesScreen");
  }

  // Go to InsurranceScreen 
  _handleClickInsurrance() {
    this.props.navigation.navigate("InsurranceScreen");
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
}

const mapStateToProps = (state) => ({
  authToken: state.tokenReducer.authToken
});

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    clearProfile: value => dispatch({ type: 'CLEAR_PROFILE'}),
    clearToken: value => dispatch({ type: 'CLEAR_TOKEN'})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileScreen);

UserProfileScreen.defaultNavigationOptions = {
  tabBarVisible: false,
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    paddingBottom: 20,
  },
  otherCont: {
    marginBottom: 28,
  },
});
