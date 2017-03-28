// @flow
import type { CardsType } from './reducer';

export type ActionType =
  | {
      type: 'SET_CARDS',
      payload: {
        cards: CardsType,
      },
    }
  | {
      type: 'FETCH_CARDS',
    };

export function setCards(cards: CardsType): ActionType {
  return {
    type: 'SET_CARDS',
    payload: {
      cards,
    },
  };
}

export function fetchCards(): ActionType {
  return { type: 'FETCH_CARDS' };
}
