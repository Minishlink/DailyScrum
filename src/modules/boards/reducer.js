// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { TrelloBoardType } from '../../types/Trello';
import { currentProjectSelector } from '../projects/reducer';

const initialState: BoardsStateType = {
  list: {},
};

export default (state: BoardsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'PUT_BOARDS':
      const { list } = { ...state };
      for (let board of action.payload.boards) {
        list[board.id] = board;
      }

      return {
        ...state,
        list,
      };

    default:
      return state;
  }
};

export function boardsSelector(state: StateType): BoardsType {
  return state.boards.list;
}

export function currentBoardSelector(state: StateType): ?BoardType {
  const boards = boardsSelector(state);
  const currentProject = currentProjectSelector(state);

  if (currentProject) {
    return boards[currentProject.boardId];
  }

  return null;
}

export type BoardsStateType = {
  list: BoardsType
};

export type BoardsType = { [key: string]: BoardType };

export type BoardType = TrelloBoardType;
