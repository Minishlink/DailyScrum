import { Platform } from 'react-native';

export default (Platform.OS !== 'web'
  ? 'dailyscrum://'
  : window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1) + '#');
