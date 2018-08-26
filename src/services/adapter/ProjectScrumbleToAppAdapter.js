// @flow
import type { ProjectType, ColumnMappingType } from '../../types';
import type { ScrumbleProjectType, ScrumbleColumnMappingType } from '../../types/Scrumble';

const retroCompatibleScrumbleColumnMapping = (scrumbleColumnMapping: ScrumbleColumnMappingType): ColumnMappingType => ({
  ...scrumbleColumnMapping,
  doing: typeof scrumbleColumnMapping.doing === 'string' ? [scrumbleColumnMapping.doing] : scrumbleColumnMapping.doing,
});

export default (project: ScrumbleProjectType): ProjectType => ({
  id: project.id,
  boardId: project.boardId,
  name: project.name,
  columnMapping: retroCompatibleScrumbleColumnMapping(project.columnMapping),
});
