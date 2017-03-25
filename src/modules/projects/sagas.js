// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Scrumble from 'DailyScrum/src/services/Scrumble';
import { putProject, setCurrentProject } from './actions';
import { authSelector } from '../auth/reducer';
import type { AuthType } from '../auth/reducer';
import type { ScrumbleProjectType } from '../../types/Scrumble/Project';

function* fetchCurrentProject() {
  const { token } = (yield select(authSelector): AuthType);
  const project: ScrumbleProjectType = yield call(Scrumble.getCurrentProject, token.scrumble);
  yield put(putProject(project));
  yield put(setCurrentProject(project));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_PROJECT', fetchCurrentProject)];
}
