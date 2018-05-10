// @flow
import { call, put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { resetStore, putTokens } from './actions';
import type { ActionType } from './actions';
import { Scrumble, Analytics } from '../../services';
import Navigation from '../../services/Navigation';

function* login(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGIN') return;
  try {
    const scrumbleToken = yield call(Scrumble.login, action.payload.trelloToken);
    yield put(putTokens(action.payload.trelloToken, scrumbleToken));
    Navigation.redirectAfterLogin(true);
  } catch (error) {
    console.warn('[saga] login', error);
    Navigation.resetToLogin();
    Alert.alert('Sorry!', 'There has been an error when trying to log you on Scrumble. ' + error);
  }
}

function* logout(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'LOGOUT') return;
  try {
    Navigation.resetToLogin();
    yield put(resetStore());
    Analytics.logEvent('logout');
  } catch (error) {
    console.warn('[saga] logout', error);
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('LOGIN', login), takeEvery('LOGOUT', logout)];
}
