// @flow
import { ScrumbleTeamMemberType } from '../types/Scrumble/common';

export type StoreCardType = {|
  id: string,
  idShort: number,
  name: string,
  points: ?number,
  dateLastActivity: string,
  idMembers: string[],
|};

export type CardType = StoreCardType & {|
  members: ScrumbleTeamMemberType[],
|};
