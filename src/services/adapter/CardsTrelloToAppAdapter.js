// @flow
import { getPoints, getPostPoints } from '../../services/Trello';
import type { StoreCardType } from '../../types';
import type { TrelloCardType } from '../../types/Trello';

export default (
  cards: TrelloCardType[],
  validateColumnId?: ?string = null,
  doneColumnId?: ?string = null
): StoreCardType[] => cards.map(card => adaptCard(card, validateColumnId, doneColumnId));

function adaptCard(card: TrelloCardType, validateColumnId: ?string, doneColumnId: ?string): StoreCardType {
  const pointsAndNewName = formatPoints(card.name);
  // our Trello endpoint returns cards with actions of moving the card to other list (updateCard:idList) sorted by desc date
  const lastMoveCardToListAction = card.actions.length ? card.actions[0] : null;
  const endDevelopmentAction = getActionByColumn(card.actions, validateColumnId);
  const doneAction = getActionByColumn(card.actions, doneColumnId);

  return {
    ...pointsAndNewName,
    id: card.id,
    idShort: card.idShort,
    dateLastActivity: lastMoveCardToListAction ? lastMoveCardToListAction.date : card.dateLastActivity,
    dateEndDevelopment: endDevelopmentAction ? endDevelopmentAction.date : null,
    dateDone: doneAction ? doneAction.date : null,
    idMembers: card.idMembers,
    url: card.shortUrl,
    labels: card.labels,
  };
}

const getActionByColumn = (actions, columnId): ?{ date: number } =>
  columnId && actions.length
    ? actions.find(action => action.data && action.data.listAfter && action.data.listAfter.id === columnId)
    : null;

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
