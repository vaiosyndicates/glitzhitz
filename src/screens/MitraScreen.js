import React, { useEffect } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { colors, deviceHeight, deviceWidth, fontFamily, fontSize, shadowOpt } from '../styles/variables'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Button } from 'react-native-paper';
import GradientButton from '../elements/GradientButton';
import { resetActivity, resetLogin } from '../util/ResetRouting';

const MitraScreen = ({navigation}) => {

  useEffect(() => {
    console.log(navigation.state.params)

    const backAction = () => {
      navigation.dispatch(resetLogin)
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();

  }, [])

  const handleActivity = () => {
    navigation.dispatch(resetActivity); 
    // console.log(navigation.state.params.item)
  }

  const handleChat = () => {
    const data = {
      id_mitra: navigation.state.params.idMitra,
      nama_mitra: navigation.state.params.namaMitra,
      trx_id: navigation.state.params.trxID,
      id_order: navigation.state.params.id_order,
      flag: 5,
      token: navigation.state.params.token,
    }
    // console.log(data);


    navigation.navigate('ChattingScreen', data);
    // console.log(data);
  }

  const fullDate = navigation.state.params.serviceTime;
  const split = fullDate.split(' ');
  const date = split[0];
  const time = split[1];

  return (
    <View style={styles.page}>
      <LinearGradient
        colors={colors.gradient}
        style={styles.linearGradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View style={styles.container}>
          <View style={styles.contentWrapper}>
            <View style={styles.contentHeader}>
              <Text style={styles.pageTitle}>Hi! We Confirm Your Booking </Text>
            </View>
            <View style={styles.mitraSection}>
              <View>
                <Image
                  // source={require('../../img/glitz/users.png')}
                  source={{uri: navigation.state.params.ava_mitra}}
                  style={styles.avatar} />
              </View>
              <View>
                <Text style={styles.mitraName}>{navigation.state.params.namaMitra}</Text>
                <Text style={styles.mitraSpeciality}>{navigation.state.params.speciality}</Text>
              </View>
            </View>
            <View style={styles.ratingSection}>
              <AirbnbRating
                reviews={[]}
                count={5}
                defaultRating={navigation.state.params.rating}
                size={15}
                isDisabled={true}
                showRating={false}
                readonly
              />
            </View>
            <View style={styles.buttonSection}>
              <Button icon={require('../../img/glitz/chats.png')} mode="contained" labelStyle={styles.labelButton} style={styles.buttonsChat} onPress={() => handleChat()}>
               Chat Mitra
              </Button>
            </View>

            <View style={styles.dateSection}>
              <View style={styles.dateHeader}>
                <Text style={styles.dateTitle}>DATE AND TIME</Text>
              </View>
              <View style={styles.dateContent}>
                <View>
                  <View>
                    <Text style={styles.dateHeader}>DATE</Text>
                  </View>
                  <View></View>
                  <View>
                    <Text style={styles.timeHeader}>TIME</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={styles.date}>{date}</Text>
                  </View>
                  <View></View>
                  <View>
                  <Text style={styles.time}>{time}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.pricSection}>
              <View style={styles.priceHeader}>
                <Text style={styles.amountTitle}>AMOUNT</Text>
              </View>
              
              <View style={styles.priceContent}>
                {navigation.state.params.item.map((cur , i) => {
                  return (
                    <React.Fragment key={cur.id_service}>
                      <View style={styles.itemList}>
                        <View>
                          <Text style={styles.itemName}>{cur.name}</Text>
                        </View>
                        <View></View>
                        <View>
                          <Text style={styles.itemPrice}>{`Rp ${cur.price}`}</Text>
                        </View>
                      </View>
                    </React.Fragment>
                  )
                })}
              </View>
            </View>
            <View style={styles.totalSection}>
              <View style={styles.totalList}>
                <View></View>
                <View>
                  <Text style={styles.totalHeader}>TOTAL</Text>
                </View>
                <View>
                  <Text style={styles.total}>{navigation.state.params.total}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.activityButton}>
            <GradientButton
              // onPressButton={()=> setSplash()}
              // onPressButton={()=> navigation.navigate('FaspayScreen')}
              onPressButton={()=> handleActivity()}
              setting={shadowOpt}
              btnText="My Activity"
            />
          </View>

        </View>
      </LinearGradient>

    </View>
  )
}

export default MitraScreen

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: deviceHeight * 0.12,
  },
  avatar: {
    width: deviceWidth * 0.22,
    height: deviceHeight * 0.11,
    borderRadius: deviceWidth * 0.22 / 2  ,
  },
  contentWrapper: {
    // borderWidth: 0.5,
    marginHorizontal: deviceWidth * 0.05,
    paddingHorizontal: deviceWidth * 0.02,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingVertical: deviceHeight * 0.02,
    elevation: 2,
    marginTop: deviceHeight * -0.05
  },
  dateContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mitraSection: {
    alignItems: 'center',
    marginVertical: deviceHeight * 0.02,
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: deviceHeight * 0.005,
  },
  totalList: {
    flexDirection: 'row',
    justifyContent: 'space-between',   
  },
  buttonSection: {
    alignItems: 'center',
  },
  contentHeader: {
    alignItems: 'center',
    marginBottom: deviceHeight * 0.02,
  },
  pageTitle: {
    color: colors.black,
    fontFamily: fontFamily.medium,
    fontSize: fontSize.header,
  },
  mitraName: {
    color: colors.black,
    fontFamily: fontFamily.semiBold,
    fontSize: fontSize.normal,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  mitraSpeciality: {
    color: colors.black,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.small,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  buttonsChat: {
    backgroundColor: colors.chat1,
  },
  labelButton: {
    color: '#7224AC',
  },
  ratingSection: {
    marginTop: deviceHeight * -0.02,
    marginBottom: deviceHeight * 0.01,
  },
  dateSection: {
    marginVertical: deviceHeight * 0.03,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.violet2,
    paddingBottom: deviceHeight * 0.02,
  },
  dateTitle: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  amountTitle: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,   
  },
  dateHeader: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    marginVertical: deviceHeight * 0.005,
  },
  timeHeader: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    marginVertical: deviceHeight * 0.005,

  },
  date: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  time: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  itemName: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,   
  },
  itemPrice: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
  },
  totalHeader: {
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,   
  },
  total: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.semiBold,
  },
  activityButton: {
    alignItems: 'center',
    marginTop: deviceHeight * 0.05,
  },
  totalSection: {
    marginVertical: deviceHeight * 0.02,
  }
})
