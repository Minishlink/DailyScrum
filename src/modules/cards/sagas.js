// @flow
import { select, put, call, takeEvery } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { putCards } from './';
import { authSelector } from '../auth/reducer';
import { sprintsSelector, currentSprintSelector } from '../sprints/reducer';
import { currentProjectSelector } from '../projects/reducer';
import type { SprintType } from '../sprints/reducer';

export function* fetchDoneCards(): Generator<*, *, *> {
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

  yield put(
    putCards({
      done: cards,
    })
  );
}

export function* fetchNotDoneCards(): Generator<*, *, *> {
  const { token } = yield select(authSelector);
  const currentProject = yield select(currentProjectSelector);

  // fetch in parallel
  const cardsCalls = yield Object.values(currentProject.columnMapping).map(id => {
    return call(Trello.getCardsFromList, token.trello, id);
  });

  let cards = {};
  let i = 0;
  for (let key of Object.keys(currentProject.columnMapping)) {
    cards[key] = cardsCalls[i++];
  }

  yield put(putCards(cards));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_DONE_CARDS', fetchDoneCards), takeEvery('FETCH_NOT_DONE_CARDS', fetchNotDoneCards)];
}
