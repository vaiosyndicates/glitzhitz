import React, { Component } from 'react';
import * as Font from 'expo-font';
import { Dimensions, StatusBar, View, Platform, AppRegistry } from 'react-native';
import { createNavigator, createAppContainer, addNavigationHelpers } from 'react-navigation';
import ScalingDrawer from './elements/ScalingDrawer';

import LeftMenu from './components/LeftMenu';
import HealerRouter from './routes/IntroStack';
import { Provider, useSelector } from 'react-redux';
import store from './redux';
import Loading from './components/loading';
import FlashMessage from 'react-native-flash-message';
import messaging from '@react-native-firebase/messaging';
// import firebase from '@react-native-firebase/app';
import firebase from 'react-native-firebase';

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

  async getFcmToken() {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  }

  checkNotificationPermission = () => {
    firebase
      .messaging()
      .hasPermission()
      .then(enabled => {
        console.log('enabled => '+enabled);
        if (!enabled) {
          this.promptForNotificationPermission();
        }
      });
   };

   promptForNotificationPermission = () => {
    firebase
      .messaging()
      .requestPermission({provisional: true})
      .then(() => {
        console.log('Permission granted.');
      })
      .catch(() => {
        console.log('Permission rejected.');
      });
    };
    
    createAndroidNotificationChannel() {
      const channel = new firebase.notifications.Android.Channel(
        'channelId',
        'Push Notification',
        firebase.notifications.Android.Importance.Max,
      ).setDescription('Turn on to receive push notification');
  
      firebase.notifications().android.createChannel(channel);
    }
   foregroundState = () => {
      const unsubscribe = messaging().onMessage(async notification => {
        console.log('Message handled in the foregroundState!', notification);
      });
  
      return unsubscribe;
    };
  
    // Register background handler
    backgroundState = () => {
      messaging().setBackgroundMessageHandler(async notification => {
        console.log('Message handled in the background!', notification);
      });
    };    

  async componentDidMount() {
    await Font.loadAsync({
      'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf')
    });
    this.setState({ fontLoaded: true });
    this.checkNotificationPermission();
    await messaging().requestPermission({provisional: true});
    await messaging().registerDeviceForRemoteMessages();
    await  this.getFcmToken();
    if (Platform.OS === 'android') {
      this.createAndroidNotificationChannel();
    }

    this.backgroundState();
    this.foregroundState();    
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

const MainApp = () => {
  const stateLoading = useSelector(state => state.loadingReducer.loading)
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
