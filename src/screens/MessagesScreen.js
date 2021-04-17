import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomTabBar from '../components/CustomTabBar'
import HeaderGradient from '../components/Header'
import ListChat from '../components/ListChat'
import { colors } from '../styles/variables'
import Fire from '../util/FirebaseConfig'

const MessagesScreen = ({navigation}) => {
  let _isMounted = false
  const [history, setHistory] = useState([])
  const profile = useSelector(state => state.profileReducer.profile)
  let id = profile.id

  useEffect(() => {
    const urlHistory = `messages/${id}`;
    const rootDB = Fire.ref();
    const messagesDB = rootDB.child(urlHistory);

    let _isMounted = true

    if(_isMounted == true) {
      Fire.ref(urlHistory)
      .on('value', snapshot => {
        if(snapshot.val()){
          const oldData = snapshot.val();
          const newData = [];

          Object.keys(oldData).map(item => {
            newData.push({
              id: item,
              data: oldData[item],
            });
          })
          setHistory(newData)
        }
      });
    }

    return () => {
      _isMounted = false
    }
  }, [])

  return (
    <View style={styles.page}>
      <HeaderGradient title="Message" dMarginLeft={0.25} onPress={() => navigation.goBack(null)} />
      <View style={styles.container}>
        {console.log(history)}
        {history.length> 0 && history.map((cur, i) => {
          return(
            <ListChat name="Test" excerpt={cur.data.lastContentChat} onPress={()=> navigation.navigate('ChattingScreen')} />
          )
        })}
        <ListChat name="Test" excerpt="Lorem ipsum dolor sit amet" onPress={()=> navigation.navigate('ChattingScreen')} />
      </View>
      <CustomTabBar
        navigation={navigation}
        isActive='tabTwo'
      />
    </View>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  }
})
