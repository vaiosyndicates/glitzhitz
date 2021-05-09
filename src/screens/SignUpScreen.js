import React, { Component } from 'react';
import { 
  TextInput, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Platform, 
  StatusBar, 
  TouchableOpacity,
  TouchableHighlight,
  KeyboardAvoidingView ,
  Pressable,
} from 'react-native';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import CheckBox from '../elements/CheckBox';

import { deviceHeight, shadowOpt, colors, fontSize } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import StartNameScreen from './StartNameScreen';
import DeviceInfo, { getUniqueId } from 'react-native-device-info';
import axios from 'axios';
import { connect } from 'react-redux';
import { showError } from '../util/ShowMessage';
import ImageButton from '../elements/ImageButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      username: '',
      address: '',
      email: '',
      gender: 'Male',
      birth: '',
      password: '',
      isDatePickerVisible: false,
    }
  }

  render() {
    let radio_props = [
      {label: 'Male', value: 'Male' },
      {label: 'Female', value: 'Female' }
    ];
    return (
      <View style={CommonStyles.normalSinglePage}>
        <View style={styles.titleBox}>
          <Text extraLarge black extraBold>SIGN UP</Text>
        </View>
        <ScrollView contentContainerStyle={{height: deviceHeight}} showsVerticalScrollIndicator={false}>
          <View style={styles.formBox}>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Fullname'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({name: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Username'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({username: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/envelope.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 22, height: 17}}
              />
              <TextInput
                placeholder='Email'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({email: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/padlock.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 17, height: 22}}
              />
              <TextInput
                placeholder='Password'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({password: text})}
                secureTextEntry
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Phone'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                keyboardType="number-pad"
                onChangeText={text => this.setState({phone: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Image
                source={require('../../img/healer/avatar.png')}
                style={{position:'absolute',bottom: 12,left: 20,width: 19, height: 22}}
              />
              <TextInput
                placeholder='Address'
                style={CommonStyles.textInput}
                underlineColorAndroid='transparent'
                onChangeText={text => this.setState({address: text})}
              />
            </View>
            <View style={CommonStyles.textInputField}>
              <Pressable onPress={this._showDatePicker.bind(this)}>
                <TextInput
                  placeholder='Date of Birth'
                  style={CommonStyles.textInput}
                  underlineColorAndroid='transparent'
                  value={this.state.birth}
                  caretHidden={true}
                  editable={false}
                />
              </Pressable>
              <ImageButton
                appearance={{
                    normal: require("../../img/glitz/arrows2x.png"),
                    highlight: require("../../img/glitz/arrows2x.png")
                }}
                onPress={this._showDatePicker.bind(this)}
                style={styles.imageButton}
              />
            </View>
            <View style={styles.genderSection}>
              <View style={styles.headerTitle}>
                <Text style={styles.textHeader}>GENDER | </Text>
              </View>
              <View style={styles.radioSection}>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  onPress={(value) => {this.setState({gender:value})}}
                  labelStyle={{color: colors.borderViolet, paddingRight : 20, fontSize: fontSize.header}}
                  buttonColor={colors.borderViolet}
                  selectedButtonColor= {colors.borderViolet}
                  style={styles.radio}
                />
              </View>
            </View>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              onConfirm={this._handleConfirm.bind(this)}
              onCancel={this._hideDatePicker.bind(this)}
            />
          </View>
        </ScrollView>
        <View style={CommonStyles.buttonBox}>
          <GradientButton
            onPressButton={this._handleClickSignUpButton.bind(this)}
            setting={shadowOpt}
            btnText="SIGN UP"
            disabled={
              this.state.name.length < 3 ||
              this.state.username.length < 3 ||
              this.state.phone.length < 3 ||
              this.state.address.length < 3 ||
              this.state.email.length < 3 ||
              this.state.gender.length < 3 ||
              this.state.birth.length < 3 ||
              this.state.password.length < 3
                ? true
                : false
            }/>
        </View>
        <View style={styles.noteBox}>
          <Text normal lightGrey regular>
            Have an account?
            <Text> </Text>
            <Text
              style={{color: colors.softBlue}}
              onPress={() => this._handleClickSignIn()}>
              SIGN IN
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  async _handleClickSignUpButton() {
    // this.props.loading(true);
    const data = {
      name: this.state.name,
      username: this.state.username,
      phone: this.state.phone,
      address: this.state.address,
      email: this.state.email,
      gender: this.state.gender,
      password: this.state.password,
      birth: this.state.birth,
      // android_device_id: DeviceInfo.getUniqueId(),
      android_device_id: await AsyncStorage.getItem('fcmToken'),
      action: 'register',
    };
    // console.log(data);
    try {
      this.props.loading(true);
      const response = await axios.post(
        'http://api.glitzandhitz.com/index.php/User/add', data, {
          headers: {
            Accept: 'application/json',
          }
        }
      );
        
      if (response.data.status === 200) {

        this.props.loading(false);
        this.props.profile(data);
        this.props.navigation.navigate('VerifyPhoneScreen', data);

      } else {
        this.props.loading(false);
        showError(response.data.message)
      }

    } catch (error) {
      console.log(error);
      this.props.loading(false);
      showError(error.message);
    }
  }

  _handleClickSignIn() {
    // const screen = SignInScreen;
    // const params = null;
    // const path = null;
    // const { router } = screen;
    // const action = path && router.getActionForPathAndParams(path, params);

    // this.props.navigation.navigate('SignInScreen', {}, action);
    this.props.navigation.navigate('SignInScreen');
  }

  _handleConfirm(date) {
    this.setState({isDatePickerVisible: false})
    let born = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    this.setState({birth: born});
  }

  _hideDatePicker() {
    this.setState({isDatePickerVisible: false})
    this.setState({birth: ''});
  }

  _showDatePicker() {
    this.setState({isDatePickerVisible: true})
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loading: value => dispatch({ type: 'SET_LOADING', value: value }),
    profile: value => dispatch({ type: 'SAVE_USER', value: value })
  }
}

export default connect(null, mapDispatchToProps)(SignUpScreen)

const ELEMENT_HEIGHT = 377;
const spaceHeight = deviceHeight - ELEMENT_HEIGHT;

const styles = StyleSheet.create({
  titleBox: {
    height: 32,
    ...Platform.select({
      ios: {
        marginTop: spaceHeight * 0.38,
        marginBottom: spaceHeight * 0.24,
      },
      android: {
        marginTop: spaceHeight * 0.15,
        marginBottom: spaceHeight * 0.08,
      },
    }),
    justifyContent: 'center',
    alignItems: 'center',
  },
  formBox: {
    height: 255,
    alignItems: 'center',
    marginBottom: spaceHeight * 0.15,
  },
  noteBox: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 15,
    marginTop: 40,
  },
  textInputFields: {
    flexDirection: 'row',
    borderColor: colors.borderColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 50,
    backgroundColor: colors.white,
    width: '75%',
    marginLeft: -45,
  },
  imageButton: {
    marginLeft: -50,
    marginTop: 10
  },
  genderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    marginLeft: -10,
    paddingRight: 10,
  },
  radio: {
    paddingLeft: 60,  
  },
  headerTitle: {
    fontSize: fontSize.header,
    textAlign: 'center',
    alignItems: 'center',
  },
  radioSection: {
    marginBottom: 15,
  }
});