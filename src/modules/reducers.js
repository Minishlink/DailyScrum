// @flow
import { combineReducers } from 'redux';
import { commonReducer as common } from './common';
import { navigationReducer as navigation } from './navigation';
import { syncReducer as sync } from './sync';
import { authReducer as auth } from './auth';
import { usersReducer as users } from './users';
import { sprintsReducer as sprints } from './sprints';
import { projectsReducer as projects } from './projects';
import { boardsReducer as boards } from './boards';
import { cardsReducer as cards } from './cards';
import { cardListsReducer as cardLists } from './cardLists';
import { qualityIndicatorsReducer as qualityIndicators } from './qualityIndicators';
import { tipsReducer as tips } from './tips';
import type { CommonStateType } from './common/reducer';
import type { SyncStateType } from './sync/reducer';
import type { AuthStateType } from './auth/reducer';
import type { UsersStateType } from './users/reducer';
import type { SprintsStateType } from './sprints/reducer';
import type { ProjectsStateType } from './projects/reducer';
import type { BoardsStateType } from './boards/reducer';
import type { CardsStateType } from './cards/reducer';
import type { CardListsStateType } from './cardLists/reducer';
import type { QualityIndicatorsStateType } from './qualityIndicators/reducer';
import type { TipsStateType } from './tips/reducer';

const initialState = {};

const rootReducer = (state: any = initialState, action: any = {}) => {
  const appReducer = combineReducers({
    navigation,
    common,
    sync,
    auth,
    users,
    sprints,
    projects,
    boards,
    cards,
    cardLists,
    qualityIndicators,
    tips,
  });

  return appReducer(state, action);
};

export type StateType = {|
  navigation: any,
  common: CommonStateType,
  sync: SyncStateType,
  auth: AuthStateType,
  users: UsersStateType,
  sprints: SprintsStateType,
  projects: ProjectsStateType,
  boards: BoardsStateType,
  cards: CardsStateType,
  cardLists: CardListsStateType,
  qualityIndicators: QualityIndicatorsStateType,
  tips: TipsStateType,
|};

export default rootReducer;
