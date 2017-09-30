//@flow
import { NavigationActions } from 'react-navigation';

export type ActionType = {|
  type: 'REDIRECT_AFTER_LOGIN',
  payload: {|
    isFirstTime: boolean,
  |},
|};

export const redirectAfterLogin = (isFirstTime: boolean): ActionType => ({
  type: 'REDIRECT_AFTER_LOGIN',
  payload: {
    isFirstTime,
  },
});

export const resetToMain = (isFirstTime: boolean = true) =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'main' })],
  });

export const resetToLogin = () =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.reset({ routeName: 'login' })],
    key: null,
  });
