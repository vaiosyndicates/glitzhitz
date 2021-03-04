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

const {width, height} = Dimensions.get('window');

const defaultScalingDrawerConfig = {
  scalingFactor: 0.8,
  minimizeFactor: 0.7,
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
      <ScalingDrawer
        ref={ref => this._drawer = ref}
        content={ <LeftMenu drawer={this._drawer} navigation={this.props.navigation} /> }
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
