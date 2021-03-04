import React, {Component} from 'react';
import { StyleSheet, View, Image, Platform, ScrollView, TouchableHighlight } from 'react-native';
import { Tabs } from 'native-base';
import { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { NAV_HEIGHT, STATUSBAR_HEIGHT, colors, fontSize, fontFamily } from '../styles/variables';

import Text from '../elements/Text';
import CommonStyles from '../styles/CommonStyles';
import GradientNavigationBar from '../elements/GradientNavigationBar';

export default class HealerBlogsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsList: [
        {
          id: 0,
          postTitle: 'Can It Help Your Blurred Vision',
          postContent: 'For many years, when people thought of alcohol and drug'
        },
        {
          id: 1,
          postTitle: 'Can It Help Your Blurred Vision',
          postContent: 'For many years, when people thought of alcohol and drug'
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          outerContainerStyle={{
            shadowColor: 'transparent',
            elevation: 0,
          }}
          back
          titleText='Healer Blogs'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/shapes.png'),
                buttonAction: this._handleClickShapesButton.bind(this),
                buttonWidth: 14,
                buttonHeight: 22,
              },
            ]
          }
        />
        <Tabs
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}
          tabBarUnderlineStyle={{
            backgroundColor: '#fff'
          }}
          tabBarBackgroundColor={'rgba(75,102,234,0.9)'}
          tabBarActiveTextColor={'#fff'}
          tabBarInactiveTextColor={'rgba(255,255,255,0.6)'}
          tabBarTextStyle={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16
          }}
        >
          <ScrollView heading='Food'>
            <View style={CommonStyles.wrapperBox}>
              {
                this.state.postsList.map((item, index) => (
                  <Item 
                    key={item.id}
                    postTitle={item.postTitle}
                    postContent={item.postContent}
                    onPressItem={this._handleClickListNewsItem.bind(this)}
                  />
                ))
              }
            </View>
          </ScrollView>
          <ScrollView heading='Fitness'>
          </ScrollView>
          <ScrollView heading='LifeStyle'>
          </ScrollView>
          <ScrollView heading='Doctors'>
          </ScrollView>
        </Tabs>
      </View>
    );
  }

  // Go to NewsDetailssScreen 
  _handleClickListNewsItem() {
    this.props.navigation.navigate('NewsDetailsScreen');
  }

  _handleClickShapesButton() {
    // TODO: Click shapes button
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      postTitle,
      postContent,
      onPressItem,
    } = this.props;

    return (
      <View style={CommonStyles.itemWhiteBox}>
        <TouchableHighlight
          underlayColor='transparent'
          style={styles.highLight}
          onPress={onPressItem}>
          <View style={{padding: 15}}>
            <View style={{
              width: 'auto',
              height: 180,
              backgroundColor: 'rgb(150,150,150)'
            }} />
            <Text style={styles.title}>{postTitle}</Text>
            <Text style={styles.content}>{postContent}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginTop: 13,
    marginBottom: 6,
  },
  content: {
    color: colors.grey,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    lineHeight: 23 
  }
});
