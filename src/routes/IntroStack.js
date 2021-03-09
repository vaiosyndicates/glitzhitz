import React from 'react';
import { Button, ScrollView, Text } from 'react-native';
import { StackRouter } from 'react-navigation';

import StartUpScreen from '../screens/StartUpScreen';
import IntroOneScreen from '../screens/IntroOneScreen';
import IntroTwoScreen from '../screens/IntroTwoScreen';
import IntroThreeScreen from '../screens/IntroThreeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import StartNameScreen from '../screens/StartNameScreen';
import StartBirthdayScreen from '../screens/StartBirthdayScreen';
import StartGenderScreen from '../screens/StartGenderScreen';
import StartWeightScreen from '../screens/StartWeightScreen';
import StartHeightScreen from '../screens/StartHeightScreen';
import MainServiceScreen from '../screens/MainServiceScreen';
import DrugScreen from '../screens/DrugScreen';
import ListDoctorsScreen from '../screens/ListDoctorsScreen';
import DashboardTestIndicatorsScreen from '../screens/DashboardTestIndicatorsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';

import AppointmentScreen from '../screens/AppointmentScreen';
import FindDoctorScreen from '../screens/FindDoctorScreen';
import FindHospitalScreen from '../screens/FindHospitalScreen';
import ServicePriceScreen from '../screens/ServicePriceScreen';
import AppointmentCalendarScreen from '../screens/AppointmentCalendarScreen';
import AppointmentDetailScreen from '../screens/AppointmentDetailScreen';
import ResultFindDoctorScreen from '../screens/ResultFindDoctorScreen';
import MapScreen from '../screens/MapScreen';
import DoctorDeatailsScreen from '../screens/DoctorDeatailsScreen';
import BookAppointmentScreen from '../screens/BookAppointmentScreen';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import DoctorWorkingAddressScreen from '../screens/DoctorWorkingAddressScreen';
import DoctorReviewScreen from '../screens/DoctorReviewScreen';
import CallDoctorScreen from '../screens/CallDoctorScreen';
import ChatScreen from '../screens/ChatScreen';
import ResultFindHospitalScreen from '../screens/ResultFindHospitalScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GoalSettingsScreen from '../screens/GoalSettingsScreen';
import DoctorFavoritesScreen from '../screens/DoctorFavoritesScreen';
import InsurranceScreen from '../screens/InsurranceScreen';
import ListDrugsScreen from '../screens/ListDrugsScreen';
import DrugsShopScreen from '../screens/DrugsShopScreen';
import DrugsDetailsScreen from '../screens/DrugsDetailsScreen';
import AddDrugsScreen from '../screens/AddDrugsScreen';
import DrugsShopDetailScreen from '../screens/DrugsShopDetailScreen';
import HealerBlogsScreen from '../screens/HealerBlogsScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import NewsCommentScreen from '../screens/NewsCommentScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import IndicatorsDetailsScreen from '../screens/IndicatorsDetailsScreen';
import ChangePassword from '../screens/ChangePassword';

import CartScreen from '../screens/CartScreen';
import BillingScreen from '../screens/BillingScreen';
import VerifyPhoneScreen from '../screens/VerifyPhoneScreen';
import { connect, useSelector } from 'react-redux';

