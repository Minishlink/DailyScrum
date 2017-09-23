// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { Alert } from 'react-native';
import { resetStore, putTokens } from './actions';
import type { ActionType } from './actions';
import * as Analytics from '../../services/Analytics';
import { redirectAfterLogin, resetToLogin } from '../navigation';

function* login(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGIN') return;
  try {
    const scrumbleToken = yield call(Scrumble.login, action.payload.trelloToken);
    yield put(putTokens(action.payload.trelloToken, scrumbleToken));
    yield put(redirectAfterLogin(true));
  } catch (error) {
    console.warn('[saga] login', error);
    yield put(resetToLogin());
    Alert.alert('Sorry!', 'There has been an error when trying to log you on Scrumble. ' + error);
  }
}

function* logout(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGOUT') return;
  try {
    yield put(resetToLogin());
    yield put(resetStore());
    Analytics.logEvent('logout');
  } catch (error) {
    console.warn('[saga] logout', error);
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('LOGIN', login), takeEvery('LOGOUT', logout)];
}
