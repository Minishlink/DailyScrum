// @flow
import type { ScrumbleSprintType } from '../../types/Scrumble';

export type ActionType =
  | {|
      type: 'PUT_SPRINTS',
      payload: {|
        sprints: ScrumbleSprintType[],
        doAdapt: boolean,
      |},
    |}
  | {|
      type: 'SET_CURRENT_SPRINT',
      payload: {
        sprintId: number,
      },
    |}
  | {|
      type: 'CHANGE_CURRENT_SPRINT',
      payload: {
        sprintId: number,
      },
    |}
  | {|
      type: 'CLEAR_SPRINTS',
    |}
  | {|
      type: 'FETCH_CURRENT_SPRINT',
    |}
  | {|
      type: 'FETCH_SPRINTS',
    |};

export function putSprints(sprints: ScrumbleSprintType[], doAdapt: boolean = false): ActionType {
  return {
    type: 'PUT_SPRINTS',
    payload: { sprints, doAdapt },
  };
}

export function setCurrentSprint(sprintId: number): ActionType {
  return {
    type: 'SET_CURRENT_SPRINT',
    payload: { sprintId },
  };
}

export function changeCurrentSprint(sprintId: number): ActionType {
  return {
    type: 'CHANGE_CURRENT_SPRINT',
    payload: { sprintId },
  };
}

export function clearSprints(): ActionType {
  return { type: 'CLEAR_SPRINTS' };
}

export function fetchCurrentSprint(): ActionType {
  return { type: 'FETCH_CURRENT_SPRINT' };
}

export function fetchSprints(): ActionType {
  return { type: 'FETCH_SPRINTS' };
}
