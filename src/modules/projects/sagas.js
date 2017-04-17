// @flow
import { NavigationActions } from 'react-navigation';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { Scrumble } from 'DailyScrum/src/services';
import { putProjects, setCurrentProject } from './';
import { tokenSelector } from '../auth/reducer';
import type { ScrumbleProjectType } from '../../types/Scrumble';
import { putUsersFromScrumble, clearOtherUsers } from '../users';
import type { ActionType } from './';
import { fetchProjectData } from '../common/sagas';
import { clearSprints } from '../sprints';
import { clearCards } from '../cards';

export function* fetchCurrentProject(): Generator<*, *, *> {
  try {
    const token = yield select(tokenSelector);
    const project: ScrumbleProjectType = yield call(Scrumble.getCurrentProject, token.scrumble);
    yield put(putProjects([project], true));
    yield put(putUsersFromScrumble(project.team));
    yield put(setCurrentProject(project));
  } catch (error) {
    console.warn('[saga] fetchCurrentProject', error);
    // TODO show modal with error
  }
}

function* changeCurrentRemoteProject(action: ActionType): Generator<*, *, *> {
  try {
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
  } catch (error) {
    console.warn('[saga] changeCurrentRemoteProject', error);
    // TODO show modal with error
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
