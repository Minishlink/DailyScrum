// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import { putSprints, setCurrentSprint } from './actions';
import { tokenSelector } from '../auth/reducer';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';
import { currentProjectSelector } from '../projects/reducer';

export function* fetchSprints(): Generator<*, *, *> {
  try {
    const token = yield select(tokenSelector);
    const project = yield select(currentProjectSelector);
    const sprints: ScrumbleSprintType[] = yield call(Scrumble.getSprintsFromProject, token.scrumble, project.id);

    yield put(putSprints(sprints, true));

    const currentSprint = sprints.find(sprint => sprint.isActive);
    if (currentSprint) {
      yield put(setCurrentSprint(currentSprint));
    }
  } catch (error) {
    console.warn('[saga] fetchSprints', error);
    // TODO show modal with error
  }
}

function* fetchCurrentSprint() {
  try {
    const token = yield select(tokenSelector);
    const sprint: ScrumbleSprintType = yield call(Scrumble.getCurrentSprint, token.scrumble);
    yield put(putSprints([sprint], true));
    yield put(setCurrentSprint(sprint));
  } catch (error) {
    console.warn('[saga] fetchCurrentSprint', error);
    // TODO show modal with error
  }
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_SPRINT', fetchCurrentSprint), takeEvery('FETCH_SPRINTS', fetchSprints)];
}
