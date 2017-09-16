import { SCRUMBLE_API_URL } from 'DailyScrum/environment';
import { handleFetchResponse } from './Fetch';

export default class {
  static login = trelloToken =>
    fetch(SCRUMBLE_API_URL + '/ScrumbleUsers/trello-login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ trelloToken }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (!result || !result.token) return Promise.reject(result.error);
        return result.token;
      });

  static getCurrentProject = token =>
    fetch(SCRUMBLE_API_URL + '/Projects/current', {
      method: 'GET',
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });

  static getProjectByBoard = (token, boardId) =>
    fetch(SCRUMBLE_API_URL + `/Projects?filter=${JSON.stringify({ where: { boardId: boardId } })}`, {
      method: 'GET',
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result[0];
      });

  static setCurrentProject = (token, projectId) =>
    fetch(SCRUMBLE_API_URL + '/ScrumbleUsers/project', {
      method: 'PUT',
      headers: new Headers({
        Authorization: token,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ projectId }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });

  static getCurrentSprint = token =>
    fetch(SCRUMBLE_API_URL + '/Sprints/active', {
      method: 'GET',
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });

  static getSprintsFromProject = (token, projectId) =>
    fetch(SCRUMBLE_API_URL + `/Projects/${projectId}/sprints`, {
      method: 'GET',
      headers: new Headers({
        Authorization: token,
      }),
    })
      .then(handleFetchResponse)
      .then(result => {
        if (result.error) return Promise.reject(result.error);
        return result;
      });
}
