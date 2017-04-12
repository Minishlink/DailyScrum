// @flow
import type { BoardType } from '../../types';
import type { TrelloBoardType } from '../../types/Scrumble';

export default (board: TrelloBoardType): BoardType => {
  return {
    id: board.id,
    name: board.name,
  };
};
