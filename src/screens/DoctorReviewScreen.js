import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Text from '../elements/Text';
import GradientButton from '../elements/GradientButton';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import { deviceHeight, shadowOpt, colors, fontSize, fontFamily } from '../styles/variables';

export default class DoctorReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsList: [
        {
          id: 0,
          avatar: require('../../img/person/oval_1.png'),
          name: 'Jesse Ryan',
          birthDate: '08-31-2016',
          comment: 'I know how terrible it can be for you at nights and even when you wake up'
        },
        {
          id: 1,
          avatar: require('../../img/person/oval_5.png'),
          name: 'Issac Jones',
          birthDate: '02-25-2016',
          comment: 'I know how terrible it can be for you at nights and even when you wake up'
        },
        {
          id: 2,
          avatar: require('../../img/person/oval_6.png'),
          name: 'James Hicks',
          birthDate: '06-27-2016',
          comment: 'I know how terrible it can be for you at nights and even when you wake up'
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Review'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/whiteHeart.png'),
                buttonAction: this._handleClickHeartButton.bind(this),
                buttonWidth: 26,
                buttonHeight: 23,
              },
            ]
          }
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.reviewsList.map((item, index) => (
                <Item
                  key={item.id}
                  avatar={item.avatar}
                  name={item.name}
                  birthDate={item.birthDate}
                  comment={item.comment}
                />
              ))
            }
            <View style={[CommonStyles.buttonBox, {marginTop: 80, marginBottom: 10}]}>
              <GradientButton
                onPressButton={this._handleClickWriteReview.bind(this)}
                setting={shadowOpt}
                btnText="WRITE REVIEW"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  // Go to WriteReviewScreen
  _handleClickWriteReview() {
    // TODO:
  }

  _handleClickHeartButton() {
    // TODO: Click heart button
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      avatar,
      name,
      birthDate,
      comment
    } = this.props;

    let starImgs = [];
    for(let i = 1; i <= 4; i++) {
      starImgs.push(
        <Icon
          key={i}
          style={{paddingLeft: 2}}
          name="star-o"
          size={19}
          color="rgb(75,102,234)"
        />
      )        
    }

    return (
      <View style={[CommonStyles.itemWhiteBox, {padding: 16}]}>
        <View style={styles.info}>
          <View style={styles.left}>
            <Image
              source={avatar}
              style={{width: 40, height: 40}}
            />  
            <View style={styles.name}>
              <Text itemHeader black mediumBold style={{marginTop: -6}}>
                {name}
              </Text>
              <Text lightGrey medium style={{fontSize: fontSize.small, lineHeight: 23}}>
                {birthDate}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Icon
              style={{paddingLeft: 2}}
              name="star-o"
              size={19}
              color={colors.grey}
            />
            {starImgs}
          </View>
        </View>
        <Text normal lightGrey regular>{comment}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10 
  },
  left: {
    flexDirection: 'row',
  },
  birthDate: {
    color: colors.lightGrey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.medium,
    lineHeight: 23,
  },
  name: {
    marginLeft: 10,
  },
  right: {
    width: 100,
    flexDirection: 'row',
  },
});
