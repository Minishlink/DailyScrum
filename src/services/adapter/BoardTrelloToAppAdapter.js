// @flow
import type { BoardType } from '../../types';
import type { TrelloBoardType } from '../../types/Scrumble';

export default (board: TrelloBoardType): BoardType => {
  const image = board.prefs.backgroundImageScaled
    ? board.prefs.backgroundImageScaled.find(image => image.width > 760).url
    : null;
  return {
    id: board.id,
    name: board.name,
    background: {
      color: board.prefs.backgroundColor,
      image,
      brightness: board.prefs.backgroundBrightness,
    },
  };
};
