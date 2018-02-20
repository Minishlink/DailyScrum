// @flow
import { ScrumbleTeamMemberType } from '../types/Scrumble/common';

export type StoreCardType = {|
  id: string,
  idShort: number,
  name: string,
  points: ?number,
  postPoints: ?number,
  dateLastActivity: string,
  dateEndDevelopment: ?string,
  idMembers: string[],
  url: string,
  labels: string[],
|};

export type CardType = StoreCardType & {|
  members: ScrumbleTeamMemberType[],
|};
