// @flow
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import appStyle from '../../../appStyle';
import { Icon } from '../../../components';

export default class extends Component {
  props: PropsType;

  shouldComponentUpdate() {
    return false;
  }

  goToAboutPage = () => this.props.navigation.navigate('about');

  render() {
    return (
      <TouchableOpacity
        onPress={this.goToAboutPage}
        style={styles.infoButton}
        hitSlop={{ top: 20, bottom: 20, left: 30, right: 30 }}
      >
        <Icon name="info" size={20} color={appStyle.colors.primary} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  infoButton: {
    padding: 20,
  },
});

type PropsType = {
  navigation: NavigationScreenProp,
};
