// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import { devTeamSelector } from '../sprints/reducer';
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
  const team = devTeamSelector(state) || [];
  return cards.filter(card => card.idMembers.length > 0).map(card => {
    const members = card.idMembers.map(id => team.find(member => member.id === id)).filter(Boolean);
    const idMembers = members.map(member => member.id); // filter dev/archi
    return {
      ...card,
      members,
      idMembers,
    };
  });
}

export function yesterdayCardsSelector(state: StateType): CardListsType {
  const lastWorkableDayTime = getLastWorkableDayTime();
  const cards = state.cards.done;
  if (!cards) return { done: [] };
  return {
    done: formatCards(
      state,
      cards.filter(card => new Date(card.dateLastActivity).getTime() > lastWorkableDayTime)
    ),
  };
}

export function todayCardsSelector(state: StateType): CardListsType {
  const lists = ['sprint', 'doing', 'blocked', 'toValidate'];
  const cardLists = {};
  lists.forEach(list => {
    const cards = state.cards[list];
    if (cards) {
      cardLists[list] = formatCards(state, cards);
    }
  });
  return cardLists;
}

export type CardsStateType = $Exact<CardListsType>;

export type CardListsType = {
  done?: CardType[],
  blocked?: CardType[],
  doing?: CardType[],
  sprint?: CardType[],
  toValidate?: CardType[],
};
