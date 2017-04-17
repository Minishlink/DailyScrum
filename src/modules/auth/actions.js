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

export const redirectAfterLogin = () =>
  NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'main' })],
  });
