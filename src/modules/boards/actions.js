// @flow
import type { TrelloBoardType } from 'DailyScrum/src/types/Trello/Board';

export type ActionType = {
  type: 'PUT_BOARD',
  payload: TrelloBoardType,
} | {
  type: 'FETCH_BOARD',
  payload: {
    id: string,
  },
};

export function putBoard(payload: TrelloBoardType): ActionType {
  return {
    type: 'PUT_BOARD',
    payload,
  };
}

export function fetchBoard(id: string): ActionType {
  return { type: 'FETCH_BOARD', payload: { id } };
}
