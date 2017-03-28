// @flow
import { select, put, call, takeEvery } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { setCards } from './';
import { authSelector } from '../auth/reducer';
import { sprintsSelector, currentSprintSelector } from '../sprints/reducer';
import type { SprintType } from '../sprints/reducer';

export function* fetchCards(): Generator<*, *, *> {
  const { token } = yield select(authSelector);
  const currentSprint = yield select(currentSprintSelector);
  const sprints = yield select(sprintsSelector);

  let cards = yield call(Trello.getCardsFromList, token.trello, currentSprint.doneColumn);
  if (!cards.length) {
    // if it's the day after the ceremony, you still want to have the ticket of yesterday
    const lastSprint: any = Object.values(sprints).find(
      (sprint: SprintType) => sprint.number === currentSprint.number - 1
    );
    if (lastSprint) {
      cards = yield call(Trello.getCardsFromList, token.trello, lastSprint.doneColumn);
    }
  }

  // put cards
  yield put(setCards(cards));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CARDS', fetchCards)];
}
