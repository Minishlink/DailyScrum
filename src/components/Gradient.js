import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import appStyle from '../appStyle';

export default props =>
  <LinearGradient
    colors={[appStyle.colors.tertiary, appStyle.colors.primary]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    {...props}
  >
    {props.children}
  </LinearGradient>;
