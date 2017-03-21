const TRELLO_APP_KEY = "***REMOVED***"; // Scrumble App Key

export default class Trello {
  static getLoginURL = () => {
    return "https://trello.com/1/authorize?" +
      `key=${TRELLO_APP_KEY}&` +
      "expiration=never&" +
      "name=Daily%20Scrum&" +
      "return_url=dailyscrum://login&" +
      "scope=read,account";
  };

  static getUser = token => {
    return fetch(`https://api.trello.com/1/members/me?fields=fullName&boards=all&board_fields=name&key=${TRELLO_APP_KEY}&token=${token}`)
      .then(res => res.json());
  };
}
