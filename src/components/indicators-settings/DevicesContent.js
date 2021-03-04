import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableHighlight,
} from 'react-native';

import Text from '../../elements/Text';
import CommonStyles from '../../styles/CommonStyles';
import {
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';

export default class DevicesContent extends Component {
  constructor(props) {
    super(props);
    this. state = {
      devicesList: [
        {
          id: 0,
          itemImg: require('../../../img/person/appleHealth.png'),
          iconWidth: 40,
          iconHeight: 40,
          itemHeaderText: 'Apple Health'
        },
        {
          id: 1,
          itemImg: require('../../../img/person/type2.png'),
          iconWidth: 40,
          iconHeight: 40,
          itemHeaderText: 'Fitbit'
        },
        {
          id: 2,
          itemImg: require('../../../img/person/type3.png'),
          iconWidth: 40,
          iconHeight: 40,
          itemHeaderText: 'Withings'
        },
        {
          id: 3,
          itemImg: require('../../../img/person/iHealthCompanyLogo.png'),
          iconWidth: 50,
          iconHeight: 16,
          itemHeaderText: 'iHealh'
        },
        {
          id: 4,
          itemImg: require('../../../img/person/xiaomi.png'),
          iconWidth: 40,
          iconHeight: 40,
          itemHeaderText: 'MiBand'
        },
        {
          id: 5,
          itemImg: require('../../../img/person/cernerCorporationLogo.png'),
          iconWidth: 39.9,
          iconHeight: 40,
          itemHeaderText: 'Cerner'
        },
      ]
    }
  }

  render() {
    return (
      <View style={{marginTop: 20}}>
        {
          this.state.devicesList.map((item, index) => (
            <Item
              key={item.id}
              itemImg={item.itemImg}
              iconWidth={item.iconWidth}
              iconHeight={item.iconHeight}
              itemHeaderText={item.itemHeaderText}
            />
          ))
        }
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
      iconWidth,
      iconHeight,
    } = this.props;
    return (
      <View style={[CommonStyles.itemWhiteBox, styles.card]}>
        <View style={styles.left}>
          <View style={styles.leftIcon}>
            <Image
              source={itemImg}
              style={{width:iconWidth, height:iconHeight}}
            />  
          </View>
          <View style={{
            height: 30,
            borderRightColor: 'rgb(229,229,229)',
            borderRightWidth: 0.8}}
          />
        </View>
        <View style={styles.center}>
          <Text itemHeader grey mediumBold>{itemHeaderText}</Text>
        </View>
        <View style={styles.right}>
          <Image
            source={require('../../../img/healer/icChecked.png')}
            style={{width: 45, height: 45}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
  },
  leftIcon: {
    width: 50, 
  },
  center: {
    flex: 1, 
  },
  right: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 5,
  },
});
