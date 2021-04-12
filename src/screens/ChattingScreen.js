import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ChatItem from '../components/chat'
import HeaderGradient from '../components/Header'
import InputChat from '../components/InputChat'
import { colors, deviceHeight, fontFamily, fontSize } from '../styles/variables'
import { useSelector } from 'react-redux';
import database, { firebase } from '@react-native-firebase/database';
import Fire from '../util/FirebaseConfig'
import { chatDate, chatTime } from '../util/DateTime'
import { showError } from '../util/ShowMessage'


const ChattingScreen = ({navigation}) => {
  let _isMounted = false;
  const [chatContent, setChatContent] = useState('')
  const [mounted, setMounted] = useState(false)
  const [chat, setChat] = useState([])
  const scrollViewRef = useRef();
  const profile = useSelector(state => state.profileReducer.profile)

  const id = profile.id
  const today = new Date();

  useEffect(() => {
    _isMounted = true;
    if(_isMounted == true) {
      const id_mitra = 'dOGKQnceRm-NQPJsnAmiTh:APA91bG8_Nm9rznWeATfmsG2kenBWlAkd2OtCqO5O-uXptzwCYM5TtIYdLb7Bsx5jYqopl_Q6nFa73ItJUaucjPZf1nDa7Pso4pvVIf0kXZhKThu3JBFAMZZ_eWDId9bJ2WMUXAUdDAD';
      const chatIds = `${id}_${id_mitra}`;
      const urlChatting = `chatting/${chatIds}/allChat`;

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
            // sort desc
            newDataChat.sort(function(a, b) {
              return a.data.chatDate - b.data.chatDate;
            });
            
            AllDataChat.push({
              date: item,
              data: newDataChat,
            });
          })
          
          setChat(AllDataChat);
        }
      });
    }

    return () => {
      console.log('unmount');
      _isMounted = false;
    }
  }, [_isMounted, id])

  const handleSend = () => {
    const id_mitra = 'dOGKQnceRm-NQPJsnAmiTh:APA91bG8_Nm9rznWeATfmsG2kenBWlAkd2OtCqO5O-uXptzwCYM5TtIYdLb7Bsx5jYqopl_Q6nFa73ItJUaucjPZf1nDa7Pso4pvVIf0kXZhKThu3JBFAMZZ_eWDId9bJ2WMUXAUdDAD';
    const chatIds = `${id}_${id_mitra}`;

    const urlChatting = `chatting/${chatIds}/allChat/${chatDate(today)}`;
    const urlMessagesUser = `messages/${id}/${chatIds}`;
    const urlMessagesMitra = `messages/${id_mitra}/${chatIds}`;


    const data = {
      sendBy: id,
      chatDate: today.getTime(),
      chatTime: chatTime(today),
      chatContent: chatContent,
    };

    const dataHistoryChatUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: id_mitra,
    };

    const dataHistoryChatMitra = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: id,
    };


    Fire.ref(urlChatting)
      .push(data)
      .then(res => {
        setChatContent('')

        Fire.ref(urlMessagesUser).set(dataHistoryChatUser);
        Fire.ref(urlMessagesMitra).set(dataHistoryChatMitra);
      })
      .catch(err => {
        showError('Error');
      })
  }

  return (
      <View style={styles.page}>
        <HeaderGradient title="Chat Screen" dMarginLeft={0.20} onPress={() => navigation.goBack(null)} />
        <View style={styles.container}>
          <ScrollView vertical 
            showsVerticalScrollIndicator={false} 
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
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
                      />
                    )
                  })}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <InputChat value={chatContent} onChangeText={value => setChatContent(value)} onButtonPress={() => handleSend()} />
      </View>
  )
}

export default ChattingScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    marginTop: deviceHeight * 0.02,
  },
  date: {
    fontSize: fontSize.small,
    fontFamily: fontFamily.light,
    color: colors.black,
    textAlign: 'center',
  }
})
