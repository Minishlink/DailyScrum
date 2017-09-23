// @flow
import { NavigationActions } from 'react-navigation';

export type ActionType =
  | {|
      type: 'PUT_TOKENS',
      payload: {|
        trelloToken: string,
        scrumbleToken: string,
      |},
    |}
  | {|
      type: 'LOGIN',
      payload: {|
        trelloToken: string,
      |},
    |}
  | {|
      type: 'LOGOUT',
    |}
  | {|
      type: 'RESET_STORE',
    |};

export function putTokens(trelloToken: string, scrumbleToken: string): ActionType {
  return {
    type: 'PUT_TOKENS',
    payload: {
      trelloToken,
      scrumbleToken,
    },
  };
}

export function login(trelloToken: string): ActionType {
  return {
    type: 'LOGIN',
    payload: {
      trelloToken,
    },
  };
}

export const resetStore = () => ({
  type: 'RESET_STORE',
});

export const logout = () => ({
  type: 'LOGOUT',
});

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
