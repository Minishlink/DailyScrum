//@flow
import { NavigationActions } from 'react-navigation';

export const redirectAfterLogin = (isFirstTime: boolean) => {
  const actions = [NavigationActions.navigate({ routeName: 'main' })];

  if (isFirstTime) {
    actions.push(NavigationActions.navigate({ routeName: 'projectSettings', params: { firstTime: true } }));
  }

  return NavigationActions.reset({
    index: isFirstTime ? 1 : 0,
    actions,
  });
};

export const resetToLogin = () =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.reset({ routeName: 'login' })],
    key: null,
  });
