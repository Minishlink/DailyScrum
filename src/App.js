import { StackNavigator } from 'react-navigation';

import * as Pages from 'DailyScrum/src/pages';

export default StackNavigator({
  home: {
    screen: Pages.Home,
  },
  boards: {
    screen: Pages.Boards,
    path: 'login#token=:token',
  },
  board: {
    screen: Pages.Board,
  },
}, {
  initialRouteName: 'home',
  URIPrefix: 'dailyscrum://',
});
