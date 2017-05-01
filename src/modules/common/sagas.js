// @flow
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { fetchCurrentUser } from '../users/sagas';
import { fetchBoards } from '../boards/sagas';
import { fetchCurrentProject } from '../projects/sagas';
import { fetchSprints } from '../sprints/sagas';
import { fetchDoneCards, fetchNotDoneCards } from '../cards/sagas';
import { syncIsSuccessful } from './';
import { isSyncSuccessfulSelector } from '../sync';

function* fetchBaseData(): Generator<*, *, *> {
  yield [call(fetchCurrentUser), call(fetchBoards)];
  yield call(fetchProjectData);

  if (yield select(isSyncSuccessfulSelector)) {
    yield put(syncIsSuccessful());
  }
}

export function* fetchProjectData(): Generator<*, *, *> {
  yield call(fetchCurrentProject);
  yield call(fetchSprints);
  yield [call(fetchNotDoneCards), call(fetchDoneCards)];
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BASE_DATA', fetchBaseData)];
}
