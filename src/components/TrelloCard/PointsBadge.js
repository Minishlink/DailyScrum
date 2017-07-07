// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '../';
import chroma from 'chroma-js';
import appStyle from '../../appStyle';

export default (props: PropsType) => {
  return (
    <View style={[styles.container, props.isPostEstimation && styles.postEstimationContainer]}>
      <Text style={styles.text}>
        {props.points}
      </Text>
    </View>
  );
};

type PropsType = {
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
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  postEstimationContainer: {
    backgroundColor: backgroundColor.brighten().hex(),
  },
  text: {
    color: '#E1FAFB',
    fontSize: appStyle.font.size.small,
    fontWeight: 'bold',
  },
});
