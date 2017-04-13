// @flow
import { Dimensions } from 'react-native';
import type { BoardType } from '../../types';
import type { TrelloBoardType } from '../../types/Scrumble';

export default (board: TrelloBoardType): BoardType => {
  const image = board.prefs.backgroundImageScaled
    ? board.prefs.backgroundImageScaled.find(image => image.width >= Dimensions.get('window').width).url
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
