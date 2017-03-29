// @flow
import type { CardsType } from './reducer';

export type ActionType =
  | {
      type: 'PUT_CARDS',
      payload: {
        cards: { [name: string]: CardsType },
      },
    }
  | {
      type: 'FETCH_DONE_CARDS',
    }
  | {
      type: 'FETCH_NOT_DONE_CARDS',
    };

export function putCards(cards: { [name: string]: CardsType }): ActionType {
  return {
    type: 'PUT_CARDS',
    payload: {
      cards,
    },
  };
}

export function fetchDoneCards(): ActionType {
  return { type: 'FETCH_DONE_CARDS' };
}

export function fetchNotDoneCards(): ActionType {
  return { type: 'FETCH_NOT_DONE_CARDS' };
}
