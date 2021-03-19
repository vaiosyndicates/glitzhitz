import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground,  Dimensions } from 'react-native'
import Accordions from '../components/Accordion';
import { colors, fontFamily, fontSize } from '../styles/variables'

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const ShoppingScreen = ({navigation}) => {
  const [data, setData] = useState({
    data: [
      {
        name: 'Reflexology',
        subService: [
          {id: 1, name: 'Men Reflexology', price: 20000},
          {id: 2, name: 'Women Reflexology', price: 25000},
        ]
      },
      {
        name: 'Back Theraphy',
        subService: [
          {id: 3, name: 'Men Back Theraphy', price: 20000},
          {id: 4, name: 'Women Back Theraphy', price: 25000},
        ]
      },
      {
        name: 'Full Body Massage',
        subService: [
          {id: 5, name: 'Men Full Body', price: 20000},
          {id: 6, name: 'Women Full Body', price: 25000},
        ]
      },
    ]
  });

  return (
    
    <View style={styles.page}>
      <ImageBackground source={require('../../img/glitz/massageBanner.png')} style={styles.background}>
        <View style={styles.blurry}>
          <Text style={styles.pageTitle}>Body Massage</Text>
        </View>
      </ImageBackground>
      <View style={styles.content}>
        <Accordions datas={data}/>
      </View>
    </View>
  )
}

export default ShoppingScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    paddingTop: 14,
  },
  background: {
    height: 200,
    paddingTop: 30,
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
