// @flow
import type { TrelloBoardType } from 'DailyScrum/src/types/Trello';

export type ActionType =
  | {|
      type: 'PUT_BOARDS',
      payload: {|
        boards: TrelloBoardType[],
      |},
    |}
  | {|
      type: 'FETCH_BOARDS',
    |};

export function putBoards(boards: TrelloBoardType[]): ActionType {
  return {
    type: 'PUT_BOARDS',
    payload: { boards },
  };
}

export function fetchBoards(): ActionType {
  return { type: 'FETCH_BOARDS' };
}
