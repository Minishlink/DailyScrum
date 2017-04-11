import type { ScrumbleTeamType } from './Scrumble';

export type TeamType = ScrumbleTeamType;
export type MemberType = {
  id: string,
  avatarHash: string,
  fullName: string,
  initials: string,
  username: string,
  email: string,
  role: string,
  daily: string,
};
