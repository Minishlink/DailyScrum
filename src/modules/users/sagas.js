// @flow
import { call, put, select } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { tokenSelector } from '../auth/reducer';
import { putUsersFromTrello, setCurrentUser } from './';

export function* fetchCurrentUser(): Generator<*, *, *> {
  const token = yield select(tokenSelector);
  const user = yield call(Trello.getCurrentUser, token.trello);
  yield put(putUsersFromTrello([user]));
  yield put(setCurrentUser(user.id));
}

export default function*(): Generator<*, *, *> {
  yield* [];
}
