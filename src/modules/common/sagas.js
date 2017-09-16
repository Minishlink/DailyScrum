// @flow
import { all, takeEvery, put, call, select, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { fetchCurrentUser } from '../users/sagas';
import { fetchBoards } from '../boards/sagas';
import { fetchCurrentProject } from '../projects/sagas';
import { fetchSprints } from '../sprints/sagas';
import { fetchDoneCards, fetchNotDoneCards } from '../cards/sagas';
import { syncIsSuccessful } from './';
import { startSync, endSync } from '../sync';
import { isSyncSuccessfulSelector } from '../sync';

function* fetchBaseData(): Generator<*, *, *> {
  yield put(startSync('common', 'base'));

  const { timeout } = yield race({
    base: call(fetchBaseDataCalls),
    timeout: call(delay, 30000),
  });

  if (yield select(isSyncSuccessfulSelector)) {
    yield put(endSync('common', 'base'));
    yield put(syncIsSuccessful());
  } else {
    if (timeout) {
      yield put(endSync('common', 'base', 'Timeout'));
    } else {
      yield put(endSync('common', 'base', 'Network request failed'));
    }
  }
}

function* fetchBaseDataCalls(): Generator<*, *, *> {
  yield all([call(fetchCurrentUser), call(fetchBoards)]);
  yield call(fetchProjectData);
}

export function* fetchProjectData(): Generator<*, *, *> {
  yield call(fetchCurrentProject);
  yield call(fetchSprints);
  yield all([call(fetchNotDoneCards), call(fetchDoneCards)]);
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BASE_DATA', fetchBaseData)];
}
