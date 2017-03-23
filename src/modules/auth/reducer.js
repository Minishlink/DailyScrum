// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';

const initialState: AuthType = {
  isLoggedIn: false,
};

export default (state: AuthType = initialState, action: ActionType) => {
  const token: TokenType = { ...state.token };

  switch (action.type) {
    case 'LOGIN':
      token.trello = action.payload.trelloToken;
      token.scrumble = action.payload.scrumbleToken;
      return {
        ...state,
        isLoggedIn: !!(token.trello && token.scrumble),
        token,
      };

    default:
      return state;
  }
}

export function authSelector(state: StateType): AuthType {
  return state.auth;
}

export type AuthType = {
  isLoggedIn: boolean,
  token?: TokenType,
};

type TokenType = {
  trello: string,
  scrumble: string,
}
