// @flow
import type { ActionType } from '../actions';

const initialState: CardListsStateType = {
  today: {
    filteredMember: null,
    userPoints: {},
  },
  yesterday: {
    filteredMember: null,
    userPoints: {},
  },
};

export default (state: CardListsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'FILTER_BY_MEMBER':
      return {
        ...state,
        [action.payload.cardListKey]: {
          ...state[action.payload.cardListKey],
          filteredMember: action.payload.filteredMember,
        },
      };

    case 'SET_USER_POINTS':
      const cardListState = state[action.payload.cardListKey];
      const filteredMember =
        cardListState.filteredMember && Object.keys(action.payload.userPoints).includes(cardListState.filteredMember)
          ? cardListState.filteredMember
          : null;
      return {
        ...state,
        [action.payload.cardListKey]: {
          ...cardListState,
          userPoints: action.payload.userPoints,
          filteredMember,
        },
      };

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

export type CardListsKeyType = $Keys<CardListsStateType>;

export type CardListsStateType = {|
  today: CardListStateType,
  yesterday: CardListStateType,
|};

export type CardListStateType = {|
  filteredMember: ?string,
  userPoints: { [key: string]: number },
|};
