// @flow
export type ActionType = {
  type: 'FETCH_BASE_DATA',
};

export function fetchBaseData(): ActionType {
  return { type: 'FETCH_BASE_DATA' };
}
