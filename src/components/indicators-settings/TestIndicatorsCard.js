import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  deviceWidth,
} from '../../styles/variables';
import Text from '../../elements/Text';
import PrimePanel from '../../elements/PrimePanel';

import CommonStyles from '../../styles/CommonStyles';

import AreaSpline from './charts/AreaSpline';
import Pie from './charts/Pie';
import Theme from './theme';
import data from './data';

type State = {
  activeIndex: number,
  spendingsPerYear: any
}

export default class TestIndicatorsCard extends Component {

  state: State;

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
  }

  render() {
    const { onPressEditBtn } = this.props;
    return (
      <PrimePanel
        isCircleBtn={true}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
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
            width:this.props.imageWidth,
            height:this.props.imageHeight,
            marginRight: 10
          }}
        />
        <Text itemHeader grey mediumBold>{this.props.header}</Text>
      </View>
    );
  }

  renderBody() {
    const height = 145;
    const width = deviceWidth - 45;
    return (
      <View style={styles.panelBody}>
        <AreaSpline
          width={width}
          height={height}
          data={this.state.spendingsPerYear}
          strokeColor={'rgb(75,102,234)'}
          fillColor={Theme.colors[this.state.activeIndex]}
        />
      </View>
    );
  }

  renderFooter() {
    return (
      <View style={styles.panelFooter}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.footerItem}
          onPress={this.props.onPressDetails}
        >
          <Image
            source={require('../../../img/healer/cancel.png')}
            style={{width: 16, height: 16}}
          />
          <Text grey regular style={{fontSize: 14, marginLeft: 5}}>
            Details
          </Text>
        </TouchableOpacity>
        <View style={{
          height: 20,
          marginLeft: 5,
          marginRight: 5,
          borderRightColor: 'rgb(229,229,229)',
          borderRightWidth: 0.8}}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.footerItem}
          onPress={this.props.onPressGoal}
        >
          <Image
            source={require('../../../img/healer/greyTarget.png')}
            style={{width: 16, height: 16}}
          />
          <Text grey regular style={{fontSize: 14, marginLeft: 5}}>
            Goal 
          </Text>
        </TouchableOpacity>
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
    height: 150,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(229,229,229)',
  },
  panelFooter: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  footerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
