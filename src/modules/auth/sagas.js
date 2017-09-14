// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { putTokens, redirectAfterLogin } from './actions';
import type { ActionType } from './actions';

function* login(action: ActionType): Generator<*, *, *> {
  try {
    const scrumbleToken = yield call(Scrumble.login, action.payload.trelloToken);
    yield put(putTokens(action.payload.trelloToken, scrumbleToken));
    yield put(redirectAfterLogin(true));
  } catch (error) {
    console.warn('[saga] login', error);
    // TODO show error modal
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('LOGIN', login)];
}
