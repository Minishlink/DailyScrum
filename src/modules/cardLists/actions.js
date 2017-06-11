// @flow
import type { CardListsKeyType } from './reducer';

export type ActionType =
  | {|
      type: 'FILTER_BY_MEMBER',
      payload: {|
        filteredMember: ?string,
        cardListKey: CardListsKeyType,
      |},
    |}
  | {|
      type: 'SET_USER_POINTS',
      payload: {|
        userPoints: { [key: string]: number },
        cardListKey: CardListsKeyType,
      |},
    |};

export function makeFilterByMember(cardListKey: CardListsKeyType) {
  return (filteredMember: ?string): ActionType => ({
    type: 'FILTER_BY_MEMBER',
    payload: { filteredMember, cardListKey },
  });
}

export function setUserPoints(userPoints: { [key: string]: number }, cardListKey: CardListsKeyType) {
  return {
    type: 'SET_USER_POINTS',
    payload: { userPoints, cardListKey },
  };
}
