// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import { currentProjectSelector } from '../projects/reducer';

const initialState: CardsType = [];

export default (state: CardsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'SET_CARDS':
      // TODO add members here
      return action.payload.cards;

    default:
      return state;
  }
};

export function yesterdayCardsSelector(state: StateType): CardType[] {
  const project = currentProjectSelector(state);
  if (!project) return [];

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
  return state.cards.filter(card => new Date(card.dateLastActivity).getTime() > lastWorkableDayTime).map(card => ({
    ...card,
    members: card.idMembers.map(id => project.team.find(member => member.id === id)),
  }));
}

export type CardsType = CardType[];

export type CardType = any; // TODO
