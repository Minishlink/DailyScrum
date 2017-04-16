// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { UserType } from 'DailyScrum/src/types';
import { adaptUserFromScrumble } from 'DailyScrum/src/services/adapter';

const initialState: UsersStateType = {
  currentUser: null,
  list: {},
};

export default (state: UsersStateType = initialState, action: ActionType) => {
  const { list } = { ...state };

  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.id,
      };

    case 'PUT_USERS_FROM_TRELLO':
      for (let user of action.payload.users) {
        list[user.id] = {
          ...list[user.id],
          ...user,
        };
      }
      return {
        ...state,
        list,
      };

    case 'PUT_USERS_FROM_SCRUMBLE':
      for (let user of action.payload.users) {
        list[user.id] = adaptUserFromScrumble(user, list[user.id]);
      }
      return {
        ...state,
        list,
      };

    case 'CLEAR_OTHER_USERS':
      const currentUser = state.currentUser ? list[state.currentUser] : null;
      return {
        ...state,
        list: currentUser ? { [currentUser.id]: currentUser } : {},
      };

    default:
      return state;
  }
};

export function usersSelector(state: StateType): UsersType {
  return state.users.list;
}

export function currentUserSelector(state: StateType): ?UserType {
  const users = usersSelector(state);
  if (state.users.currentUser) {
    return users[state.users.currentUser];
  }

  return null;
}

export function userSelectorById(state: StateType, id: string): ?UserType {
  const users = usersSelector(state);
  return users[id];
}

export type UsersStateType = {|
  currentUser: ?string,
  list: UsersType,
|};

export type UsersType = {
  [key: string]: UserType,
};
