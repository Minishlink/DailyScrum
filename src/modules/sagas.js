// @flow
import { all, fork } from 'redux-saga/effects';
import { commonSaga } from './common';
import { authSaga } from './auth';
import { usersSaga } from './users';
import { sprintsSaga } from './sprints';
import { projectsSaga } from './projects';
import { boardsSaga } from './boards';
import { cardsSaga } from './cards';
import { qualityIndicatorsSaga } from './qualityIndicators';

export default function* rootSaga(): Generator<*, *, *> {
  yield all([
    fork(commonSaga),
    fork(authSaga),
    fork(usersSaga),
    fork(sprintsSaga),
    fork(projectsSaga),
    fork(boardsSaga),
    fork(cardsSaga),
    fork(qualityIndicatorsSaga),
  ]);
}
