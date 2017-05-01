// @flow
import { call, put, select } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { tokenSelector } from '../auth/reducer';
import { putUsersFromTrello, setCurrentUser } from './';
import { startSync, endSync } from '../sync';

export function* fetchCurrentUser(): Generator<*, *, *> {
  try {
    yield put(startSync('users', 'current'));
    const token = yield select(tokenSelector);
    const user = yield call(Trello.getCurrentUser, token.trello);
    yield put(putUsersFromTrello([user]));
    yield put(setCurrentUser(user.id));
    yield put(endSync('users', 'current'));
  } catch (error) {
    console.warn('[saga] fetchCurrentUser', error);
    yield put(endSync('users', 'current', error.message)); // TODO show modal with error
  }
}

export default function*(): Generator<*, *, *> {
  yield* [];
}
