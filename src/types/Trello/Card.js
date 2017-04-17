// @flow
export type TrelloCardType = {
  id: string,
  checkItemStates: ?any,
  closed: boolean,
  dateLastActivity: string,
  desc: string,
  descData: any,
  idBoard: string,
  idList: string,
  idMembersVoted: string[],
  idShort: number,
  idAttachmentCover: ?any,
  manualCoverAttachment: boolean,
  idLabels: string[],
  name: string,
  pos: number,
  shortLink: string,
  badges: any,
  dueComplete: boolean,
  due: ?any,
  idChecklists: string[],
  idMembers: string[],
  labels: TrelloLabelType[],
  shortUrl: string,
  subscribed: boolean,
  url: string,
};

type TrelloLabelType = {
  id: string,
  idBoard: string,
  name: string,
  color: string,
  uses: number,
};