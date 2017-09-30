// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import appStyle from '../appStyle';

export default (props: PropsType) =>
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>;

type PropsType = {
  children: any,
  style?: any,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: appStyle.shadow.radius,
    marginVertical: appStyle.shadow.radius,
    minHeight: 20,
    padding: appStyle.margin,
    backgroundColor: '#fff',
    borderRadius: appStyle.borderRadius,
    elevation: appStyle.shadow.radius / 2,
    shadowColor: appStyle.colors.darkGray,
    shadowRadius: appStyle.shadow.radius,
    shadowOpacity: 0.15,
    shadowOffset: { height: 1 },
  },
});
