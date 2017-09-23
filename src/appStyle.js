import { Platform } from 'react-native';
import chroma from 'chroma-js';

const primaryColor = '#43d2fc';
const secondaryColor = '#FFD91C';
const tertiaryColor = '#6487fa';

export default {
  font: {
    size: {
      small: 12,
      default: 15,
      big: 20,
    },
    family: 'Open Sans',
  },
  colors: {
    primaryLight: chroma(primaryColor).brighten().hex(),
    primaryMidLight: chroma(primaryColor).brighten(0.5).hex(),
    primary: primaryColor,
    primaryMidDark: chroma(primaryColor).darken(0.5).hex(),
    primaryDark: chroma(primaryColor).darken().hex(),
    secondary: secondaryColor,
    tertiary: tertiaryColor,
    overPrimaryColor: 'white',
    text: '#4d4d4d',
    warmGray: '#9b9b9b',
    lightGray: '#bbb',
    veryLightGray: '#FAFAFA',
    background: '#F5FCFF',
    darkGray: '#333333',
    points: tertiaryColor,
  },
  dimensions: {
    touchableHeight: 48,
    visibleButtonHeight: 36,
  },
  margin: 10,
  borderRadius: 3,
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
