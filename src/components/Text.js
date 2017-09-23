//@flow
import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import appStyle from '../appStyle';

export const getFontStyle = (style: Object) => {
  if (Platform.OS !== 'android') {
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
      fontStyle: style.fontStyle,
    };
  }

  const map = {
    'Open Sans': {
      weight: {
        '100': 'Light',
        '200': 'Light',
        '300': 'Light',
        '400': 'Regular',
        '500': 'Regular',
        '600': 'SemiBold',
        '700': 'Bold',
        '800': 'ExtraBold',
        '900': 'ExtraBold',
        normal: 'Regular',
        bold: 'Bold',
      },
      style: {
        normal: '',
        italic: 'Italic',
      },
    },
  };

  const fontMap = map[style.fontFamily];
  if (!fontMap) return;

  const italicSuffix = fontMap.style[style.fontStyle || 'normal'];
  const weightSuffix = fontMap.weight[style.fontWeight || 'normal'];
  return { fontFamily: style.fontFamily + '-' + weightSuffix + italicSuffix, fontWeight: undefined };
};

export default (props: any) => {
  const style = StyleSheet.flatten([styles.text, props.style]) || {};
  const fontStyle = getFontStyle(style);
  return <Text {...props} style={[styles.text, props.style, fontStyle]} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: appStyle.font.family,
    fontSize: appStyle.font.size.default,
    color: appStyle.colors.text,
    backgroundColor: 'transparent',
  },
});
