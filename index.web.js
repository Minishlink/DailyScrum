import { AppRegistry } from 'react-native';
import App from './src/App';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

OfflinePluginRuntime.install();

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('react-root'),
});

// import fonts
const fonts = [
  {
    icon: require('react-native-vector-icons/Fonts/FontAwesome.ttf'),
    family: 'FontAwesome',
  },
  {
    icon: require('react-native-vector-icons/Fonts/MaterialIcons.ttf'),
    family: 'Material Icons',
  },
  {
    icon: require('react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    family: 'Material Design Icons',
  },
  {
    icon: require('react-native-vector-icons/Fonts/Entypo.ttf'),
    family: 'Entypo',
  },
];

const iconFontStyles = fonts
  .map(
    font => `@font-face {
  src: url(${font.icon});
  font-family: ${font.family};
}`
  )
  .join('\n');

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

document.head.appendChild(style);
