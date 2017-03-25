// @flow
import type { ScrumbleColumnMappingType, ScrumbleTeamType } from './common';

export type ScrumbleProjectType = {
  id: number,
  boardId: string,
  name: string,
  team: ScrumbleTeamType,
  columnMapping: ScrumbleColumnMappingType,
  settings: ScrumbleProjectSettingsType,
  objectId: ?any, // seems deprecated
  organizationId: ?any, // seems deprecated
  createdAt: ?any, // seems deprecated
  updatedAt: ?any, // seems deprecated
};

type ScrumbleProjectSettingsType = {
  bdcTitle: string,
};
