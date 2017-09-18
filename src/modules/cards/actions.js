// @flow
import type { CardType } from '../../types';

export type ActionType =
  | {|
      type: 'PUT_CARDS',
      payload: {|
        cards: { [name: string]: CardType[] },
      |},
    |}
  | {|
      type: 'FETCH_DONE_CARDS',
    |}
  | {|
      type: 'FETCH_NOT_DONE_CARDS',
    |}
  | {|
      type: 'CLEAR_CARDS',
    |}
  | {|
      type: 'FETCH_CARDS',
    |};

export function putCards(cards: { [name: string]: CardType[] }): ActionType {
  return {
    type: 'PUT_CARDS',
    payload: {
      cards,
    },
  };
}

export function clearCards(): ActionType {
  return { type: 'CLEAR_CARDS' };
}

export function fetchCards(): ActionType {
  return { type: 'FETCH_CARDS' };
}

export function fetchDoneCards(): ActionType {
  return { type: 'FETCH_DONE_CARDS' };
}

export function fetchNotDoneCards(): ActionType {
  return { type: 'FETCH_NOT_DONE_CARDS' };
}
