import React, { Component, useEffect } from 'react';
import * as Font from 'expo-font';
import { Dimensions, StatusBar, View, Platform, AppRegistry, Alert } from 'react-native';
import { createNavigator, createAppContainer, addNavigationHelpers } from 'react-navigation';
import ScalingDrawer from './elements/ScalingDrawer';

import LeftMenu from './components/LeftMenu';
import HealerRouter from './routes/IntroStack';
import { Provider, useSelector } from 'react-redux';
import store from './redux';
import Loading from './components/loading';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
<<<<<<< HEAD
=======
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> push_notif2

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
<<<<<<< HEAD
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
=======
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
>>>>>>> push_notif2
    });

    //handle notif ketika notif bar di click
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log( 'Notification caused app to open from background state:', remoteMessage, );
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
<<<<<<< HEAD
     console.log(fcmToken);
=======
     await AsyncStorage.setItem('fcmToken', fcmToken);
>>>>>>> push_notif2
     console.log("Your Firebase Token is:", fcmToken);
    } else {
     console.log("Failed", "No token received");
    }
  }

  return (
    <>
      <AppContainer />
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
