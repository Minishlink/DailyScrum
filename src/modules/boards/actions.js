// @flow
import type { TrelloBoardType } from '../../types/Trello';

export type ActionType =
  | {|
      type: 'PUT_BOARDS',
      payload: {|
        boards: TrelloBoardType[],
      |},
    |}
  | {|
      type: 'SET_BOARDS',
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

export function setBoards(boards: TrelloBoardType[]): ActionType {
  return {
    type: 'SET_BOARDS',
    payload: { boards },
  };
}

export function fetchBoards(): ActionType {
  return { type: 'FETCH_BOARDS' };
}
