import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { combineReducers, createStore } from 'redux'
import profileReducer from './profile'
import tokenReducer from './token'
import loadingReducer from './loading'
import cartReducer from './cart'
import mapsReducer from './maps'
import serviceReducer from './service'
import orderReducer from './order'

const reducer =  combineReducers({
  profileReducer,
  tokenReducer,
  loadingReducer,
  cartReducer,
  mapsReducer,
  serviceReducer,
  orderReducer,
})
const store = createStore(reducer)
export default store
