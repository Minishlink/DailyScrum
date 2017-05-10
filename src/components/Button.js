// @flow
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

export default ({ children, disabled, ...props }: PropsType) =>
  disabled
    ? <View {...props}>{children}</View>
    : <TouchableOpacity {...props}>
        {children}
      </TouchableOpacity>;

type PropsType = {
  disabled?: boolean,
  children?: any,
};
