// @flow
import { call, put, select } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { tokenSelector } from '../auth/reducer';
import { putUsersFromTrello, setCurrentUser } from './';

export function* fetchCurrentUser(): Generator<*, *, *> {
  try {
    const token = yield select(tokenSelector);
    const user = yield call(Trello.getCurrentUser, token.trello);
    yield put(putUsersFromTrello([user]));
    yield put(setCurrentUser(user.id));
  } catch (error) {
    console.warn('[saga] fetchCurrentUser', error);
    // TODO show modal with error
  }
}

export default function*(): Generator<*, *, *> {
  yield* [];
}
