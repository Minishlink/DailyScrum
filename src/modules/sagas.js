// @flow
import { fork } from 'redux-saga/effects';
import { sprintsSaga } from './sprints';

export default function* rootSaga(): Generator<*, *, *> {
  yield [fork(sprintsSaga)];
}
