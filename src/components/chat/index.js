import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import IsMe from './IsMe'
import IsSender from './IsSender'

const ChatItem = ({isSender, text, date, photo, id}) => {
  if(isSender){
    return <IsMe date={date} text={text} id={id} />
  } else {
    return <IsSender text={text} date={date} id={id} photo={photo} />

  }  
}

export default ChatItem

const styles = StyleSheet.create({})
