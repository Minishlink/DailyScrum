// @flow
import React, { Children } from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const ANDROID_VERSION_LOLLIPOP = 21;
const canUseNativeFeedback = Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP;
const canUseForegroundNativeFeedback = canUseNativeFeedback && TouchableNativeFeedback.canUseNativeForeground();

export default ({ children, disabled, withRipple, borderless, ...props }: PropsType) => {
  if (disabled) {
    const { onLongPress, onPress, ...viewProps } = props;
    return <View {...viewProps}>{children}</View>;
  }

  if (withRipple && Platform.OS === 'android' && Platform.Version >= ANDROID_VERSION_LOLLIPOP) {
    const { style, ...rest } = props;
    return (
      <TouchableNativeFeedback
        {...rest}
        style={null}
        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .32)', borderless)}
        useForeground={canUseForegroundNativeFeedback && !borderless}
        onPress={props.onPress ? () => props.onPress && requestAnimationFrame(props.onPress) : undefined}
        onLongPress={
          props.onLongPress ? () => props.onLongPress && requestAnimationFrame(props.onLongPress) : undefined
        }
      >
        <View style={style}>{Children.only(children)}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.7} {...props}>
      {children}
    </TouchableOpacity>
  );
};

type PropsType = {
  disabled?: boolean,
  children?: any,
  borderless?: boolean,
  withRipple?: boolean,
  style?: any,
  onPress?: Function,
  onLongPress?: Function,
};
