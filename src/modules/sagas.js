// @flow
import { fork } from 'redux-saga/effects';
import { sprintsSaga } from './sprints';
import { projectsSaga } from './projects';
import { boardsSaga } from './boards';

export default function* rootSaga(): Generator<*, *, *> {
  yield [fork(sprintsSaga), fork(projectsSaga), fork(boardsSaga)];
}
