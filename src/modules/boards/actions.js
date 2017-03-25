// @flow
import type { TrelloBoardType } from 'DailyScrum/src/types/Trello/Board';

export type ActionType = {
  type: 'PUT_BOARD',
  payload: TrelloBoardType,
} | {
  type: 'FETCH_CURRENT_BOARD',
};

export function putBoard(payload: TrelloBoardType): ActionType {
  return {
    type: 'PUT_BOARD',
    payload,
  };
}

export function fetchCurrentBoard(): ActionType {
  return { type: 'FETCH_CURRENT_BOARD' };
}
