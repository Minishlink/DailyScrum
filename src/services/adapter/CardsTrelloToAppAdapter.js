// @flow
import { getPoints, getPostPoints } from '../../services/Trello';
import type { StoreCardType } from '../../types';
import type { TrelloCardType } from '../../types/Trello';

export default (cards: TrelloCardType[], validateColumnId?: ?string = null): StoreCardType[] =>
  cards.map(card => adaptCard(card, validateColumnId));

function adaptCard(card: TrelloCardType, validateColumnId: ?string): StoreCardType {
  const pointsAndNewName = formatPoints(card.name);
  // our Trello endpoint returns cards with actions of moving the card to other list (updateCard:idList) sorted by desc date
  const lastMoveCardToListAction = card.actions.length ? card.actions[0] : null;
  // end of development is when you put the card in the to validate column
  const endDevelopmentAction =
    validateColumnId && card.actions.length
      ? card.actions.find(
          action => action.data && action.data.listAfter && action.data.listAfter.id === validateColumnId
        )
      : null;

  return {
    ...pointsAndNewName,
    id: card.id,
    idShort: card.idShort,
    dateLastActivity: lastMoveCardToListAction ? lastMoveCardToListAction.date : card.dateLastActivity,
    dateEndDevelopment: endDevelopmentAction ? endDevelopmentAction.date : null,
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
