// @flow
import type { ActionType as AuthAction } from './auth/actions';
import type { ActionType as BoardsAction } from './boards/actions';
import type { ActionType as CardListsAction } from './cardLists/actions';
import type { ActionType as CardsAction } from './cards/actions';
import type { ActionType as CommonAction } from './common/actions';
import type { ActionType as NavigationAction } from './navigation/actions';
import type { ActionType as ProjectsAction } from './projects/actions';
import type { ActionType as QualityIndicatorsAction } from './qualityIndicators/actions';
import type { ActionType as SprintsAction } from './sprints/actions';
import type { ActionType as SyncAction } from './sync/actions';
import type { ActionType as TipsAction } from './tips/actions';
import type { ActionType as UsersAction } from './users/actions';

export type ActionType =
  | AuthAction
  | BoardsAction
  | CardListsAction
  | CardsAction
  | CommonAction
  | NavigationAction
  | ProjectsAction
  | QualityIndicatorsAction
  | SprintsAction
  | SyncAction
  | TipsAction
  | UsersAction;
