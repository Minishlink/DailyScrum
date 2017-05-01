// @flow
export type ActionType =
  | {|
      type: 'FETCH_BASE_DATA',
    |}
  | {|
      type: 'SUCCESSFUL_SYNC',
    |};

export function fetchBaseData(): ActionType {
  return { type: 'FETCH_BASE_DATA' };
}

export function syncIsSuccessful(): ActionType {
  return { type: 'SUCCESSFUL_SYNC' };
}
