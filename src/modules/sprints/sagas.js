// @flow
import { call, put, select, takeEvery, cancelled, cancel } from 'redux-saga/effects';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import { putSprints, setCurrentSprint } from './actions';
import { tokenSelector } from '../auth/reducer';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';
import { currentProjectSelector } from '../projects/reducer';
import { startSync, endSync } from '../sync';
import { fetchCards } from '../cards/sagas';
import { analyzeQualitySaga } from '../qualityIndicators/sagas';

export function* fetchSprints(): Generator<*, *, *> {
  try {
    yield put(startSync('sprints', 'all'));
    const token = yield select(tokenSelector);
    const project = yield select(currentProjectSelector);
    if (!project) yield cancel();
    const sprints: ScrumbleSprintType[] = yield call(Scrumble.getSprintsFromProject, token.scrumble, project.id);

    yield put(putSprints(sprints, true));

    const currentSprint = sprints.find(sprint => sprint.isActive);
    if (currentSprint) {
      yield put(setCurrentSprint(currentSprint.id));
    }
    yield put(endSync('sprints', 'all'));
  } catch (error) {
    console.info('[saga] fetchSprints', error);
    yield put(endSync('sprints', 'all', error.message));
  } finally {
    if (yield cancelled()) {
      yield put(endSync('sprints', 'all', 'cancelled'));
    }
  }
}

function* fetchCurrentSprint() {
  try {
    yield put(startSync('sprints', 'current'));
    const token = yield select(tokenSelector);
    const sprint: ScrumbleSprintType = yield call(Scrumble.getCurrentSprint, token.scrumble);
    yield put(putSprints([sprint], true));
    yield put(setCurrentSprint(sprint.id));
    yield put(endSync('sprints', 'current'));
  } catch (error) {
    console.info('[saga] fetchCurrentSprint', error);
    yield put(endSync('sprints', 'current', error.message));
  } finally {
    if (yield cancelled()) {
      yield put(endSync('sprints', 'current', 'cancelled'));
    }
  }
}

function* changeCurrentSprint(action: { payload: { sprintId: number } }): Generator<*, *, *> {
  yield put(setCurrentSprint(action.payload.sprintId));
  yield call(fetchCards);
  yield call(analyzeQualitySaga);
}

export default function*(): Generator<*, *, *> {
  yield* [
    takeEvery('FETCH_CURRENT_SPRINT', fetchCurrentSprint),
    takeEvery('FETCH_SPRINTS', fetchSprints),
    takeEvery('CHANGE_CURRENT_SPRINT', changeCurrentSprint),
  ];
}
