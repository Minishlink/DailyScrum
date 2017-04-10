import type { ScrumbleColumnMappingType } from './Scrumble';

export type ProjectType = {|
  id: number,
  boardId: string,
  name: string,
  columnMapping: ColumnMappingType,
|};

type ColumnMappingType = ScrumbleColumnMappingType;
