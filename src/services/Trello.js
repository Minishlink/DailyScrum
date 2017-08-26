import { TRELLO_APP_KEY, TRELLO_API_URL } from 'DailyScrum/environment';

export default class {
  static getLoginURL = () =>
    TRELLO_API_URL +
    '/authorize?' +
    `key=${TRELLO_APP_KEY}&` +
    'expiration=never&' +
    'name=Daily%20Scrum&' +
    'return_url=dailyscrum://login&' +
    'scope=read,account';

  static getCurrentUser = token =>
    fetch(
      `${TRELLO_API_URL}/members/me?fields=avatarHash,email,fullName,id,initials,username&key=${TRELLO_APP_KEY}&token=${token}`
    ).then(res => res.json());

  static getBoards = token =>
    fetch(
      `${TRELLO_API_URL}/members/me/boards?filter=open&fields=name,prefs,dateLastActivity&key=${TRELLO_APP_KEY}&token=${token}`
    )
      .then(res => res.json())
      .then(boards =>
        boards.sort((a, b) => new Date(b.dateLastActivity).getTime() - new Date(a.dateLastActivity).getTime())
      );

  static getCardsFromList = (token, listId) =>
    fetch(
      `${TRELLO_API_URL}/lists/${listId}/cards?fields=id,idShort,idMembers,name,dateLastActivity,shortUrl&actions=updateCard:idList&key=${TRELLO_APP_KEY}&token=${token}`
    ).then(res => res.json());
}

export const getPoints = text => {
  const points = text.match(/\(([0-9]*\.?[0-9]+)\)/);
  if (!points) return null;
  return Number(points[1]);
};

export const getPostPoints = text => {
  const points = text.match(/\[([0-9]*\.?[0-9]+)]/);
  if (!points) return null;
  return Number(points[1]);
};
