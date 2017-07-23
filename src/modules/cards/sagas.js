// @flow
import { select, put, call, takeEvery, cancelled, cancel } from 'redux-saga/effects';
import { Trello } from 'DailyScrum/src/services';
import { putCards } from './';
import { tokenSelector } from '../auth/reducer';
import { sprintsSelector, currentSprintSelector, isCurrentSprintActiveSelector } from '../sprints/reducer';
import type { SprintType } from '../../types';
import { currentProjectSelector } from '../projects/reducer';
import { getPoints } from '../../services/Trello';
import { getLastWorkableDayTime, BOUNDARY_HOUR, BOUNDARY_MINUTES } from '../../services/Time';
import { putSprints } from '../sprints/actions';
import { startSync, endSync } from '../sync';
import { configureTodayCardList, configureYesterdayCardList } from '../cardLists/sagas';

export function* fetchDoneCards(): Generator<*, *, *> {
  try {
    yield put(startSync('cards', 'done'));
    const token = yield select(tokenSelector);
    const currentSprint: SprintType = yield select(currentSprintSelector);
    if (!currentSprint) yield cancel();
    const sprints = yield select(sprintsSelector);

    let cards = yield call(Trello.getCardsFromList, token.trello, currentSprint.doneColumn);
    if (!cards.length) {
      // if it's the day after the ceremony, you still want to have the tickets of yesterday
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
        let i = 0, performance = currentSprint.performance[0];
        i < currentSprint.performance.length;
        performance = currentSprint.performance[++i]
      ) {
        const currentDay = new Date(performance.date);
        currentDay.setHours(BOUNDARY_HOUR, BOUNDARY_MINUTES, 0, 0);

        // the standard is set to the next day
        if (lastWorkableDayTime === currentDay.getTime() && currentSprint.performance[i + 1]) {
          const newSprint = { ...currentSprint };
          newSprint.performance[i + 1].done = total;
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
    yield call(configureYesterdayCardList);

    yield put(endSync('cards', 'done'));
  } catch (error) {
    console.info('[saga] fetchDoneCards', error);
    yield put(endSync('cards', 'done', error.message));
  } finally {
    if (yield cancelled()) {
      yield put(endSync('cards', 'done', 'cancelled'));
    }
  }
}

export function* fetchNotDoneCards(): Generator<*, *, *> {
  try {
    yield put(startSync('cards', 'notDone'));

    const isCurrentSprintActive = yield select(isCurrentSprintActiveSelector);
    const token = yield select(tokenSelector);
    const currentProject = yield select(currentProjectSelector);
    if (!currentProject || !currentProject.columnMapping) yield cancel();

    // fetch in parallel
    const cardsCalls = yield Object.values(currentProject.columnMapping).map(id => {
      // if it's not the active sprint, there's no cards that are not done
      return !isCurrentSprintActive ? [] : call(Trello.getCardsFromList, token.trello, id);
    });

    let cards = {};
    let i = 0;
    for (let key of Object.keys(currentProject.columnMapping)) {
      cards[key] = cardsCalls[i++];
    }

    yield put(putCards(cards));
    yield call(configureTodayCardList);

    yield put(endSync('cards', 'notDone'));
  } catch (error) {
    console.info('[saga] fetchNotDoneCards', error);
    yield put(endSync('cards', 'notDone', error.message));
  } finally {
    if (yield cancelled()) {
      yield put(endSync('cards', 'notDone', 'cancelled'));
    }
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_DONE_CARDS', fetchDoneCards), takeEvery('FETCH_NOT_DONE_CARDS', fetchNotDoneCards)];
}
