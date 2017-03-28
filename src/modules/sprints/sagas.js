// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import { putSprint, setCurrentSprint } from './actions';
import { authSelector } from '../auth/reducer';
import type { AuthType } from '../auth/reducer';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';
import { currentProjectSelector } from '../projects/reducer';

export function* fetchSprints(): Generator<*, *, *> {
  const { token } = (yield select(authSelector): AuthType);
  const project = yield select(currentProjectSelector);
  const sprints: ScrumbleSprintType[] = yield call(Scrumble.getSprintsFromProject, token.scrumble, project.id);

  for (let sprint of sprints) {
    yield put(putSprint(sprint));
  }

  const currentSprint = sprints.find(sprint => sprint.isActive);
  if (currentSprint) {
    yield put(setCurrentSprint(currentSprint));
  }
}

function* fetchCurrentSprint() {
  const { token } = (yield select(authSelector): AuthType);
  const sprint: ScrumbleSprintType = yield call(Scrumble.getCurrentSprint, token.scrumble);
  yield put(putSprint(sprint));
  yield put(setCurrentSprint(sprint));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_SPRINT', fetchCurrentSprint), takeEvery('FETCH_SPRINTS', fetchSprints)];
}
