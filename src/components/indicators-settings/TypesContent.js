import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';

export default class TypesContent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        <Item
          itemImg={require('../../../img/healer/desinfectant.png')}
          iconWidth={17}
          iconHeight={22}
          itemHeaderText='Desinfectant'
          itemContent='Many people experience neck and back injuries'
        />
        <Item
          itemImg={require('../../../img/healer/transfusion.png')}
          iconWidth={17}
          iconHeight={22}
          itemHeaderText='Transfusion'
          itemContent='For many years, when people thought of alcohol and drug'
        />
        <Item
          itemImg={require('../../../img/healer/scale.png')}
          iconWidth={22}
          iconHeight={22}
          itemHeaderText='Weight'
          itemContent='Many people experience neck and back injuries'
        />
        <Item
          itemImg={require('../../../img/healer/desinfectant.png')}
          iconWidth={17}
          iconHeight={22}
          itemHeaderText='Desinfectant'
          itemContent='Many people experience neck and back injuries'
        />
      </View>
    );
  }
}

// Private component
class Item extends React.Component {
  render() {
    const {
      itemImg,
      itemHeaderText,
      itemContent,
      iconWidth,
      iconHeight,
    } = this.props;
    return (
      <View style={[
        CommonStyles.itemWhiteBox,
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 20,
        }
      ]}>
        <View style={styles.left}>
          <View style={styles.leftIcon}>
            <Image
              source={itemImg}
              style={{width:iconWidth, height:iconHeight}}
            />  
          </View>
          <View style={{
            height: 78,
            borderRightColor: colors.borderColor,
            borderRightWidth: 0.8}}
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.centerHeader}>{itemHeaderText}</Text>
          <Text style={styles.centerContent}>{itemContent}</Text>
        </View>
        <View style={styles.right}>
          <Image
            source={require('../../../img/healer/icUncheck1.png')}
            style={{width: 30, height: 30}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 59,
  },
  leftIcon: {
    width: 39, 
  },
  center: {
    flex: 1, 
    paddingRight: 10,
  },
  right: {
    alignItems: 'center',
  },
  centerHeader: {
    marginBottom: 5,
    color: colors.black,
    fontSize: fontSize.itemHeader,
    fontFamily: fontFamily.medium,
  },
  centerContent: {
    color: colors.grey,
    fontSize: fontSize.small,
    fontFamily: fontFamily.regular,
    lineHeight: 23,
  },
});
