// @flow
import { fork } from 'redux-saga/effects';
import { commonSaga } from './common';
import { authSaga } from './auth';
import { sprintsSaga } from './sprints';
import { projectsSaga } from './projects';
import { boardsSaga } from './boards';
import { cardsSaga } from './cards';

export default function* rootSaga(): Generator<*, *, *> {
  yield [fork(commonSaga), fork(authSaga), fork(sprintsSaga), fork(projectsSaga), fork(boardsSaga), fork(cardsSaga)];
}
