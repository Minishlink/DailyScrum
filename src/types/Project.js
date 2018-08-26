// @flow
export type ProjectType = {|
  id: number,
  boardId: string,
  name: string,
  columnMapping: ColumnMappingType,
|};

type ColumnMappingType = {|
  blocked: string,
  doing: string[],
  sprint: string,
  toValidate: string,
|};
