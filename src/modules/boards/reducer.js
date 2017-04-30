// @flow
import type { ActionType } from './actions';
import type { StateType } from '../reducers';
import type { BoardType } from '../../types';
import { currentProjectSelector } from '../projects/reducer';
import { adaptBoardFromTrello } from '../../services/adapter';

const initialState: BoardsStateType = {
  list: {},
};

export default (state: BoardsStateType = initialState, action: ActionType) => {
  switch (action.type) {
    case 'PUT_BOARDS':
      const { list } = { ...state };
      for (let board of action.payload.boards) {
        list[board.id] = adaptBoardFromTrello(board);
      }

      return {
        ...state,
        list,
      };

    case 'SET_BOARDS':
      const newList = {};
      for (let board of action.payload.boards) {
        newList[board.id] = adaptBoardFromTrello(board);
      }

      return {
        ...state,
        list: newList,
      };

    default:
      return state;
  }
};

export function boardsSelector(state: StateType): BoardsType {
  return state.boards.list;
}

export function boardsListSelector(state: StateType): BoardType[] {
  return Object.values(state.boards.list);
}

export function currentBoardSelector(state: StateType): ?BoardType {
  const boards = boardsSelector(state);
  const currentProject = currentProjectSelector(state);

  if (currentProject) {
    return boards[currentProject.boardId];
  }

  return null;
}

export type BoardsStateType = {|
  list: BoardsType,
|};

export type BoardsType = { [key: string]: BoardType };
