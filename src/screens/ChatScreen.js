import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
} from 'react-native';
import {
  GiftedChat,
  Actions,
  MessageText,
  Bubble,
  Time,
  Avatar
} from 'react-native-gifted-chat';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CustomView from '../lib/CustomView';
import CustomActions from '../lib/CustomActions';
import CustomInputToolbar from '../lib/CustomInputToolbar';

import CommonStyles from '../styles/CommonStyles';
import {
  deviceWidth
} from '../styles/variables';

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.renderMessageText = this.renderMessageText.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;
  }

  async UNSAFE_componentWillMount() {
    this._isMounted = true;
    this.setState(() => {
      return {
        messages: require('../data/messages.js'),
      };
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              require('../data/old_messages.js')
            ),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Doctor is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: require('../../img/person/pixta21931547M.png'),
          },
        }),
      };
    });
  }

  renderCustomActions(props) {
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <CustomActions
        {...props}
        options={options}
      />
    );
  }
  
  // Customize Bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            marginVertical: 5,
            borderRadius: 8,
            backgroundColor: '#fff',
            ...Platform.select({
              ios: {
                shadowColor: 'rgba(0,0,0,0.1)',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowRadius: 5,
                shadowOpacity: 1 
              },
              android: {
                elevation: 6,
              },
            }),
          },
          right: {
            marginVertical: 5,
            borderRadius: 8,
            backgroundColor: 'rgb(136,159,249)',
          }
        }}
      />
    );
  }

  // Customize Message Text 
  renderMessageText(messageTextProps) {
    return (
      <MessageText
        {...messageTextProps}
        textStyle={{
          left: {
            color: 'rgb(105,105,105)',
            fontSize: 16,
            fontFamily: 'Poppins-Regular', 
            lineHeight: 23,
            marginVertical: 7,
            marginHorizontal: 10,
          },
          right: {
            fontSize: 16,
            fontFamily: 'Poppins-Regular', 
            lineHeight: 23,
            marginVertical: 7,
            marginHorizontal: 10,
          } 
        }}
      />
    );
  }

  // Customize Time Text 
  renderTime(timeProps) {
    return (
      <Time
        {...timeProps}
        textStyle={{
          left: {
            color: 'rgb(105,105,105)',
            fontFamily: 'Poppins-Regular', 
          },
          right: {
            fontFamily: 'Poppins-Regular', 
          } 
        }}
      />
    );
  }

  // Customize Avatar 
  renderAvatar(avatarProps) {
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: {
            width: 30,
            height: 30,
          },
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  // Customize Footer 
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footer}>
          <Text grey regular style={{fontSize: 14}}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  // Customize Input Toolbar 
  renderCustomInputToolbar(props) {
    return (
      <CustomInputToolbar
        {...props}
      />
    );
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Alexander Wolfe'
          rightButtons={
            [
              {
                key: 1,
                buttonIcon: require('../../img/healer/clipboard1.png'),
                buttonAction: this._handleClickClipboardButton.bind(this),
                buttonWidth: 19,
                buttonHeight: 22,
              },
            ]
          }
        />
        <View style={CommonStyles.chatView}>
          <GiftedChat
            messages={this.state.messages}
            placeholder='Type something...'
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            renderAvatarOnTop={true}

            user={{
              _id: 1, // sent messages should have same user._id
            }}

            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderMessageText={this.renderMessageText}
            renderTime={this.renderTime}
            renderAvatar={this.renderAvatar}
            renderCustomView={this.renderCustomView}
            renderInputToolbar={this.renderCustomInputToolbar}
            renderFooter={this.renderFooter}
          />
        </View>
      </View>
    );
  }

  _handleClickClipboardButton() {
    // TODO: Click clipboard button
  }
}

const styles = StyleSheet.create({
  footer: {
    marginTop: 5,
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
