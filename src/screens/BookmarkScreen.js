import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

import { colors, fontSize, fontFamily } from '../styles/variables';

import CommonStyles from '../styles/CommonStyles';
import GradientNavigationBar from '../elements/GradientNavigationBar';

export default class BookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this. state = {
      bookmarksList: [
        {
          id: 0,
          newsImage: require('../../img/person/smallImg.png'),
          newsTitle: 'Can It Help Your Blurred Vision Food',
          newsContent: 'For many years, when people thought of alcohol and drug'
        },
        {
          id: 1,
          newsImage: require('../../img/person/smallImg.png'),
          newsTitle: 'Can It Help Your Blurred Vision Food',
          newsContent: 'For many years, when people thought of alcohol and drug'
        },
        {
          id: 2,
          newsImage: require('../../img/person/smallImg.png'),
          newsTitle: 'Can It Help Your Blurred Vision Food',
          newsContent: 'For many years, when people thought of alcohol and drug'
        },
        {
          id: 3,
          newsImage: require('../../img/person/smallImg.png'),
          newsTitle: 'Can It Help Your Blurred Vision Food',
          newsContent: 'For many years, when people thought of alcohol and drug'
        },
      ]
    }
  }

  render() {
    const screen = IntroOneScreen;
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Bookmark'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            {
              this.state.bookmarksList.map((item, index) => (
                <Item
                  key={item.id}
                  newsImage={item.newsImage}
                  newsTitle={item.newsTitle}
                  newsContent={item.newsContent}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      newsImage,
      newsTitle,
      newsContent,
    } = this.props;

    return (
      <View style={[
        CommonStyles.itemWhiteBox,
        {flexDirection: 'row'}
      ]}>
        <View style={styles.leftItem}>
          <Image
            source={newsImage}
            style={{width: 120, height: 120}}
          />  
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.title}>{newsTitle}</Text>
          <Text style={styles.content}>{newsContent}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 2,
    color: colors.black,
    fontSize: fontSize.medium,
    fontFamily: fontFamily.medium,
  },
  content: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    lineHeight: 23,
  },
});
