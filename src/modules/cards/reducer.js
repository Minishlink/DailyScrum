// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import { currentProjectSelector } from '../projects/reducer';

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
  const project = currentProjectSelector(state);
  if (!project) return cards;

  return cards.map(card => {
    const pointsAndNewName = formatPoints(card.name);
    return {
      ...card,
      members: card.idMembers.map(id => project.team.find(member => member.id === id)),
      points: pointsAndNewName.points,
      name: pointsAndNewName.name,
    };
  });
}

function formatPoints(name) {
  const points = name.match(/\(([0-9]*\.?[0-9]+)\)/);
  if (!points) {
    return {
      name,
      points: null,
    };
  }

  return {
    name: name.replace(points[0], '').trim(),
    points: Number(points[1]),
  };
}

export function yesterdayCardsSelector(state: StateType): CardType[] {
  const today = new Date();
  today.setHours(9, 0, 0, 0);
  const todayWeekNumber = today.getDay();

  let offsetTime = 86400; // one day
  if (todayWeekNumber <= 1) {
    // sunday or monday
    offsetTime += 86400;
  }
  if (todayWeekNumber === 1) {
    // monday
    offsetTime += 86400;
  }

  const lastWorkableDayTime = today.getTime() - offsetTime * 1000;
  return formatCards(
    state,
    state.cards.done.filter(card => new Date(card.dateLastActivity).getTime() > lastWorkableDayTime)
  );
}

export function todayCardsSelector(state: StateType): CardType[] {
  return formatCards(
    state,
    [...state.cards.sprint, ...state.cards.doing, ...state.cards.blocked, ...state.cards.toValidate].filter(
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
  members: any[],
  points: ?number,
}; // TODO
