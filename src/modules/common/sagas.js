// @flow
import { takeEvery, put, call, select, race } from 'redux-saga/effects';
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
    timeout: call(delay, 10000),
  });

  yield put(endSync('common', 'base', timeout ? 'timeout' : null));

  if (yield select(isSyncSuccessfulSelector)) {
    yield put(syncIsSuccessful());
  } else {
    // TODO show modal/info
    console.warn('[saga] fetchBaseData', 'Probably a timeout');
  }
}

function* fetchBaseDataCalls(): Generator<*, *, *> {
  yield [call(fetchCurrentUser), call(fetchBoards)];
  yield call(fetchProjectData);
}

export function* fetchProjectData(): Generator<*, *, *> {
  yield call(fetchCurrentProject);
  yield call(fetchSprints);
  yield [call(fetchNotDoneCards), call(fetchDoneCards)];
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BASE_DATA', fetchBaseData)];
}
