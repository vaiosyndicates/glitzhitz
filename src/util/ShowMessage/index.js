import { showMessage } from "react-native-flash-message";
import { colors } from "../../styles/variables";

export const showError = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.alert,
    color: colors.white,
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'default',
    backgroundColor: colors.violet1,
    color: colors.white,
  });
};