import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../../styles/variables'
import { Button } from 'react-native-paper';

const InputChat = ({value, onChangeText, onButtonPress}) => {
  return (
    <>
      <KeyboardAvoidingView keyboardVerticalOffset={deviceHeight * -0.50} behavior="padding">
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Tulis pesan"
            value={value}
            onChangeText={onChangeText}
          />
          <Button 
            icon={require('../../../img/glitz/send_able.png')} 
            disabled={value.length <= 0 ? true : false }
            labelStyle={{ fontSize: 25 }}
            mode="outlined"
            style={styles.buttons} 
            onPress={onButtonPress}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default InputChat

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  input: {
    backgroundColor: colors.lightGreyChat,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    color: colors.black,
    maxHeight: 45,
  },
  buttons: {
    borderWidth: 0,
  },
});
