// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { NavigationActions } from 'react-navigation';
import { resetStore, putTokens, redirectAfterLogin } from './actions';
import type { ActionType } from './actions';
import * as Analytics from '../../services/Analytics';

function* login(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGIN') return;
  try {
    const scrumbleToken = yield call(Scrumble.login, action.payload.trelloToken);
    yield put(putTokens(action.payload.trelloToken, scrumbleToken));
    yield put(redirectAfterLogin(true));
  } catch (error) {
    console.warn('[saga] login', error);
    // TODO show error modal
  }
}

function* logout(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGOUT') return;
  try {
    yield put(
      NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.reset({ routeName: 'login' })],
        key: null,
      })
    );
    yield put(resetStore());
    Analytics.logEvent('logout');
  } catch (error) {
    console.warn('[saga] logout', error);
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('LOGIN', login), takeEvery('LOGOUT', logout)];
}
