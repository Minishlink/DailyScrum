// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import { teamSelector } from '../sprints/reducer';
import { ScrumbleTeamMemberType } from '../../types/Scrumble/common';
import { getPoints } from '../../services/Trello';
import { getLastWorkableDayTime } from '../../services/Time';

const initialState: CardsType = {
  done: [],
  blocked: [],
  doing: [],
  sprint: [],
  toValidate: [],
};

export default (state: CardsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'PUT_CARDS':
      return {
        ...state,
        ...action.payload.cards,
      };

    default:
      return state;
  }
};

function formatCards(state: StateType, cards: CardType[]) {
  const team = teamSelector(state);
  if (!team) return cards;

  return cards.map(card => {
    const pointsAndNewName = formatPoints(card.name);
    return {
      ...card,
      members: card.idMembers.map(id => team.find(member => member.id === id)),
      points: pointsAndNewName.points,
      name: pointsAndNewName.name,
    };
  });
}

function formatPoints(name) {
  const points = getPoints(name);
  if (points !== null) {
    name = name.replace(`(${points})`, '').trim();
  }

  return {
    name,
    points,
  };
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
  return formatCards(
    state,
    cards.filter(
      card => card.idMembers.length > 0
    )
  );
}

export type CardsType = {
  done: CardType[],
  blocked: CardType[],
  doing: CardType[],
  sprint: CardType[],
  toValidate: CardType[],
};

export type CardType = {
  idShort: string,
  name: string,
  idMembers: [],
  dateLastActivity: string,
  members: ScrumbleTeamMemberType[],
  points: ?number,
}; // TODO
