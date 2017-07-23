// @flow
import { NavigationActions } from 'react-navigation';
import { call, put, select, takeEvery, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Scrumble } from 'DailyScrum/src/services';
import { putProjects, setCurrentProject } from './';
import { tokenSelector } from '../auth/reducer';
import type { ScrumbleProjectType } from '../../types/Scrumble';
import { putUsersFromScrumble, clearOtherUsers } from '../users';
import type { ActionType } from './';
import { fetchProjectData } from '../common/sagas';
import { clearSprints } from '../sprints';
import { clearCards } from '../cards';
import { startSync, endSync } from '../sync';

export function* fetchCurrentProject(): Generator<*, *, *> {
  try {
    yield put(startSync('projects', 'current'));
    const token = yield select(tokenSelector);
    const project: ScrumbleProjectType = yield call(Scrumble.getCurrentProject, token.scrumble);
    yield put(putProjects([project], true));
    yield put(putUsersFromScrumble(project.team));
    yield put(setCurrentProject(project));
    yield put(endSync('projects', 'current'));
  } catch (error) {
    yield put(endSync('projects', 'current', error.message));
    if (error.statusCode === 404) {
      yield call(delay, 1000);
      yield put(NavigationActions.navigate({ routeName: 'projectSettings' }));
    } else {
      console.info('[saga] fetchCurrentProject', error);
    }
  } finally {
    if (yield cancelled()) {
      yield put(endSync('projects', 'current', 'cancelled'));
    }
  }
}

function* changeCurrentRemoteProject(action: ActionType): Generator<*, *, *> {
  try {
    yield put(startSync('projects', 'change'));
    const token = yield select(tokenSelector);
    // TODO $FlowFixMe
    const boardId = action.payload.boardId;

    // verify that the project exists
    const project = yield call(Scrumble.getProjectByBoard, token.scrumble, boardId);
    if (project) {
      yield call(Scrumble.setCurrentProject, token.scrumble, project.id);
      yield [put(clearCards()), put(clearOtherUsers()), put(clearSprints())];
      yield* fetchProjectData();
      yield [put(NavigationActions.back())];
      yield put(endSync('projects', 'change'));
    } else {
      yield put(endSync('projects', 'change', 'NOT_SCRUMBLE_PROJECT'));
    }
  } catch (error) {
    console.info('[saga] changeCurrentRemoteProject', error);
    yield put(endSync('projects', 'change', error.message));
  } finally {
    if (yield cancelled()) {
      yield put(endSync('projects', 'change', 'cancelled'));
    }
  }
}

// CreateProject
// POST /Projects with {boardId} -> we get the project {id, boardId, name, team, organizationId}
// PUT /ScrumbleUsers/project with {projectId, team, ...}

export default function*(): Generator<*, *, *> {
  yield* [
    takeEvery('FETCH_CURRENT_PROJECT', fetchCurrentProject),
    takeEvery('CHANGE_CURRENT_REMOTE_PROJECT', changeCurrentRemoteProject),
  ];
}
