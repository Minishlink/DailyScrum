// @flow
export type ScrumbleSprintType = {
  bdcBase64: ?string,
  bdcData: [],
  columnMapping: ?ScrumbleColumnMappingType, // seems deprecated
  createdAt: ?any,
  dates: {
    days: {date: string}[],
    end: string,
    start: string,
  },
  doneColumn: string,
  goal: string,
  id: number,
  indicators: ?any,
  isActive: boolean,
  number: number,
  objectId: ?any, // seems deprecated
  projectId: number,
  resources: ScrumbleResourcesType,
  team: ?ScrumbleTeamType, // seems deprecated
  updatedAt: ?any,
};

type ScrumbleColumnMappingType = {
  blocked: string,
  doing: string,
  sprint: string,
  toValidate: string,
};

type ScrumbleResourcesType = {
  matrix: [],
  speed: number,
  team: ScrumbleTeamType,
  totalManDays: number,
  totalPoints: number,
};

type ScrumbleTeamType = ScrumbleTeamMemberType[];

type ScrumbleTeamMemberType = {
  avatarHash: ?string,
  daily: string,
  email: string,
  fullName: string,
  id: string,
  initials: string,
  role: string,
  username: string,
};
