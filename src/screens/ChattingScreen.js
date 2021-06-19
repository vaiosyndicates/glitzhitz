import React, { useEffect, useRef, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image,
  BackHandler,
} from 'react-native'
import ChatItem from '../components/chat'
import HeaderGradient from '../components/Header'
import InputChat from '../components/InputChat'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../styles/variables'
import { useSelector } from 'react-redux';
import database, { firebase } from '@react-native-firebase/database';
import Fire from '../util/FirebaseConfig'
import { chatDate, chatTime } from '../util/DateTime'
import { showError } from '../util/ShowMessage'
import { LinearGradient } from 'expo-linear-gradient'
import { color } from 'react-native-reanimated'
import { resetActivity } from '../util/ResetRouting'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { dataSend } from '../util/DataChat'
import { apiFirebase } from '../util/API'
import tokenCredential from '../util/Credential'
import axios from 'axios'


const ChattingScreen = ({navigation}) => {
  let _isMounted = false;
  const [chatContent, setChatContent] = useState('')
  const [mounted, setMounted] = useState(true)
  const [chat, setChat] = useState([])
  const scrollViewRef = useRef();
  const profile = useSelector(state => state.profileReducer.profile)

  const id = profile.id
  const today = new Date();

  useEffect(() => {
    console.log(navigation.state.params)
    _isMounted = true;
    setMounted(true);
    if( _isMounted === true && mounted === true ) {
      const id_mitra = navigation.state.params.id_mitra;
      const chatIds = `${navigation.state.params.trx_id}_${navigation.state.params.id_order}`;
      const urlChatting = `chatting/${chatIds}/allChat`;

      // console.log(chatIds)

      Fire.ref(urlChatting)
      .on('value', snapshot => {
        if(snapshot.val()){
          const dataSnapshot = snapshot.val();
          const AllDataChat = [];
          
          Object.keys(dataSnapshot).map(item => {
            const dataChat = dataSnapshot[item];
            const newDataChat = [];

            Object.keys(dataChat).map(key => {

              newDataChat.push({
                id: key,
                data: dataChat[key],
              });
            })
            
            newDataChat.sort(function(a, b) {
              // console.log(a.data)
              return a.data.chatDate - b.data.chatDate;
            });
            
            AllDataChat.push({
              date: item,
              data: newDataChat,
            });
          })
          AllDataChat.reverse()
          setChat(AllDataChat);
        }
      });
    }

    return () => {
      _isMounted = false;
      setMounted(false);
      // console.log(mounted)
    }
  }, [_isMounted, id])

  useEffect(() => {

    const backAction = () => {
      navigation.dispatch(resetActivity)
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, [])

  const handleSend = async() => {
    const chatIds = `${navigation.state.params.trx_id}_${navigation.state.params.id_order}`;

    const urlChatting = `chatting/${chatIds}/allChat/${chatDate(today)}`;

    const data = {
      sendBy: id,
      chatDate: today.getTime(),
      chatTime: chatTime(today),
      chatContent: chatContent,
    };

    Fire.ref(urlChatting)
      .push(data)
      .then(res => {
        setChatContent('')
      })
      .catch(err => {
        console.log(err)
        showError('Error');
      })

      if(navigation.state.params.flag === 5) {
        try {
          const tokenizer = await AsyncStorage.getItem('fcmToken');
          const sender = {
            to: navigation.state.params.token,
            trx_id: navigation.state.params.trx_id,
            id_order: navigation.state.params.id_order,
            chat_content: chatContent,
            nama_mitra: navigation.state.params.nama_mitra,
            nama_user: navigation.state.params.nama_user,
            token_receiver: navigation.state.params.token,
            token_sender: tokenizer,
          }
          const data = dataSend(sender)
          console.log('sebagai pengirim')
          // console.log(data)
          const response = await axios.post(
            apiFirebase, data, {
              headers: {
                Accept: 'application/json',
                Authorization: tokenCredential,
              }
            }
          );

        } catch (error) {
          showError('Network Error')
          console.log(error.response.data)
        }
      } else {
        try {
          const receiver = {
            to: navigation.state.params.token_sender,
            trx_id: navigation.state.params.trx_id,
            id_order: navigation.state.params.id_order,
            chat_content: chatContent,
            nama_mitra: navigation.state.params.nama_mitra,
            nama_user: navigation.state.params.nama_user,
            token_receiver: navigation.state.params.token_sender,
            token_sender: navigation.state.params.token_receiver ,
          }
          const data = dataSend(receiver)
          console.log('sebagai penerima')
          // console.log(data)

          const response = await axios.post(
            apiFirebase, data, {
              headers: {
                Accept: 'application/json',
                Authorization: tokenCredential,
              }
            }
          )
        } catch (error) {
          showError('Network Error')
          console.log(error.response.data)
        }
      }
  }

  return (
      <View style={styles.page}>
        {/* <HeaderGradient title="Chat Screen" dMarginLeft={0.20} onPress={() => navigation.goBack(null)} /> */}
        <LinearGradient
          colors={colors.gradient}
          style={styles.linearGradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}>
        <View style={styles.container}>
          <View style={styles.mitraSection}>
              <View>
                  <View>
                    {/* <Image 
                      source={require('../../img/glitz/icon-user-mitra.png')}
                      style={styles.avatar} /> */}
                  </View>
                  <View>
                    <Text style={styles.mitraName}>{navigation.state.params.nama_mitra}</Text>
                    {/* <Text style={styles.mitraSpeciality}>Indomie Special</Text> */}
                  </View>
              </View>
            </View>
          <ScrollView vertical 
            showsVerticalScrollIndicator={false} 
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: false})
            }>
            {chat.length > 0 && chat.map(cur => {
              return (
                <View key={cur.date}>
                  <Text style={styles.date}>{cur.date}</Text>
                  {cur.data.map((curr, i ) => {
                    const isMe = curr.data.sendBy === id ? true : false
                    return (
                      <ChatItem
                        isSender={isMe}
                        text={curr.data.chatContent}
                        date={curr.data.chatTime}
                        id={cur.id}
                      />
                    )
                  })}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <InputChat value={chatContent} onChangeText={value => setChatContent(value)} onButtonPress={() => handleSend()} />
        </LinearGradient>
      </View>
      
  )
}

export default ChattingScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.blurry,
  },
  container: {
    flex: 1,
    marginTop: deviceHeight * 0.12,
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  date: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.light,
    color: colors.black,
    textAlign: 'center',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  // avatar: {
  //   width: deviceWidth * 0.20,
  //   height: deviceHeight * 0.10,
  //   borderRadius: deviceWidth * 0.20 / 2 ,
  //   marginBottom: deviceHeight * 0.01,
  // },
  mitraSection: {
    alignItems: 'center',
    marginVertical: deviceHeight * 0.03,
  },
  mitraName: {
    textAlign: 'center',
    fontSize: fontSize.header,
    color: colors.black,
    fontFamily: fontFamily.regular,
  },
  mitraSpeciality: {
    textAlign: 'center',
    fontSize: fontSize.small,
    color: colors.grey,
    fontFamily: fontFamily.regular,
  }
})
