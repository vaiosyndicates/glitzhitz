import { showMessage } from "react-native-flash-message";
import { colors, fontFamily } from "../../styles/variables";
import {StatusBar} from 'react-native';

export const showError = message => {
  showMessage({
    message: `${message}`,
    type: 'default',
    backgroundColor: colors.alert,
    color: colors.white,
    textStyle: fontFamily.medium,
    floating: true,
    statusBarHeight: StatusBar.currentHeight,
    duration: 20000,
  });
};

export const showSuccess = message => {
  showMessage({
    message: `${message}`,
    type: "info",
    backgroundColor: colors.violet1,
    color: colors.white,
    textStyle: fontFamily.medium,
    floating: true,
    statusBarHeight: StatusBar.currentHeight,
  });
};