// @flow
import { takeEvery } from 'redux-saga/effects';
import { fetchCurrentProject } from '../projects/sagas';
import { fetchSprints } from '../sprints/sagas';
import { fetchDoneCards, fetchNotDoneCards } from '../cards/sagas';

function* fetchBaseData() {
  yield* fetchCurrentProject();
  yield* fetchSprints();
  yield* fetchNotDoneCards();
  yield* fetchDoneCards();
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BASE_DATA', fetchBaseData)];
}
