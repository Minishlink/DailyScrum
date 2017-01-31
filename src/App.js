import { StackNavigator } from 'react-navigation';

import * as Pages from 'DailyScrum/src/pages';

export default App = StackNavigator({
  home: {
    screen: Pages.Home,
  },
  boards: {
    screen: Pages.Boards,
    path: 'login#token=:token',
  },
}, {
  initialRouteName: 'home',
  URIPrefix: 'dailyscrum://',
});
