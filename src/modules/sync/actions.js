// @flow
export type ActionType =
  | {|
      type: 'START_SYNC',
      payload: {
        name: string,
        key: string,
      },
    |}
  | {|
      type: 'END_SYNC',
      payload: {
        name: string,
        key: string,
        error: ?(string | true),
      },
    |}
  | {|
      type: 'CLEAR_ERRORS',
      payload: {
        name: string,
        key: string,
      },
    |};

export const startSync = (name: string, key: string): ActionType => ({
  type: 'START_SYNC',
  payload: { name, key },
});

export const endSync = (name: string, key: string, error: ?(string | true) = null): ActionType => ({
  type: 'END_SYNC',
  payload: { name, key, error },
});

export const clearErrors = (name: string, key: string): ActionType => ({
  type: 'CLEAR_ERRORS',
  payload: { name, key },
});
