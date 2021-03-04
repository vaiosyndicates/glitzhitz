import React, { Component } from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';

import CommonStyles from '../styles/CommonStyles';
import PrimeNavigationBar from '../elements/PrimeNavigationBar';
import NewsCommentCard from '../components/news/NewsCommentCard';

export default class NewsCommentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsList: [
        {
          id: 0,
          commentorAva: require('../../img/person/oval_1.png'),
          commentorName: 'Jesse Ryan',
          commentTime: '3 mins ago',
          commentText: 'I know how terrible it can be for you at nights and even when you wake up'
        },
        {
          id: 1,
          commentorAva: require('../../img/person/oval_2.png'),
          commentorName: 'Sean Neal',
          commentTime: '34 mins ago',
          commentText: 'For a long time, Americans who are increasingly facing low supplies'
        },
        {
          id: 2,
          commentorAva: require('../../img/person/oval_3.png'),
          commentorName: 'Kyle Powell',
          commentTime: '58 mins ago',
          commentText: 'Candidiasis can be a pesky infection to treat, more so since the pharmaceutical'
        },
        {
          id: 3,
          commentorAva: require('../../img/person/oval_4.png'),
          commentorName: 'Brett Meyer',
          commentTime: '3 mins ago',
          commentText: 'For more than 10 years, Beth McFadden, a 44-year- old mother of three'
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <PrimeNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Comment'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.commentsList.map((item, index) => (
                <NewsCommentCard
                  key={item.id}
                  avatar={item.commentorAva}
                  name={item.commentorName}
                  time={item.commentTime}
                  comment={item.commentText}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}
