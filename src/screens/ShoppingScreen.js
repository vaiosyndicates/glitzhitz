import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ImageBackground,  Dimensions } from 'react-native'
import { useDispatch } from 'react-redux';
import Accordions from '../components/Accordion';
import Accordion from 'react-native-collapsible/Accordion';
import GradientButton from '../elements/GradientButton';
import CommonStyles from '../styles/CommonStyles';
import { colors, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { showError } from '../util/ShowMessage';
import { List } from 'react-native-paper';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;

const ShoppingScreen = ({navigation}) => {
  let _isMounted = false;
  let signal = axios.CancelToken.source();
  const dispatch = useDispatch();

  const [detailServices, setDetailServices] = useState([]);

  useEffect(() => {
    _isMounted = true;

    const fetchService = async() => {
      dispatch({type: 'SET_LOADING', value: true});
      try {
        const data = {
          id_category: navigation.state.params.ids
        };

        const tokenizer = await AsyncStorage.getItem('token');
        const response = await axios.get('http://api.glitzandhitz.com/index.php/Service',{
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
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed');
        console.log(error);
      }
    }

    if(_isMounted == true){
      fetchService();

    }

    return () => {
      console.log('unmount');
      _isMounted = false;
    }

  }, [])

  return (
    <View style={styles.page}>
      <ImageBackground source={require('../../img/glitz/massageBanner.png')} style={styles.background}>
        <View style={styles.blurry}>
          <Text style={styles.pageTitle}>Body Massage</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        {detailServices.services && <Accordions datas={detailServices} />}
      </View>
      <View style={[CommonStyles.buttonBox, {marginBottom: spaceHeight * 0.15}]}>
      {detailServices.services && 
        <GradientButton
          onPressButton={()=> navigation.navigate('CartScreen')}
          setting={shadowOpt}
          btnText="Go To Cart"
        />
      }
      </View>
    </View>
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
