import { StackNavigator } from 'react-navigation';

import * as Pages from 'DailyScrum/src/pages';

export default App = StackNavigator({
  home: {
    screen: Pages.Home,
  },
  infos: {
    screen: Pages.Infos,
  },
}, {
  initialRouteName: 'home',
});
