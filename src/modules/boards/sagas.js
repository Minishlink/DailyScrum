// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Trello from 'DailyScrum/src/services/Trello';
import { putBoard } from './actions';
import { authSelector } from '../auth/reducer';
import { currentProjectSelector } from "../projects/reducer";
import type { AuthType } from '../auth/reducer';
import type { ProjectType } from '../projects/reducer';
import type { TrelloBoardType } from "../../types/Trello/Board";

function* fetchCurrentBoard() {
  const currentProject = (yield select(currentProjectSelector): ProjectType);
  if (!currentProject) return;
  const { token } = (yield select(authSelector): AuthType);
  const board: TrelloBoardType = yield call(Trello.getBoard, token.trello, currentProject.boardId);
  yield put(putBoard(board));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_BOARD', fetchCurrentBoard)];
}
