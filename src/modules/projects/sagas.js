// @flow
import { NavigationActions } from 'react-navigation';
import { call, put, select, takeEvery, cancelled } from 'redux-saga/effects';
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
    console.warn('[saga] fetchCurrentProject', error);
    yield put(endSync('projects', 'current', error.message)); // TODO show modal with error
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
      yield [put(NavigationActions.navigate({ routeName: 'summary' }))];
    } else {
      console.warn('Not a project');
      // TODO show a Toast/Modal asking the user to create the project on Scrumble for the moment
    }
    yield put(endSync('projects', 'change'));
  } catch (error) {
    console.warn('[saga] changeCurrentRemoteProject', error);
    yield put(endSync('projects', 'change', error.message)); // TODO show modal with error
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
