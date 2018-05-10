//@flow
import { NavigationActions, StackActions } from 'react-navigation';

export type ActionType = {};

export const redirectAfterLogin = (isFirstTime: boolean) =>
  isFirstTime
    ? StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'main',
            action: StackActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'tabs' }),
                NavigationActions.navigate({ routeName: 'projectSettings', params: { firstTime: true } }),
              ],
            }),
          }),
        ],
      })
    : StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'main' })],
      });

export const resetToLogin = () =>
  StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: 'login' })],
  });
