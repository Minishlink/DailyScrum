// @flow
import type { TrelloMemberType } from '../../types/Trello';
import type { ScrumbleTeamType } from '../../types/Scrumble';

export type ActionType =
  | {|
      type: 'PUT_USERS_FROM_TRELLO',
      payload: {|
        users: TrelloMemberType[],
      |},
    |}
  | {|
      type: 'PUT_USERS_FROM_SCRUMBLE',
      payload: {|
        users: ScrumbleTeamType,
      |},
    |}
  | {|
      type: 'SET_CURRENT_USER',
      payload: {|
        id: string,
      |},
    |}
  | {|
      type: 'CLEAR_OTHER_USERS',
    |};

export function putUsersFromTrello(users: TrelloMemberType[]): ActionType {
  return {
    type: 'PUT_USERS_FROM_TRELLO',
    payload: { users },
  };
}

export function putUsersFromScrumble(users: ScrumbleTeamType): ActionType {
  return {
    type: 'PUT_USERS_FROM_SCRUMBLE',
    payload: { users },
  };
}

export function setCurrentUser(id: string): ActionType {
  return {
    type: 'SET_CURRENT_USER',
    payload: { id },
  };
}

export function clearOtherUsers(): ActionType {
  return {
    type: 'CLEAR_OTHER_USERS',
  };
}
