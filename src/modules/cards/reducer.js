// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import { teamSelector } from '../sprints/reducer';
import { getLastWorkableDayTime } from '../../services/Time';
import { adaptCardsFromTrello } from '../../services/adapter';
import { CardType, StoreCardType } from '../../types';

const initialState: CardsStateType = {
  done: [],
  blocked: [],
  doing: [],
  sprint: [],
  toValidate: [],
};

export default (state: CardsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'PUT_CARDS':
      for (let key in action.payload.cards) {
        action.payload.cards[key] = adaptCardsFromTrello(action.payload.cards[key]);
      }
      return {
        ...state,
        ...action.payload.cards,
      };

    case 'CLEAR_CARDS':
      return { ...initialState };

    default:
      return state;
  }
};

function formatCards(state: StateType, cards: StoreCardType[]): CardType[] {
  const team = teamSelector(state) || [];
  return cards.map(card => {
    return {
      ...card,
      members: card.idMembers.map(id => team.find(member => member.id === id)).filter(Boolean),
    };
  });
}

export function yesterdayCardsSelector(state: StateType): CardType[] {
  const lastWorkableDayTime = getLastWorkableDayTime();
  return formatCards(
    state,
    state.cards.done.filter(card => new Date(card.dateLastActivity).getTime() > lastWorkableDayTime)
  );
}

export function todayCardsSelector(state: StateType): CardType[] {
  const cards = [...state.cards.sprint, ...state.cards.doing, ...state.cards.blocked, ...state.cards.toValidate];
  return formatCards(state, cards.filter(card => card.idMembers.length > 0));
}

export type CardsStateType = {|
  done: CardType[],
  blocked: CardType[],
  doing: CardType[],
  sprint: CardType[],
  toValidate: CardType[],
|};
