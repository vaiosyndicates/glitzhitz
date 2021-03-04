import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import {
  colors,
  fontSize,
  lineHeight,
  fontFamily,
} from '../styles/variables';

class TextElement extends Component {

  constructor(props) {
    super(props);
  }

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  render() {
    return (
      <Text
        ref={component => this._root = component} {...this.props}
        style={[
          this.props.extraLarge && {
            fontSize: fontSize.extraLarge
          },
          this.props.title && {
            fontSize: fontSize.title,
            lineHeight: lineHeight.title
          },
          this.props.header && {
            fontSize: fontSize.header,
            lineHeight: lineHeight.header
          },
          this.props.itemHeader && {
            fontSize: fontSize.itemHeader,
            lineHeight: lineHeight.itemHeader
          },
          this.props.medium && {
            fontSize: fontSize.medium
          },
          this.props.normal && {
            fontSize: fontSize.normal,
            lineHeight: lineHeight.normal
          },
          this.props.small && {
            fontSize: fontSize.small,
            lineHeight: lineHeight.small
          },
          this.props.light && { fontFamily: fontFamily.light },
          this.props.regular && { fontFamily: fontFamily.regular },
          this.props.mediumBold && { fontFamily: fontFamily.medium },
          this.props.semiBold && { fontFamily: fontFamily.semiBold },
          this.props.extraBold && { fontFamily: fontFamily.extraBold },

          this.props.white && { color: colors.white },
          this.props.black && { color: colors.black },
          this.props.darkWhite && { color: colors.darkWhite },
          this.props.grey && { color: colors.grey },
          this.props.lightGrey && { color: colors.lightGrey },
          this.props.red && { color: colors.red },
          this.props.softBlue && { color: colors.softBlue },
          this.props.darkSkyBlue && { color: colors.darkSkyBlue },
          this.props.periBlue && { color: colors.periBlue },
          this.props.border && { color: colors.borderColor },

          this.props.style && this.props.style,
        ]}
      >
        {this.props.children}
      </Text> 
    );
  }
}

export default TextElement;
