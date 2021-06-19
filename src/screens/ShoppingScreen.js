import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground,  Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Accordions from '../components/Accordion';
import Accordion from 'react-native-collapsible/Accordion';
import GradientButton from '../elements/GradientButton';
import CommonStyles from '../styles/CommonStyles';
import { colors, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { showError } from '../util/ShowMessage';
import { List } from 'react-native-paper';
import {apiUrl} from '../util/API';
import { TimeOut } from '../components/molekul'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const ShoppingScreen = ({navigation}) => {
  let _isMounted = false;
  let signal = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [detailServices, setDetailServices] = useState([]);
  const count = useSelector(state => state.cartReducer.count);
  const timeout = useSelector(state => state.timeoutReducer.timeout);
  const image = {uri : navigation.state.params.image};

  useEffect(() => {
    _isMounted = true;

    if(_isMounted == true){
      fetchingService();

    }

    return () => {
      _isMounted = false;
    }

  }, [])

  const fetchingService = async() => {
    try {
      const data = {
        id_category: navigation.state.params.ids
      };

      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/Service`,{
        params: {
          id_category: navigation.state.params.ids
        },
        headers: {
            'Authorization': tokenizer
          },
        cancelToken: signal.token,
      });

      if(response.status === 200){
        dispatch({type: 'SET_LOADING', value: false});
        setDetailServices(response.data.data)
        
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        setDt([])
        showError('Failed');
      }
      
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log('Error: ', error.message);
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        dispatch({type: 'SET_TIMEOUT', value: true});
        console.log(error.data)
        if(error.hasOwnProperty('response')) {
          switch (error.response.status) {
            case 404:
              dispatch({type: 'SET_TIMEOUT', value: {code: 404, status: true}});
              break;
  
            case 405:
              dispatch({type: 'SET_TIMEOUT', value: {code: 405, status: true}});
              break;
  
            case 505:
              dispatch({type: 'SET_TIMEOUT', value: {code: 505, status: true}});
              break;

            default:
              break;
          }
        } else {
          showError(error.message)
        }
      }
    }    
  }

  const toLocation = () => {
    const data = {
      flag: 'normal'
    }
    navigation.navigate('CartScreen', data);
  };

  const handleRefresh = () => {
    dispatch({type: 'SET_TIMEOUT', value: {code: '00', status: false}});
    fetchingService()
  }

  return (
    <>
      <View style={styles.page}>
        <ImageBackground source={image} style={styles.background}>
          <View style={styles.blurry}>
            <Text style={styles.pageTitle}>{navigation.state.params.name}</Text>
          </View>
        </ImageBackground>
        <View style={styles.content}>
          {detailServices.services && <Accordions datas={detailServices} parents={navigation.state.params.name} />}
        </View>
        <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
        {detailServices.services && 
          <GradientButton
            onPressButton={()=> toLocation()}
            setting={shadowOpt}
            btnText="Go To Cart"
            disabled={count < 1 || count === undefined}
          />
        }
        </View>
      </View>
      {timeout.status && <TimeOut name='NETWORK ERROR' onPress={() => handleRefresh()} errorCode={timeout.code} />}
    </>
  )
}

export default ShoppingScreen

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: deviceHeight * 0.02,
  },
  background: {
    height: deviceHeight * 0.30,
    paddingTop: deviceHeight * 0.08,
  },
  pageTitle: {
    fontSize: fontSize.region,
    fontFamily: fontFamily.medium,
    color: colors.white,
    textAlign: 'left',
    marginTop: deviceHeight * 0.01,
    marginLeft: deviceWidth * 0.05,
  },
  blurry: {
    backgroundColor: colors.blurry,
    marginTop: deviceHeight * 0.15,
    height: deviceHeight * 0.20,
  },
});
