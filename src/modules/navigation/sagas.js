// @flow
import { takeEvery, select, put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { NavigationActions } from 'react-navigation';
import type { ActionType } from './actions';
import { resetToMain } from './actions';
import { currentRouteSelector } from './reducer';

export function* redirectAfterLogin(action: ActionType): Generator<*, *, *> {
  if (action.type !== 'REDIRECT_AFTER_LOGIN') return;
  const currentRoute = yield select(currentRouteSelector);
  if (currentRoute.routeName !== 'login') return; // fixes multiple calls

  yield put(resetToMain());

  if (action.payload.isFirstTime) {
    yield call(delay, 100); // TODO remove this hack that fixes black screen
    yield put(NavigationActions.navigate({ routeName: 'projectSettings', params: { firstTime: true } }));
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('REDIRECT_AFTER_LOGIN', redirectAfterLogin)];
}
