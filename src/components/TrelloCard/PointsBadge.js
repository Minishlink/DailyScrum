// @flow
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import chroma from 'chroma-js';

export default (props: PropsType) => {
  return (
    <View style={[styles.container, props.isPostEstimation && styles.postEstimationContainer]}>
      <Text style={styles.text}>{props.points}</Text>
    </View>
  );
};

type PropsType = {
  points: number,
  isPostEstimation?: boolean,
};

const backgroundColor = chroma('#006580');
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: backgroundColor.hex(),
    borderColor: '#005B72',
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  postEstimationContainer: {
    backgroundColor: backgroundColor.brighten().hex(),
  },
  text: {
    color: '#E1FAFB',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
