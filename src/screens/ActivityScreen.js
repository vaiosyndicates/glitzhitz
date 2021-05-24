import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image, 
  TouchableOpacity
} from 'react-native'
import CustomTabBar from '../components/CustomTabBar'
import HeaderGradient from '../components/Header'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../styles/variables'
import { showError } from '../util/ShowMessage'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-native-paper';
import {apiUrl} from '../util/API'

const ActivityScreen = ({navigation}) => {
  let _isMounted = false
  let signal = axios.CancelToken.source();
  const [data, setData] = useState([])
  const [visibilty, setVisibility] = useState(false)
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    _isMounted = true

    if(_isMounted === true) {
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
      const response = await axios.get(`${apiUrl}/User/order`, {
        headers: {
          Authorization: tokenizer,
        },
        cancelToken: signal.token,
      });
      
      if(response.status === 200) {
        dispatch({type: 'SET_LOADING', value: false});
        // console.log(response.data.data.order.length)
        setData(response.data.data);
      } else {
        dispatch({type: 'SET_LOADING', value: false});
        showError('Failed Get Data')
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        dispatch({type: 'SET_LOADING', value: false});
        console.log('Error: ', error.message);
        dispatch({type: 'SET_LOADING', value: false});
        console.log(error);
      }
    }
  }

  const SetFlat = ({datas, idx}) => {
      const item = [];
      const payWith = {
        status: datas.status,
        payment_icon: datas.payment_icon,
        payment_code: datas.payment_code,
      }
      const paySections = [payWith];

      Object.keys(datas.item).map(key => {
      item.push(
        datas.item[key],
      );
    });
    // console.log(paySections);

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
              <Text>{datas.trx_id.slice(8, 20)}</Text>
            </View>
            
          </View>
          <View style={styles.descSection}>
            <Text style={styles.descStatus}>{datas.status.slice(0, 15).concat('...')}</Text>
            <Text style={styles.descText}>{datas.order_time}</Text>
          </View>
          <View style={styles.buttonsGroup}>
            <TouchableOpacity onPress={() => handleDetail({date_order: datas.order_time, status: datas.status, address: datas.address, trx_id: datas.trx_id, item: item, total_price: datas.total_price, payment_icon: datas.payment_icon, id_order: datas.id_order, payment: paySections})} style={styles.buttons}>
              <Text style={styles.textButton}>Detail</Text>
            </TouchableOpacity>
            {datas.status !== 'Completed' && datas.status !== 'Canceled' &&
              <Button icon={require('../../img/glitz/chats.png')} mode="outlined" style={styles.buttonsChat} onPress={() => handleChat({id_mitra: datas.android_device_id_mitra, nama_mitra: datas.nama_mitra, trx_id: datas.trx_id, id_order: datas.id_order}) } />
            }
          </View>
        </View>
      </View>
    )
  }

  const EmptyOrder = () => {
    return (
      <View style={styles.emptySection}>
        <Text style={styles.emptyText}>No Data Available</Text>
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

  const handleDetail = (obj) => {
    // console.log(obj)
    navigation.navigate('DetailActivityScreen', obj);
    // navigation.navigate('DetailOrderScreen');

  }

  const handleChat = (obj) => {
    const data = {
      id_mitra: obj.id_mitra,
      nama_mitra: obj.nama_mitra,
      trx_id: obj.trx_id,
      id_order: obj.id_order,
    }
    navigation.navigate('ChattingScreen', data);
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
              ListEmptyComponent={EmptyOrder()}
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
    height: deviceHeight * 0.45,
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
  },
  buttonsChat: {
    borderWidth: 0,
  },
  buttonsGroup: {
    width: deviceWidth * 0.15, 
    alignItems: 'center',
  },
  emptySection: {
    marginTop: deviceHeight * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
    color: colors.lightGrey,
  }
})
