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
    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
