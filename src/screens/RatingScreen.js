import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  Alert,
  BackHandler,
} from 'react-native'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize } from '../styles/variables'
import { Rating, AirbnbRating } from 'react-native-ratings'
import { LinearGradient } from 'expo-linear-gradient'
import { resetLogin } from '../util/ResetRouting'
import { showError, showSuccess } from '../util/ShowMessage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { apiUrl } from '../util/API'

const RatingScreen = ({navigation}) => {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Please Rate Our Mitra", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => navigation.dispatch(resetLogin)}
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
   
    return () => backHandler.remove();
  }, [])

  const onComplete = async(rating) => {
    setRating(rating);

    const data = {
      id_order: navigation.state.params.id_order,
      rate: rating
    }
    // console.log(data)
    try {
      const tokenizer = await AsyncStorage.getItem('token');
      const response = await axios.post(
        `${apiUrl}/User/rate_mitra`, data, {
          headers: {
            Accept: 'application/json',
            Authorization: tokenizer,
          }
        }
      );

      switch (response.status) {
        case 200:
          showSuccess('Thank You For Your Feedback');
          setTimeout(() => {
            navigation.dispatch(resetLogin); 
          }, 2000);
          break;
      
        default:
          showError('Bad Response From Server')
          break;
      }

    } catch (error) {
      showError(error.message)
    }

  }

  const updateRating = async() => {
    //endpoint
    const data = {
      id_order: name,
      rate: rating
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
         <LinearGradient
            colors={['#FF5ED2', '#E200CC', '#7A0189', '#350057' ]}
            style={styles.linearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.contentWrapper}>
                <View style={styles.mitraSection}>
                  <View style={styles.reviewSection}>
                    <Text style={styles.rateTitle}>RATE OUR MITRA</Text>
                  </View>
                  <View style={styles.imageSection}>
                    <Image
                      source={require('../../img/glitz/users_white.png')}
                      style={styles.avatar} />
                  </View>
                  <View style={styles.nameSection}>
                    <Text style={styles.mitraName}>{navigation.state.params.namaMitra}</Text>
                  </View>
                </View>
                <View style={styles.ratingSection}>
                  <AirbnbRating
                    count={5}
                    reviews={["Terrible", "Bad", "OK", "Good", "Very Good"]}
                    defaultRating={3}
                    size={20}
                    unSelectedColor={colors.blurry}
                    selectedColor={colors.white}
                    reviewColor={colors.white}
                    onFinishRating={onComplete}
                  />
                </View>
              </View>
          </LinearGradient>
      </View>
    </View>
  )
}

export default RatingScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex:1,
  },
  contentWrapper: {
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    width: deviceWidth * 0.36,
    height: deviceHeight * 0.18,
    borderRadius: deviceWidth * 0.36 / 2 ,
    marginLeft: deviceWidth * 0.10,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight,
    width: deviceWidth,
    flex:1,
  },
  mitraName: {
    textAlign: 'center',
    fontFamily: fontFamily.medium,
    fontSize: fontSize.header,
    color: colors.white,
  },
  imageSection: {
    paddingBottom: deviceHeight * 0.02,
  },
  rateTitle: {
    color: colors.white,
    fontSize: fontSize.title,
    fontFamily: fontFamily.medium,
  },
  reviewSection: {
    paddingBottom: deviceHeight * 0.04,
  }
})
