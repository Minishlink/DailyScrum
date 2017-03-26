// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

const Page = (props: PropsType) => (
  <View
    style={[styles.page, {
      paddingTop: props.noNavBar ? 0 : 16,
      paddingHorizontal: props.noMargin ? 0 : 24,
      backgroundColor: props.backgroundColor || appStyle.colors.background,
    }, props.style]}
  >
    {props.isLoading && <View style={styles.loader}><ActivityIndicator /></View>}
    {!props.isLoading && props.children}
  </View>
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

type PropsType = {
  style?: any,
  children?: any,
  noMargin?: boolean,
  noNavBar?: boolean,
  backgroundColor?: string,
  isLoading?: boolean,
};

Page.defaultProps = {
  style: {},
  isLoading: false,
  noMargin: false,
  noNavBar: false,
  backgroundColor: appStyle.colors.background,
};

export default Page;
