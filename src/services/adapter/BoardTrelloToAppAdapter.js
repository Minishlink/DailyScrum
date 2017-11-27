// @flow
import { Dimensions } from 'react-native';
import type { BoardType } from '../../types';
import type { TrelloBoardType } from '../../types/Scrumble';

export default (board: TrelloBoardType): BoardType => {
  const images = board.prefs.backgroundImageScaled;
  const image = images
    ? images.find((image, index) => image.width >= Dimensions.get('window').width || index === images.length - 1).url
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
