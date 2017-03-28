// @flow
import { fork } from 'redux-saga/effects';
import { commonSaga } from './common';
import { sprintsSaga } from './sprints';
import { projectsSaga } from './projects';
import { boardsSaga } from './boards';

export default function* rootSaga(): Generator<*, *, *> {
  yield [fork(commonSaga), fork(sprintsSaga), fork(projectsSaga), fork(boardsSaga)];
}
