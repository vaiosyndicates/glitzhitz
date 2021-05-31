import React, { Component, useEffect } from 'react';
import * as Font from 'expo-font';
import { Dimensions, StatusBar, View, Platform, AppRegistry, Alert } from 'react-native';
import { createNavigator, createAppContainer, addNavigationHelpers, NavigationActions, createStackNavigator } from 'react-navigation';
import ScalingDrawer from './elements/ScalingDrawer';

import LeftMenu from './components/LeftMenu';
import HealerRouter from './routes/IntroStack';
import { Provider, useSelector } from 'react-redux';
import store from './redux';
import Loading from './components/loading';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigationService from './util/Navigator';
import PushNotification from 'react-native-push-notification'


const {width, height} = Dimensions.get('window');

const defaultScalingDrawerConfig = {
  scalingFactor: 0,
  minimizeFactor: 0,
  swipeOffset: 0
};

class CustomDrawerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /** Active Drawer Swipe **/
    if (nextProps.navigation.state.index === 0)
      this._drawer.blockSwipeAbleDrawer(false);

    if (
      nextProps.navigation.state.index === 0
      && this.props.navigation.state.index === 0
    ) {
      this._drawer.blockSwipeAbleDrawer(false);
      this._drawer.close();
    }

    /** Block Drawer Swipe **/
    if (nextProps.navigation.state.index > 0) {
      this._drawer.blockSwipeAbleDrawer(true);
    }
  }

  render() {
    if (this.state.fontLoaded === false) {
      return (
        <View />
      )
    }

    const { routes, index } = this.props.navigation.state;

    const ActiveScreen = HealerRouter.getComponentForState(this.props.navigation.state);

    return (
      <>
      <ScalingDrawer
        ref={ref => this._drawer = ref}
        // content={ <LeftMenu drawer={this._drawer} navigation={this.props.navigation} /> }
        {...defaultScalingDrawerConfig}
      >
        <StatusBar backgroundColor={'transparent'} translucent />
        <View style={{ flex: 1, height: height }}>
          <ActiveScreen
            navigation={{
              ...this.props.navigation,
              state: routes[index],
              openDrawer: () => this._drawer.open(),
              closeDrawer: () => this._drawer.close(),
            }}
          />
        </View>
      </ScalingDrawer>
      </>
    )
  }
}

const AppNavigator = createNavigator(CustomDrawerView, HealerRouter, {});
const AppContainer = createAppContainer(AppNavigator);

//handle notif background. di luar ui state
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


const MainApp = () => {
  const stateLoading = useSelector(state => state.loadingReducer.loading)

  useEffect(() => {

    //foreground notif
    const unsubscribe = messaging().onMessage(async remoteMessage => {

      if(remoteMessage.data.hasOwnProperty('type')) {

         switch (remoteMessage.data.type) {
            case "Payment":

              const data = {
                id_order: parseInt(remoteMessage.data.id_order),
                flag: parseInt(remoteMessage.data.flag),
              }

              Alert.alert("Your Payment Has Been Paid", "Go To Review Order For Details", [
                { text: "OK", onPress: () => NavigationService.navigate(`${remoteMessage.data.screen}Screen`, data)}
              ]);
              // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
            break;
  
            case "Chatting":
              PushNotification.localNotification({
                channelId: "not1",
                message: remoteMessage.data.message ,
                title: remoteMessage.data.title,
                userInfo: {
                  type: remoteMessage.data.type,
                  screen: remoteMessage.data.screen,
                  trx_id: remoteMessage.data.trx_id, 
                  id_order: remoteMessage.data.id_order,
                  nama_mitra: remoteMessage.data.nama_mitra,
                  token: remoteMessage.data.device_token,
                },
              });
            break;
         
           default:
             break;
         }
      }
      // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });

    //handle notif ketika notif bar di click
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log( 'Notification caused app to open from background state:', remoteMessage, );
      if(remoteMessage.data.hasOwnProperty('type')) {
        if(remoteMessage.data.type === 'Payment') {
          const data = {
            flag: parseInt(remoteMessage.data.flag),
            id_order: parseInt(remoteMessage.data.id_order),
          }
          NavigationService.navigate('DetailOrderScreen', data);
        } else {
          console.log('failed')
        }
      }
    });

    // componen unmount
    requestUserPermission();

    return unsubscribe;
  }, []);

  const requestUserPermission = async() => {
    const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        getFcmToken();
        console.log('Authorization status:', authStatus);
      }
  }

  const getFcmToken = async() => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
     await AsyncStorage.setItem('fcmToken', fcmToken);
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  return (
    <>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      {stateLoading && <Loading />}
      <FlashMessage position="top" />
    </>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  )
};
