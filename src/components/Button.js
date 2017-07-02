// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default ({ children, disabled, ...props }: PropsType) =>
  disabled
    ? <View {...props}>
        {children}
      </View>
    : <TouchableOpacity activeOpacity={0.6} {...props}>
        {children}
      </TouchableOpacity>;

type PropsType = {
  disabled?: boolean,
  children?: any,
};
