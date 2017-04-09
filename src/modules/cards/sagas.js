// @flow
import { select, put, call, takeEvery } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { putCards } from './';
import { authSelector } from '../auth/reducer';
import { sprintsSelector, currentSprintSelector } from '../sprints/reducer';
import type { SprintType } from '../sprints/reducer';
import { currentProjectSelector } from '../projects/reducer';
import { getPoints } from '../../services/Trello';
import { getLastWorkableDayTime } from '../../services/Time';
import { putSprints } from '../sprints/actions';

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
  } else {
    // only compute total if the sprint has started since at least one day
    const total = cards.reduce((total, card) => total + getPoints(card.name), 0);
    const lastWorkableDayTime = getLastWorkableDayTime();
    for (
      let i = 0, performance = currentSprint.bdcData[0];
      i < currentSprint.bdcData.length;
      performance = currentSprint.bdcData[++i]
    ) {
      const currentDay = new Date(performance.date);
      currentDay.setHours(9, 0, 0, 0);

      // the standard is set to the next day
      if (lastWorkableDayTime === currentDay.getTime() && currentSprint.bdcData[i + 1]) {
        const newSprint = { ...currentSprint };
        newSprint.bdcData[i + 1].done = total;
        yield put(putSprints([newSprint]));
        // TODO REMOTE PUT to Scrumble
        break;
      }
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
