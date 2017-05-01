// @flow
import { call, put, select, takeEvery, cancelled } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { setBoards } from './actions';
import { tokenSelector } from '../auth/reducer';
import { startSync, endSync } from '../sync';

export function* fetchBoards(): Generator<*, *, *> {
  try {
    yield put(startSync('boards', 'all'));
    const token = yield select(tokenSelector);
    const boards = yield call(Trello.getBoards, token.trello);
    yield put(setBoards(boards));
    yield put(endSync('boards', 'all'));
  } catch (error) {
    console.warn('[saga] fetchBoards', error);
    yield put(endSync('boards', 'all', error.message)); // TODO show modal with error
  } finally {
    if (yield cancelled()) {
      yield put(endSync('boards', 'all', 'cancelled'));
    }
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BOARDS', fetchBoards)];
}
