export type ScrumbleColumnMappingType = {
  blocked: string,
  doing: string | string[],
  sprint: string,
  toValidate: string,
};

export type ScrumbleTeamType = ScrumbleTeamMemberType[];

export type ScrumbleTeamMemberType = {
  avatarHash: ?string,
  daily: string,
  email: string,
  fullName: string,
  id: string,
  initials: string,
  role: string,
  username: string,
};
