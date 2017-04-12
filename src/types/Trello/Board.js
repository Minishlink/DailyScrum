// @flow

export type TrelloBoardType = {
  id: string,
  name: string,
  dateLastActivity: string,
  prefs: {
    permissionLevel: string,
    voting: 'disabled' | 'enabled', // not sure about enabled
    comments: string,
    invitations: string,
    selfJoin: boolean,
    cardCovers: boolean,
    cardAging: string,
    calendarFeedEnabled: boolean,
    background: string,
    backgroundImage: string,
    backgroundImageScaled: {
      width: number,
      height: number,
      url: string,
    }[],
    backgroundTile: boolean,
    backgroundBrightness: 'dark' | 'light',
    backgroundColor?: string,
    canBePublic: boolean,
    canBeOrg: boolean,
    canBePrivate: boolean,
    canInvite: boolean,
  },
};
