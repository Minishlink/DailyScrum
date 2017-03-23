// @flow

export type ActionType =
  | {
  type: 'LOGIN',
  payload: {
    trelloToken: string,
    scrumbleToken: string,
  },
}

export function login(payload: *): ActionType {
  return {
    type: 'LOGIN',
    payload,
  };
}
