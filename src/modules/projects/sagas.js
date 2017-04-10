// @flow
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { putProjects, setCurrentProject } from './actions';
import { authSelector } from '../auth/reducer';
import type { AuthType } from '../auth/reducer';
import type { ScrumbleProjectType } from '../../types/Scrumble/Project';
import { fetchBoard } from '../boards';

export function* fetchCurrentProject(): Generator<*, *, *> {
  const { token } = (yield select(authSelector): AuthType);
  const project: ScrumbleProjectType = yield call(Scrumble.getCurrentProject, token.scrumble);
  yield put(putProjects([project], true));
  yield put(setCurrentProject(project));
  yield put(fetchBoard(project.boardId));
}

export default function*(): Generator<*, *, *> {
  yield* [takeEvery('FETCH_CURRENT_PROJECT', fetchCurrentProject)];
}
