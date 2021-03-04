import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

import Text from '../elements/Text';
import GradientNavigationBar from '../elements/GradientNavigationBar';

import CommonStyles from '../styles/CommonStyles';
import ListItem from '../components/ListItem';

export default class ResultFindHospitalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitalsList: [
        {
          id: 0,
          image: {
            url: require('../../img/person/logoHospital_1.png'),
            width: 60,
            height: 60,
          },
          name: 'Health Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 1,
          image: {
            url: require('../../img/person/logoHospital_2.png'),
            width: 60,
            height: 59,
          },
          name: 'Medical Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 2,
          image: {
            url: require('../../img/person/logoHospital_3.png'),
            width: 60,
            height: 60.5,
          },
          name: 'Healer Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 3,
          image: {
            url: require('../../img/person/logoHospital_4.png'),
            width: 60.5,
            height: 60,
          },
          name: 'Medic Heart',
          career: 'Cardiologist',
          distance: 0.8,
        },
        {
          id: 4,
          image: {
            url: require('../../img/person/logoHospital_1.png'),
            width: 60,
            height: 60,
          },
          name: 'Healthy Hospital',
          career: 'Cardiologist',
          distance: 0.8,
        },
      ]
    }
  }

  render() {
    return (
      <View style={CommonStyles.normalPage}>
        <GradientNavigationBar
          navigation={this.props.navigation}
          back
          titleText='Hospital'
        />
        <ScrollView style={CommonStyles.noTabScrollView}>
          <View style={CommonStyles.wrapperBox}>
            <View style={styles.result}>
              <Text medium lightGrey regular>Found
                Found
                <Text> </Text>
                <Text black mediumBold>169</Text>
                <Text> </Text>
                hospital near
                <Text> </Text>
                <Text black mediumBold>NewYork</Text>
              </Text>
            </View>
            <View style={styles.resultList}>
              {
                this.state.hospitalsList.map((item, index) => (
                  <ListItem
                    key={item.id}
                    image={{
                      url: item.image.url,
                      width: item.image.width,
                      height: item.image.height,
                    }}
                    header={item.name}
                    subText={item.career}
                    bottomText={item.distance}
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  result: {
    marginBottom: 10,
    marginHorizontal: 15,
  },
  resultList: {
    flex: 1,
  }
});
