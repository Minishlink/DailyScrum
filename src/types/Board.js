// @flow

export type BoardType = {
  id: string,
  name: string,
  background: BackgroundType,
};

type BackgroundType = {
  color: ?string,
  image: ?string,
  brightness: 'light'|'dark',
};
