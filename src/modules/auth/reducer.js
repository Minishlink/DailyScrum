// @flow
import type { ActionType } from '../actions';
import type { StateType } from '../reducers';
import env from '../../../environment';

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
        trelloAppKey: env.TRELLO_APP_KEY,
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};

const trelloAppKeySelector = (state: StateType): ?string => state.auth.trelloAppKey;

export function tokenSelector(state: StateType): TokenType {
  return state.auth.token;
}

export function isLoggedInSelector(state: StateType): boolean {
  const token = tokenSelector(state);
  const storedTrelloAppKey = trelloAppKeySelector(state);
  const currentTrelloAppKey = env.TRELLO_APP_KEY;
  return storedTrelloAppKey === currentTrelloAppKey && !!token.trello && !!token.scrumble;
}

export type AuthStateType = {|
  token: TokenType,
  trelloAppKey?: string,
|};

export type TokenType = {|
  trello: ?string,
  scrumble: ?string,
|};
