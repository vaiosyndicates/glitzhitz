import React, { Component } from 'react';
import {View, StatusBar, TouchableOpacity, Text} from 'react-native';
import ScalingDrawer from 'react-native-scaling-drawer-improved';
import { addNavigationHelpers } from 'react-navigation';
import LeftMenu from './LeftMenu';

let defaultScalingDrawerConfig = {
  scalingFactor: 0.6,
  minimizeFactor: 0.6,
  swipeOffset: 20
};

export default class DrawerView extends Component {
  constructor(props) {
    console.log("MINHDEBUG", props);
    super(props);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    /** Active Drawer Swipe **/
    if (nextProps.navigation.state.index === 0) {
      this._drawer.blockSwipeAbleDrawer(false);
    }

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
    const {routes, index} = this.props.navigation.state;
    const ActiveScreen = this.props.router.getComponentForState(
      this.props.navigation.state
    );

    return (
      <ScalingDrawer
        ref={ref => this._drawer = ref}
        content={<LeftMenu navigation={this.props.navigation}/>}
        {...defaultScalingDrawerConfig}
        onClose={() => console.log('close')}
        onOpen={() => console.log('open')}
      >
        <ActiveScreen
          navigation={addNavigationHelpers({
            ...this.props.navigation,
            state: routes[index],
            openDrawer: () => this._drawer.open(),
          })}
        />
      </ScalingDrawer>
    )
  }
}
