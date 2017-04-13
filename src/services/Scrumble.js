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
  };

  static getProjectByBoard = (token, boardId) => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.scrumble.io/v1/Projects?filter=${JSON.stringify({"where":{"boardId": boardId}})}`, {
        method: 'GET',
        headers: new Headers({
          "Authorization": token,
        }),
      }).then(result => result.json()).then(result => {
        if (result.error) reject(result.error);
        resolve(result[0]);
      });
    });
  };

  static setCurrentProject = (token, projectId) => {
    return new Promise((resolve, reject) => {
      fetch('https://api.scrumble.io/v1/ScrumbleUsers/project', {
        method: 'PUT',
        headers: new Headers({
          "Authorization": token,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({projectId}),
      }).then(result => result.json()).then(result => {
        if (result.error) reject(result.error);
        resolve();
      });
    });
  };

  static getCurrentSprint = token => {
    return new Promise((resolve, reject) => {
      fetch('https://api.scrumble.io/v1/Sprints/active', {
        method: 'GET',
        headers: new Headers({
          "Authorization": token,
        }),
      }).then(result => result.json()).then(result => {
        if (result.error) reject(result.error);
        resolve(result);
      });
    });
  };

  static getSprintsFromProject = (token, projectId) => {
    return new Promise((resolve, reject) => {
      fetch(`https://api.scrumble.io/v1/Projects/${projectId}/sprints`, {
        method: 'GET',
        headers: new Headers({
          "Authorization": token,
        }),
      }).then(result => result.json()).then(result => {
        if (result.error) reject(result.error);
        resolve(result);
      });
    });
  };
}
