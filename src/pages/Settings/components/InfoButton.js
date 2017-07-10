// @flow
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import appStyle from '../../../appStyle';
import { Icon } from '../../../components';

export default (props: PropsType) =>
  <TouchableOpacity
    onPress={() => props.navigation.navigate('about')}
    style={styles.infoButton}
    hitSlop={{ top: 30, bottom: 30, left: 40, right: 40 }}
  >
    <Icon name="info" size={20} color={appStyle.colors.primary} />
  </TouchableOpacity>;

const styles = StyleSheet.create({
  infoButton: {
    marginRight: 15,
  },
});

type PropsType = {
  navigation: NavigationScreenProp,
};
