// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import appStyle from '../appStyle';

export default (props: PropsType) => {
  if (props.onPress || props.onLongPress) {
    return (
      <Button style={[styles.container, props.style]} onPress={props.onPress} onLongPress={props.onLongPress}>
        {props.children}
      </Button>
    );
  }

  return <View style={[styles.container, props.style]}>{props.children}</View>;
};

type PropsType = {
  children: any,
  style?: any,
  onPress?: Function,
  onLongPress?: Function,
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: appStyle.shadow.radius,
    marginVertical: appStyle.shadow.radius,
    minHeight: 20,
    padding: appStyle.margin,
    backgroundColor: '#fff',
    borderRadius: appStyle.borderRadius,
    ...appStyle.shadowStyle,
  },
});
