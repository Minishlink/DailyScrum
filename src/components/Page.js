// @flow
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

const Page = (props: PropsType) =>
  <View
    style={[
      styles.page,
      {
        paddingTop: props.noMargin ? 0 : appStyle.margin,
        paddingHorizontal: props.noMargin ? 0 : appStyle.margin,
        backgroundColor: props.backgroundColor || appStyle.colors.background,
      },
      props.style,
    ]}
  >
    {props.isLoading &&
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>}
    {!props.isLoading && props.children}
  </View>;

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
  backgroundColor?: string,
  isLoading?: boolean,
};

Page.defaultProps = {
  style: {},
  isLoading: false,
  noMargin: false,
  backgroundColor: appStyle.colors.background,
};

export default Page;
