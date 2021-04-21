import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import CustomTabBar from '../components/CustomTabBar'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth } from '../styles/variables'
import { showError } from '../util/ShowMessage'
import { useDispatch, useSelector } from 'react-redux'

const ActivityScreen = ({navigation}) => {
  let _isMounted = false
  let signal = axios.CancelToken.source();
  const [data, setData] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    _isMounted = true

    if(_isMounted) {
      // const data = {
      //   order: [
      //     {trx_id: 1, status: 'Completed', order_time: '11-01-2011' },
      //     {trx_id: 2, status: 'Completed', order_time: '11-01-2011' },
      //     {trx_id: 3, status: 'Completed', order_time: '11-01-2011' },
      //     {trx_id: 4, status: 'Completed', order_time: '11-01-2011' },
      //     {trx_id: 5, status: 'Completed', order_time: '11-01-2011' },
      //     {trx_id: 6, status: 'Completed', order_time: '11-01-2011' },
      //   ]
      // }
      // setData(data)
      getOrder()
    }

    return () => {
     _isMounted = false
    }
  }, [])

  const getOrder = async() => {
    dispatch({type: 'SET_LOADING', value: true});
    try {
      const tokenizer = await AsyncStorage.getItem('token')
      const response = await axios.get('http://api.glitzandhitz.com/index.php/User/order', {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
      });
      
      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        setData(response.data.data);
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed Get Data')
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log('Error: ', error.message);
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error);
      }
    }
  }

  const SetFlat = ({datas, idx}) => {
    return (
      <View style={styles.listData}>
        <View style={styles.headers}>
          <View style={styles.mitraSection}>
            <View>
              <Image 
                source={{uri: 'https://reactjs.org/logo-og.png'}}
                style={styles.avatar} />
            </View>
            <View style={styles.mitraInfo}>
              <Text>Hala Madrid</Text>
              <Text>{datas.trx_id}</Text>
            </View>
            
          </View>
          <View style={styles.descSection}>
            <Text style={styles.descStatus}>{datas.status}</Text>
            <Text style={styles.descText}>{datas.order_time}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => handleDetail()} style={styles.buttons}>
              <Text style={styles.textButton}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  const handleDetail = () => {
    console.log('tes');
  }


  return (
    <View style={styles.container}>
      <HeaderGradient title="Activity" dMarginLeft={0.28} onPress={() => navigation.goBack(null)} />
      <View style={styles.page}>
        <View style={styles.box}>
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.textStyleImage}>
                  Mitra
              </Text>
            </View>
            <View>
              <Text style={styles.textStyleDesc}>
                  Description
              </Text>
            </View>
            <View></View>
          </View>
          {data.hasOwnProperty('order') &&
            
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.order}
              initialNumToRender={data.order.length}
              keyExtractor={item => item.trx_id.toString()}
              ItemSeparatorComponent={renderSeparator}
              style={styles.flatList}
              renderItem={({item, index}) => {
                return <SetFlat datas={item} idx={index} />
              }}
            />
          }
        </View>
      </View>
      <CustomTabBar
          navigation={navigation}
          isActive='tabTwo'
        />
    </View>
  )
}

export default ActivityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  page: {
    flex: 1,
    position:'relative',
  },
  headerFooterStyle: {
    flexDirection: 'row',
    backgroundColor: '#606070',
  },
  textStyleImage: {
    color: '#000',
    fontSize: 18,
    paddingVertical: 7,
    marginLeft: deviceWidth * 0.05,
  },
  textStyleDesc: {
    color: '#000',
    fontSize: 18,
    paddingVertical: 7,
    marginLeft: deviceWidth * 0.15,
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descSection: {
    flexWrap: 'wrap',
  },
  descText: {
    maxWidth: deviceWidth * 0.20,
  },
  avatar: {
    width: deviceWidth * 0.14,
    height: deviceHeight * 0.07,
    borderRadius: deviceWidth * 0.14 / 2  ,
  },
  box: {
    marginHorizontal: deviceWidth * 0.05,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    elevation: 2,
    marginTop: deviceHeight * 0.10,
  },
  flatList: {
    paddingHorizontal: deviceWidth * 0.02,
    height: deviceHeight * 0.35,
    flexGrow: 0,
  },
  headerSection: {
    flexDirection: 'row',
    backgroundColor: '#DEB2FF',
    justifyContent: 'space-between',
    borderRadius: 7,

  },
  listData: {
    marginTop: deviceHeight * 0.02,
    marginBottom: deviceHeight * 0.02,
  },
  mitraSection: {
    flexDirection: 'row',
  },
  mitraInfo: {
    marginLeft: deviceWidth * 0.02,
    marginTop: deviceHeight * 0.01,
  },
  buttons: {
    backgroundColor: '#DD70F8',
    height: deviceHeight * 0.04,
    width: deviceWidth * 0.11,
    borderRadius: 10,
  },
  textButton: {
    textAlign: 'center',
    marginTop: deviceHeight * 0.01,
  }
})
