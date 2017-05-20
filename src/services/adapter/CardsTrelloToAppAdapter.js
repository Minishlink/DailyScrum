// @flow
import { getPoints, getPostPoints } from '../../services/Trello';
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
    ...pointsAndNewName,
    id: card.id,
    idShort: card.idShort,
    dateLastActivity: lastMoveCardToListAction ? lastMoveCardToListAction.date : card.dateLastActivity,
    idMembers: card.idMembers,
    url: card.shortUrl,
  };
}

function formatPoints(name) {
  const points = getPoints(name);
  const postPoints = getPostPoints(name);
  if (points !== null) {
    name = name.replace(`(${points})`, '').trim();
  }
  if (postPoints !== null) {
    name = name.replace(`[${postPoints}]`, '').trim();
  }

  return {
    name,
    points,
    postPoints,
  };
}
