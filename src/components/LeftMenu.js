import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions, TouchableHighlight, Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';
import CommonStyles from '../styles/CommonStyles';
import { deviceWidth, deviceHeight, colors, fontSize, fontFamily } from '../styles/variables';

const resetAction = (routeName) => NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: routeName, drawer: 'close'}),
  ]
});

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  onNavigate(route) {
    this.props.navigation.dispatch(resetAction(route))
  }

  render() {
    let isActive = '';

    return (
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Image
              source={require('../../img/person/avatar.png')}
              style={{width: 70, height: 70}}
            />
          </View>
          <Text style={styles.name}>
            OSCAR BARRETT
          </Text>
          <Text style={styles.balance}>
            Balance: $1,359.00
          </Text>
        </View>

        <View style={styles.menu}>
          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickHome.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'home') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'home' && styles.activeMenuText
                ]}
              >
                HOME
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDrug.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'drug') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'drug' && styles.activeMenuText
                ]}
              >
                DRUG
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDoctors.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'doctors') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'doctors' && styles.activeMenuText
                ]}
              >
                DOCTORS
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickServices.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'services') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'services' && styles.activeMenuText
                ]}
              >
                SERVICES
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickDashboard.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'dashboard') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'dashboard' && styles.activeMenuText
                ]}
              >
                DASHBOARD
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickProfile.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'profile') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'profile' && styles.activeMenuText
                ]}
              >
                PROFILE
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor='#efefef'
            style={styles.itemBox}
            onPress={ this._handleClickNewHealthy.bind(this) }>
            <View style={styles.itemBox}>
              {
                (() => {
                  if (isActive == 'newHealthy') {
                    return (
                      <View style={styles.activeItem} />
                    )
                  }
                })()
              }
              <Text
                style={[
                  styles.menuText,
                  isActive == 'newHealthy' && styles.activeMenuText
                ]}
              >
                NEW HEALTHY
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemBox}
          >
            <Text style={styles.menuText}>LOG OUT</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // PRIVATE
  _handleClickHome() {
    this.setState({isActive:'home'});
    this.props.navigation.navigate('MainServiceScreen');
    this.props.drawer.close()
  }

  _handleClickDrug() {
    this.setState({isActive:'drug'});
    this.props.navigation.navigate('DrugScreen');
    this.props.drawer.close()
  }

  _handleClickDoctors() {
    this.setState({isActive:'doctors'});
    this.props.navigation.navigate('ListDoctorsScreen');
    this.props.drawer.close()
  }

  _handleClickDashboard() {
    this.setState({isActive:'dashboard'});
    this.props.navigation.navigate('DashboardTestIndicatorsScreen');
    this.props.drawer.close()
  }

  _handleClickProfile() {
    this.setState({isActive:'profile'});
    this.props.navigation.navigate('UserProfileScreen');
    this.props.drawer.close()
  }

  _handleClickServices() {
    this.setState({isActive:'services'});
    this.props.drawer.close()
  }

  _handleClickNewHealthy() {
    this.setState({isActive:'newHealthy'});
    this.props.navigation.navigate('HealerBlogsScreen');
    this.props.drawer.close()
  }
}

const ELEMENT_HEIGHT = 530;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: deviceWidth - 70,
    backgroundColor: '#fff',
  },
  userInfo: {
    height: 130,
    marginTop: spaceHeight * 0.46, 
    marginBottom: spaceHeight * 0.35, 
    paddingLeft: 30,
    paddingRight: 30,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 200,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.6)',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 0.1 
      },
      android: {
        elevation: 12,
      },
    }),
  },
  name: {
    marginTop: 15,
    marginBottom: 5,
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
  },
  balance: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  menu: {
    height: 400,
  },
  itemBox: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
  },
  activeItem: {
    width: 5,
    height: 45,
    marginLeft: 0.2,
    backgroundColor: 'rgb(75,102,234)',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1 
      },
      android: {
        elevation: 12,
      },
    }),
  }, 
  menuText: {
    marginLeft: 30,
    color: 'rgb(150,150,150)',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
  activeMenuText: {
    color: 'rgb(130,160,246)',
  },
});

export default LeftMenu;
