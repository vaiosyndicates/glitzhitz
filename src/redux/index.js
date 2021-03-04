import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { combineReducers, createStore } from 'redux'
import profileReducer from './profile'
import tokenReducer from './token'
import loadingReducer from './loading'

const reducer =  combineReducers({
  profileReducer,
  tokenReducer,
  loadingReducer,
})
const store = createStore(reducer)
export default store
