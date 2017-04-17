// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { putBoards } from './actions';
import { tokenSelector } from '../auth/reducer';

export function* fetchBoards(): Generator<*, *, *> {
  try {
    const token = yield select(tokenSelector);
    const boards = yield call(Trello.getBoards, token.trello);
    yield put(putBoards(boards));
  } catch (error) {
    console.warn('[saga] fetchBoards', error);
    // TODO show modal with error
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BOARDS', fetchBoards)];
}
