import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeout from 'react-native-swipeout';
import TextPrice from '../../elements/Text';
import ImageButton from '../../elements/ImageButton'

import CommonStyles from '../../styles/CommonStyles';
import {
    deviceWidth,
    deviceHeight,
    colors,
    fontFamily,
    fontSize,
} from '../../styles/variables';
import AlertDialog from '../../elements/AlertDialog';
import SwipeoutButton from '../SwipeoutButton';
import AlertDeleteDlMessage from '../list-item/AlertDeleteDlMessage';
import AlertDeleteDlTitle from '../list-item/AlertDeleteDlTitle';
import MoreModal from '../list-item/MoreModal';

export default class CartShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            visible: false,
        }
        this.toggleMoreModal = this.toggleMoreModal.bind(this);
    }

    render() {
        let swipeBtns = [{
            component: <SwipeoutButton />,
            onPress: () => { this.toggleAlertDeleteDialog(true) }
        }];

        return (
            <View>
                <Swipeout
                    right={swipeBtns}
                    buttonWidth={100}
                    backgroundColor='transparent'>
                    <View style={[CommonStyles.itemWhiteBox, { position: 'relative' }]}>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={this.props.onPressButton}
                        >
                            <View style={styles.card}>
                                <View style={styles.left}>
                                    <View style={styles.leftAva}>
                                        <Image
                                            source={this.props.image.url}
                                            style={{ width: this.props.image.width, height: this.props.image.height }}
                                        />
                                    </View>
                                    <View style={styles.leftInfo}>
                                        <Text style={styles.name}>{this.props.name}</Text>
                                        <Text style={styles.subText}>{this.props.subText}</Text>
                                        <View style={styles.leftBottom}>
                                            <TextPrice header darkSkyBlue regular>${this.props.price}</TextPrice>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            style={styles.moreBtn}
                        >
                            <View style={styles.leftBottom}>
                                <ImageButton
                                    appearance={{
                                        normal: require("../../../img/healer/Sub.png"),
                                        highlight: require("../../../img/healer/Sub.png")
                                    }}
                                    onPress={this._handleClickSubButton.bind(this)}
                                /> 
                                <Text style={styles.countText}> {this.props.count} </Text>
                                <ImageButton
                                    appearance={{
                                        normal: require("../../../img/healer/add.png"),
                                        highlight: require("../../../img/healer/add.png")
                                    }}
                                    onPress={this._handleClickAddButton.bind(this)}
                                /> 
                            </View>
                        </TouchableHighlight>
                        <MoreModal
                            visible={this.state.visible}
                            onPressCloseButton={() => {
                                this.setState({
                                    modalVisible: false,
                                    visible: false,
                                });
                            }}
                        />
                    </View>
                </Swipeout>
                <AlertDialog
                    modalVisible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setState({
                            modalVisible: false,
                            visible: false,
                        });
                    }}
                    dlTitle={{
                        component: <AlertDeleteDlTitle
                            text='Delete'
                        />
                    }}
                    dlMessage={{
                        component: <AlertDeleteDlMessage
                            frontText='Do you want delele'
                            highlightText='Jose Holland'
                            behindText='on list?'
                        />
                    }}
                    dismissBtn={{
                        text: 'Cancel',
                        onPress: () => { this.toggleAlertDeleteDialog(false) },
                    }}
                    acceptBtn={{
                        text: 'Done',
                        onPress: () => { this.toggleAlertDeleteDialog(false) },
                    }}
                />
            </View>
        );
    }

    // Hide ande show alert dialog
    toggleAlertDeleteDialog(visible) {
        //this.setState({
        //    modalVisible: visible,
        //    visible: false,
        //});
    }

    // Hide and show MoreModal
    toggleMoreModal() {

        //this.setState({
        //    modalVisible: this.state.modalVisible,
        //    visible: true
        //});
    }

    _handleClickSubButton() {
      alert("Kai");
        // TODO: Click Sub Cart button
    }

    _handleClickAddButton() {
        // TODO: Click Add Cart button
    }
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        padding: 15,
    },
    right: {
        width: 52,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
    },
    leftAva: {
        position: 'relative',
        width: 70,
        height: 70
    },
    leftInfo: {
        paddingLeft: 15,
        paddingRight: 100,
    },
    name: {
        marginTop: -5,
        color: colors.black,
        fontSize: fontSize.itemHeader,
        fontFamily: fontFamily.medium,
    },
    subText: {
        color: colors.lightgrey,
        fontSize: fontSize.small,
        fontFamily: fontFamily.regular,
        lineHeight: 23,
    },
    countText: {
        fontSize: fontSize.header,
        fontFamily: fontFamily.regular,
        paddingHorizontal: 3
    },
    leftBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 23
    },
    leftBottomTxt: {
        paddingLeft: 6,
        color: colors.grey,
        fontFamily: fontFamily.regular,
        fontSize: 14,
    },
    ranking: {
        marginTop: -5,
        marginLeft: 5,
        fontSize: fontSize.header,
        color: colors.darkSkyBlue,
        fontFamily: fontFamily.regular,
    },
    specialCir: {
        position: 'absolute',
        top: 5,
        right: 0,
        width: 15,
        height: 15,
        borderRadius: 200,
    },
    moreBtn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
});

CartShop.propTypes = {
    imageUrl: PropTypes.number,
    itemTitle: PropTypes.string,
    distanceText: PropTypes.number,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
    onPressButton: PropTypes.func,
};
