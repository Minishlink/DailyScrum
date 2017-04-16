// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { MemberType } from '../../types';

const initialState: AuthStateType = {
  token: {
    trello: null,
    scrumble: null,
  },
};

export default (state: AuthStateType = initialState, action: ActionType) => {
  const { token } = { ...state };

  switch (action.type) {
    case 'PUT_TOKENS':
      token.trello = action.payload.trelloToken;
      token.scrumble = action.payload.scrumbleToken;
      return {
        ...state,
        token,
      };

    default:
      return state;
  }
}

export function tokenSelector(state: StateType): TokenType {
  return state.auth.token;
}

export function isLoggedInSelector(state: StateType): boolean {
  const token = tokenSelector(state);
  return !!token.trello && !!token.scrumble;
}

export type AuthStateType = {|
  token: TokenType,
|};

export type TokenType = {|
  trello: ?string,
  scrumble: ?string,
|};
