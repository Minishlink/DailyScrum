import { Platform } from 'react-native';
import chroma from 'chroma-js';
const primaryColor = '#2196F3';
export default {
  font: {
    size: {
      small: 12,
      default: 14,
      big: 16,
      large: 18,
      huge: 20,
    },
  },
  colors: {
    primaryLight: chroma(primaryColor).brighten().hex(),
    primaryMidLight: chroma(primaryColor).brighten(0.5).hex(),
    primary: primaryColor,
    primaryMidDark: chroma(primaryColor).darken(0.5).hex(),
    primaryDark: chroma(primaryColor).darken().hex(),
    text: '#4d4d4d',
    lightText: '#FAFAFA',
    background: '#F5FCFF',
    darkGray: '#333333',
  },
  header: {
    containerStyle: {
      backgroundColor: 'white',
    },
    containerShadowStyle: {
      elevation: 2,
      shadowColor: 'black',
      shadowRadius: 1,
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 1 },
      marginBottom: 2,
    },
  },
  dimensions: {
    touchableHeight: 48,
    visibleButtonHeight: 36,
  },
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
