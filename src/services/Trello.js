const TRELLO_APP_KEY = '***REMOVED***'; // Scrumble App Key

export default class {
  static getLoginURL = () => {
    return 'https://trello.com/1/authorize?' +
      `key=${TRELLO_APP_KEY}&` +
      'expiration=never&' +
      'name=Daily%20Scrum&' +
      'return_url=dailyscrum://login&' +
      'scope=read,account';
  };

  static getCurrentUser = token => {
    return fetch(
      `https://api.trello.com/1/members/me?fields=avatarHash,email,fullName,id,initials,username&key=${TRELLO_APP_KEY}&token=${token}`
    ).then(res => res.json());
  };

  static getBoards = token => {
    return fetch(
      `https://api.trello.com/1/members/me/boards?filter=open&fields=name,prefs,dateLastActivity&key=${TRELLO_APP_KEY}&token=${token}`
    )
      .then(res => res.json())
      .then(boards =>
        boards.sort((a, b) => new Date(b.dateLastActivity).getTime() - new Date(a.dateLastActivity).getTime()));
  };

  static getBoard = (token, id) => {
    return fetch(`https://api.trello.com/1/boards/${id}?fields=all&key=${TRELLO_APP_KEY}&token=${token}`).then(res =>
      res.json());
  };

  static getCardsFromList = (token, listId) => {
    return fetch(
      `https://api.trello.com/1/lists/${listId}/cards?fields=all&key=${TRELLO_APP_KEY}&token=${token}`
    ).then(res => res.json());
  };
}

export const getPoints = text => {
  const points = text.match(/\(([0-9]*\.?[0-9]+)\)/);
  if (!points) return null;
  return Number(points[1]);
};
