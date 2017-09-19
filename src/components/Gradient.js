import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export default props =>
  <LinearGradient colors={['#6487fa', '#43d2fc']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} {...props}>
    {props.children}
  </LinearGradient>;
