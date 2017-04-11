// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { putBoard } from './actions';
import { tokenSelector } from '../auth/reducer';
import type { ActionType } from './actions'
import type { TrelloBoardType } from '../../types/Trello/Board';

function* fetchBoard(action: ActionType) {
  const token = yield select(tokenSelector);
  const board: TrelloBoardType = yield call(Trello.getBoard, token.trello, action.payload.id);
  yield put(putBoard(board));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BOARD', fetchBoard)];
}
