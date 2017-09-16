// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

export default (props: PropsType) =>
  <View style={[styles.container, styles.card]}>
    {props.children}
  </View>;

type PropsType = {
  children: any,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4, // shadow
    marginVertical: 4, // shadow
  },
  card: {
    minHeight: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 3,
    elevation: 2,
    shadowColor: appStyle.colors.darkGray,
    shadowRadius: 4,
    shadowOpacity: 0.15,
    shadowOffset: { height: 1 },
  },
});
