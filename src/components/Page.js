import React, { PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';
import appStyle from 'DailyScrum/src/appStyle';

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

const Page = props => (
  <View
    style={[styles.page, {
      paddingTop: props.noNavBar ? 0 : 16,
      paddingHorizontal: props.noMargin ? 0 : 24,
      backgroundColor: props.backgroundColor || appStyle.colors.background,
    }]}
  >
    {props.children}
  </View>
);

Page.propTypes = {
  children: PropTypes.node,
  noMargin: PropTypes.bool,
  noNavBar: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

Page.defaultProps = {
  noMargin: false,
  noNavBar: false,
  backgroundColor: appStyle.colors.background,
};

export default Page;
