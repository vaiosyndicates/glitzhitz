import {
  Dimensions,
  Platform
} from 'react-native';

const NAV_HEIGHT = 45;
const TAB_HEIGHT = 50;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const shadowOpt = {
  btnWidth: deviceWidth - 55,
  btnHeight: 45
}

// Only for FindDoctors, FindHospital, Appointment screens
const spaceHeight = deviceHeight -  375 - 45;
// Only for Intro screens
const introSpaceHeight = deviceHeight - 364;

// Common gradient colors
const blueGradient = {
  colors: ['rgb(75,102,234)', 'rgb(130,160,247)'],
  colorsStart: {x: 0.2, y: 0.4},
  colorsEnd: {x: 1.0, y: 1.0}
}

const colors = {
  white: '#fff',
  black: 'rgb(19,19,19)',
  black2: 'rgba(0,0,0,0.5)',
  darkWhite: 'rgba(255,255,255,0.6)',
  grey: 'rgb(105,105,105)',
  lightGrey: 'rgb(150,150,150)',
  softBlue: 'rgb(75,102,234)',
  darkSkyBlue: 'rgb(63,103,230)',
  periBlue: 'rgb(79,109,230)',
  red: 'rgb(255,16,0)',
  borderColor: 'rgb(229,229,229)',
  borderViolet: '#bb5fff',
  alert: '#E06379',
  green1: '#0BCAD4',
  violet1: '#7224AC',
} 

const fontFamily = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  extraBold: 'Poppins-Bold',
}


let fontSize = {
  extraLarge: 32,
  title: 30,
  region: 22,
  header: 18,
  itemHeader: 17,
  medium: 16,
  normal: 15,
  small: 13
}

let lineHeight = {
  title: 38,
  header: 30,
  itemHeader: 29,
  normal: 23,
  small: 30
}

if (deviceWidth <= 320) {
  fontSize = {
    extraLarge: 27,
    title: 20,
    header: 16,
    itemHeader: 14,
    medium: 12,
    normal: 11,
    small: 10
  }

  lineHeight = {
    title: 28,
    header: 20,
    itemHeader: 19,
    normal: 13,
    small: 20
  }
}

export {
  NAV_HEIGHT,
  TAB_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  deviceWidth,
  shadowOpt,

  spaceHeight,
  introSpaceHeight,

  blueGradient,
  colors,
  fontSize,
  fontFamily,
  lineHeight,
};
