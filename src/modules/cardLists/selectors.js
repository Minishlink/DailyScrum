// @flow
import type { StateType } from '../reducers';
import type { UserType } from '../../types';
import type { CardListStateType, CardListsKeyType } from './reducer';
import { userSelectorById } from '../users/reducer';

function cardListStateSelector(state: StateType, key: CardListsKeyType): ?CardListStateType {
  return state.cardLists[key];
}

export function filteredMemberSelector(state: StateType, key: CardListsKeyType): ?string {
  const cardListState = cardListStateSelector(state, key);
  if (!cardListState) return null;

  return cardListState.filteredMember;
}

export function filterableMembersSelector(
  state: StateType,
  key: CardListsKeyType,
  onlyIds?: boolean = false
): UserType[] {
  const cardListState = cardListStateSelector(state, key);
  if (!cardListState) return [];

  const filterableMembers = Object.keys(cardListState.userPoints);

  if (onlyIds) {
    return filterableMembers;
  }

  return filterableMembers.map(id => userSelectorById(state, id)).filter(Boolean);
}

export function userPointsSelector(state: StateType, key: CardListsKeyType): ?{ [key: string]: number } {
  const cardListState = cardListStateSelector(state, key);
  if (!cardListState) return null;

  return cardListState.userPoints;
}
