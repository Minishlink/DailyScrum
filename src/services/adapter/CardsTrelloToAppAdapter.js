// @flow
import { getPoints } from '../../services/Trello';
import type { StoreCardType } from '../../types';
import type { TrelloCardType } from '../../types/Trello';

export default (cards: TrelloCardType[]): StoreCardType[] => {
  return cards.map(adaptCard);
};

function adaptCard(card: TrelloCardType): StoreCardType {
  const pointsAndNewName = formatPoints(card.name);
  // our Trello endpoint returns cards with actions of moving the card to other list (updateCard:idList) sorted by desc date
  const lastMoveCardToListAction = card.actions.length ? card.actions[0] : null;
  return {
    id: card.id,
    idShort: card.idShort,
    points: pointsAndNewName.points,
    name: pointsAndNewName.name,
    dateLastActivity: lastMoveCardToListAction ? lastMoveCardToListAction.date : card.dateLastActivity,
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
