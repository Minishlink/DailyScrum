//@flow
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import appStyle from '../appStyle';

export default (props: any) => <Text {...props} style={[styles.text, props.style]} />;

const styles = StyleSheet.create({
  text: {
    fontSize: appStyle.font.size.default,
    color: appStyle.colors.text,
  },
});
