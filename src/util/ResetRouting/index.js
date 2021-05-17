import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'SignInScreen' })],
});

const resetLogin = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'MainServiceScreen' })],
});

const resetActivity= StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'ActivityScreen' })],
});

const resetLogout = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'GetStartedScreen' })],
});
export {resetAction, resetLogin, resetLogout, resetActivity}
