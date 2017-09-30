// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';

const initialState: TipsStateType = {
  read: [],
};

export default (state: TipsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'MARK_TIP_AS_READ':
      return {
        ...state,
        read: [...state.read, action.payload.id],
      };

    case 'RESET_STORE':
      return initialState;

    default:
      return state;
  }
};

function tipSelector(state: StateType, id: TipIDType): ?TipType {
  return tips[id];
}

export function getTipIfNotReadSelector(state: StateType, id: TipIDType): ?TipType {
  const tip = !state.tips.read.includes(id) && tipSelector(state, id);
  if (!tip) return null;
  return tip;
}

export type TipsStateType = {|
  read: TipIDType[],
|};

export type TipIDType = 'CARDLISTS_OPEN_TRELLO';

export type TipType = {
  id: TipIDType,
  text: string,
};

export const tips = {
  CARDLISTS_OPEN_TRELLO: {
    id: 'CARDLISTS_OPEN_TRELLO',
    text:
      "Long press a card for more actions, like opening the card on Trello! It's even better when you have the Trello app ;)",
  },
};
