// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import { putSprint, setCurrentSprint } from './actions';
import { authSelector } from '../auth/reducer';
import type { AuthType } from '../auth/reducer';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';

function* fetchCurrent() {
  const { token } = (yield select(authSelector): AuthType);
  const sprint: ScrumbleSprintType = yield call(Scrumble.getCurrentSprint, token.scrumble);
  yield put(putSprint(sprint));
  yield put(setCurrentSprint(sprint));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_SPRINT', fetchCurrent)];
}