const AppRouter = StackRouter(
  {
    StartUpScreen: {
      screen: StartUpScreen,
    },
    IntroOneScreen: {
      screen: IntroOneScreen,
    },
    IntroTwoScreen: {
      screen: IntroTwoScreen,
    },
    IntroThreeScreen: {
      screen: IntroThreeScreen,
    },
    SignInScreen: {
      screen: SignInScreen,
    },
    SignUpScreen: {
      screen: SignUpScreen,
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
    },
    ChangePasswordScreen: {
      screen: ChangePassword,
    },
    StartNameScreen: {
      screen: StartNameScreen,
    },
    StartBirthdayScreen: {
      screen: StartBirthdayScreen,
    },
    StartGenderScreen: {
      screen: StartGenderScreen,
    },
    StartWeightScreen: {
      screen: StartWeightScreen,
    },
    StartHeightScreen: {
      screen: StartHeightScreen,
    },
    MainServiceScreen: {
      screen: MainServiceScreen,
      path: 'main_service',
    },
    DrugScreen: {
      screen: DrugScreen,
      path: 'drug',
    },
    ListDoctorsScreen: {
      screen: ListDoctorsScreen,
      path: 'doctors',
    },
    DashboardTestIndicatorsScreen: {
      screen: DashboardTestIndicatorsScreen,
      path: 'dashboard',
    },
    UserProfileScreen: {
      screen: UserProfileScreen,
      path: 'profile',
    },
    AppointmentScreen: {
      screen: AppointmentScreen,
      path: 'appointment',
    },
    FindDoctorScreen: {
      screen: FindDoctorScreen,
      path: 'find_doctor',
    },
    FindHospitalScreen: {
      screen: FindHospitalScreen,
      path: 'find_hospital',
    },
    ServicePriceScreen: {
      screen: ServicePriceScreen,
      path: 'service_price',
    },
    AppointmentCalendarScreen: {
      screen: AppointmentCalendarScreen,
      path: 'appointment_calendar',
    },
    AppointmentDetailScreen: {
      screen: AppointmentDetailScreen,
      path: 'appointment_detail',
    },
    ResultFindDoctorScreen: {
      screen: ResultFindDoctorScreen,
      path: 'result_doctor',
    },
    MapScreen: {
      screen: MapScreen,
      path: 'result_doctor',
    },
    DoctorDeatailsScreen: {
      screen: DoctorDeatailsScreen,
      path: 'doctor_detail',
    },
    BookAppointmentScreen: {
      screen: BookAppointmentScreen,
      path: 'book_appointment',
    },
    DoctorInformationScreen: {
      screen: DoctorInformationScreen,
      path: 'doctor_info',
    },
    DoctorWorkingAddressScreen: {
      screen: DoctorWorkingAddressScreen,
      path: 'doctor_working_address',
    },
    DoctorReviewScreen: {
      screen: DoctorReviewScreen,
      path: 'doctor_review',
    },
    CallDoctorScreen: {
      screen: CallDoctorScreen,
      path: 'call_doctor',
    },
    ChatScreen: {
      screen: ChatScreen,
      path: 'chat',
    },
    ResultFindHospitalScreen: {
      screen: ResultFindHospitalScreen,
      path: 'result_hospital',
    },
    NotificationScreen: {
      screen: NotificationScreen,
      path: 'notification',
    },
    SettingsScreen: {
      screen: SettingsScreen,
      path: 'settings',
    },
    GoalSettingsScreen: {
      screen: GoalSettingsScreen,
      path: 'goal_setting',
    },
    DoctorFavoritesScreen: {
      screen: DoctorFavoritesScreen,
      path: 'doctor_favorites',
    },
    InsurranceScreen: {
      screen: InsurranceScreen,
      path: 'insurrance',
    },
    ListDrugsScreen: {
      screen: ListDrugsScreen,
      path: 'list_drugs',
    },
    DrugsShopScreen: {
      screen: DrugsShopScreen,
      path: 'drug_shop',
    },
    DrugsDetailsScreen: {
      screen: DrugsDetailsScreen,
      path: 'drugs_detail',
    },
    AddDrugsScreen: {
      screen: AddDrugsScreen,
      path: 'add_drugs',
    },
    DrugsShopDetailScreen: {
      screen: DrugsShopDetailScreen,
      path: 'drugs_shop',
    },
    HealerBlogsScreen: {
      screen: HealerBlogsScreen,
      path: 'healer_blog',
    },
    NewsDetailsScreen: {
      screen: NewsDetailsScreen,
      path: 'news_detail',
    },
    BookmarkScreen: {
      screen: BookmarkScreen,
      path: 'bookmark',
    },
    NewsCommentScreen: {
      screen: NewsCommentScreen,
      path: 'news_comment',
    },
    IndicatorsDetailsScreen: {
      screen: IndicatorsDetailsScreen,
      path: 'indicators_details',
    },
    CartScreen: {
      screen: CartScreen,
      path: 'cart'
    },
    BillingScreen: {
      screen: BillingScreen,
      path: 'billing'
    },
    VerifyPhoneScreen: {
      screen: VerifyPhoneScreen,
      path: 'verifyphone'
    },
  },
  {
    initialRouteName: 'StartUpScreen',
    headerMode: 'none',
    mode: 'card',
  }
);

export default AppRouter;
