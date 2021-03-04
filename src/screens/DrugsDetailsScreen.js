import React, {Component} from 'react';
import { StyleSheet, View, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import DrugsDetailCard from '../components/DrugsDetailCard';

export default class DrugsDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Amoxicllin'
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
            <Image
              source={require('../../img/person/mockUp.png')}
              style={styles.drugsImg}
            />
            <DrugsDetailCard
              header='What is amoxicillin?'
              content='Amoxicillin is used to treat many different types of infection caused by bacteria, such as tonsillitis…'
            />
            <DrugsDetailCard
              header='Important Information'
              content='Do not use this medication if you are allergic to amoxicillin or to any other  penicillin antibiotic, such as ampicillin'
            />
            <DrugsDetailCard
              header='Amoxicillin side effects'
              content='Amoxicillin is used to treat many different types of infection caused by bacteria, such as tonsillitis…'
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  _handleClickHeartButton() {
    // TODO: Click heart button
  }
}

const styles = StyleSheet.create({
  drugsImg: {
    width: 340,
    height: 225,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 20
  },
});
