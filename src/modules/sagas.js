// @flow
import { fork } from 'redux-saga/effects';
import { sprintsSaga } from './sprints';
import { projectsSaga } from './projects';

export default function* rootSaga(): Generator<*, *, *> {
  yield [fork(sprintsSaga), fork(projectsSaga)];
}
