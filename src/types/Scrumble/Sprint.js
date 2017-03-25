// @flow
import type { ScrumbleColumnMappingType, ScrumbleTeamType } from './common';

export type ScrumbleSprintType = {
  id: number,
  projectId: number,
  number: number,
  goal: string,
  bdcData: [],
  dates: {
    days: {date: string}[],
    end: string,
    start: string,
  },
  doneColumn: string,
  indicators: ?any,
  isActive: boolean,
  resources: ScrumbleResourcesType,
  bdcBase64: ?string, // seems deprecated
  objectId: ?any, // seems deprecated
  team: ?ScrumbleTeamType, // seems deprecated
  columnMapping: ?ScrumbleColumnMappingType, // seems deprecated
  createdAt: ?any, // seems deprecated
  updatedAt: ?any, // seems deprecated
};

type ScrumbleResourcesType = {
  matrix: [],
  speed: number,
  team: ScrumbleTeamType,
  totalManDays: number,
  totalPoints: number,
};
