// @flow
import { getPoints } from '../../services/Trello';
import type { StoreCardType } from '../../types';
import type { TrelloCardType } from '../../types/Trello';

export default (cards: TrelloCardType[]): StoreCardType[] => {
  return cards.map(adaptCard);
};

function adaptCard(card: TrelloCardType): StoreCardType {
  const pointsAndNewName = formatPoints(card.name);
  // TODO filter idMembers that aren't dev or archi
  // .filter(member => member.role === 'dev' || member.role === 'archi')
  return {
    id: card.id,
    idShort: card.idShort,
    points: pointsAndNewName.points,
    name: pointsAndNewName.name,
    dateLastActivity: card.dateLastActivity,
    idMembers: card.idMembers,
  };
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
