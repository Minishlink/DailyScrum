export default class {
  static login = trelloToken => {
    return new Promise((resolve, reject) => {
      fetch('https://api.scrumble.io/v1/ScrumbleUsers/trello-login', {
        method: 'POST',
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({trelloToken}),
      }).then(result => result.json()).then(result => {
        if (!result || !result.token) reject(result.error);
        resolve(result.token);
      });
    });
  };

  static getCurrentProject = token => {
    return new Promise((resolve, reject) => {
      fetch('https://api.scrumble.io/v1/Projects/current', {
        method: 'GET',
        headers: new Headers({
          "Authorization": token,
        }),
      }).then(result => result.json()).then(result => {
        if (result.error) reject(result.error);
        resolve(result);
      });
    });
  }
}
