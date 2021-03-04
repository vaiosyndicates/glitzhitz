import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';

import CommonStyles from '../../styles/CommonStyles';
import {
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
} from '../../styles/variables';
import PrimePanel from '../../elements/PrimePanel';

export default class InsurranceCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPressEditBtn } = this.props;
    return (
      <PrimePanel
        isCircleBtn={true}
        header={this.renderHeader()}
        body={this.renderBody()}
        circleContainerStyle={{
          top: 20, 
          right: 15,
        }}
        circleBtn={{
          imageUrl: require('../../../img/healer/pencil1.png'),
          width: 50,
          height: 55 
        }}
      />
    );
  }

  renderHeader() {
    return (
      <View style={styles.panelHeader}>
        <Image
          source={this.props.image}
          style={{
            width: this.props.imageWidth,
            height: this.props.imageHeight,
            marginRight: 10
          }}
        />
        <Text style={[
          CommonStyles.itemHeaderText,
          CommonStyles.greyColor,
          CommonStyles.mediumBold,
        ]}>
          {this.props.header}
        </Text>
      </View>
    );
  }

  renderBody() {
    return (
      <View style={styles.panelBody}>
        <View style={styles.leftItem}>
          <Text style={styles.label}>
            Fullname
          </Text>
          <Text style={styles.value}>
            {this.props.name}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={[
            CommonStyles.normalText,
            CommonStyles.greyColor,
            CommonStyles.regularBold,
          ]} />
        </View>
        <View style={styles.leftItem}>
          <Text style={styles.label}>
            Enrollee ID
          </Text>
          <Text style={styles.value}>
            {this.props.code}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <Text style={styles.label}>
            Group #
          </Text>
          <Text style={styles.value}>
            {this.props.group}
          </Text>
        </View>
        <View style={[styles.leftItem, {marginBottom: 0}]}>
          <Text style={styles.label}>
            Date Effective
          </Text>
          <Text style={styles.value}>
            {this.props.date}
          </Text>
        </View>
        <View style={[styles.rightItem, {marginBottom: 0}]}>
          <Text style={styles.label}>
            Plan
          </Text>
          <Text style={styles.value}>
            {this.props.plan}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(243,246,254)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  panelBody: {
    width: deviceWidth - 30, 
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 17,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  leftItem: {
    width: (deviceWidth + 20) /2,
    marginBottom: 10,
  },
  rightItem: {
    width: (deviceWidth - 160) /2,
    marginBottom: 10,
  },
  label: {
    color: colors.grey,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  value: {
    color: colors.black,
    fontSize: 20,
    fontFamily: fontFamily.regular,
    ...Platform.select({
      android: {
        lineHeight: 23
      },
    }),
  },
});
