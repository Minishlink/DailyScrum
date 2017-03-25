// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { TrelloBoardType } from '../../types/Trello/Board';
import { currentProjectSelector } from "../projects/reducer";

const initialState: BoardsType = {};

export default (state: BoardsType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'PUT_BOARD':
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    default:
      return state;
  }
};

export function boardsSelector(state: StateType): BoardsType {
  return state.boards;
}

export function currentBoardSelector(state: StateType): ?BoardType {
  const currentProject = currentProjectSelector(state);

  if (currentProject) {
    return state.boards[currentProject.boardId];
  }

  return null;
}

export type BoardsType = { [key: string]: BoardType };

export type BoardType = TrelloBoardType;
