// @flow
import { takeEvery } from 'redux-saga/effects';
import { fetchCurrentProject } from '../projects/sagas';
import { fetchSprints } from '../sprints/sagas';

function* fetchBaseData() {
  yield* fetchCurrentProject();
  yield* fetchSprints();
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_BASE_DATA', fetchBaseData)];
}
