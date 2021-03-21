import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { combineReducers, createStore } from 'redux'
import profileReducer from './profile'
import tokenReducer from './token'
import loadingReducer from './loading'
import cartReducer from './cart'
import mapsReducer from './maps'

const reducer =  combineReducers({
  profileReducer,
  tokenReducer,
  loadingReducer,
  cartReducer,
  mapsReducer,
})
const store = createStore(reducer)
export default store
