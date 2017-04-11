// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { putTokens, redirectAfterLogin } from './actions';
import type { ActionType } from './actions';

function* login(action: ActionType): Generator<*, *, *> {
  const scrumbleToken = yield call(Scrumble.login, action.payload.trelloToken);
  yield put(putTokens(action.payload.trelloToken, scrumbleToken));
  yield put(redirectAfterLogin());
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('LOGIN', login)];
}
