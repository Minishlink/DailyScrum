// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../';
import chroma from 'chroma-js';
import appStyle from '../../appStyle';

export default (props: Props) => (
  <View style={[styles.container, props.isPostEstimation && styles.postEstimationContainer]}>
    <Text style={styles.text}>{props.points}</Text>
  </View>
);

type Props = {
  points: number,
  isPostEstimation?: boolean,
};

const backgroundColor = chroma(appStyle.colors.points);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor.hex(),
    borderColor: backgroundColor.darken().hex(),
    borderRadius: appStyle.borderRadius,
    paddingHorizontal: appStyle.margin,
  },
  postEstimationContainer: {
    backgroundColor: backgroundColor.brighten().hex(),
  },
  text: {
    color: appStyle.colors.overPrimaryColor,
  },
});
