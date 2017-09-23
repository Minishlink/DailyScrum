// @flow
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
