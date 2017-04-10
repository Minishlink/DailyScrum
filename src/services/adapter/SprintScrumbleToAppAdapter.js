// @flow
import type { SprintType } from '../../types/App';
import type { ScrumbleSprintType } from '../../types/Scrumble/Sprint';

export default (sprint: ScrumbleSprintType): SprintType => {
  return {
    id: sprint.id,
    projectId: sprint.projectId,
    number: sprint.number,
    goal: sprint.goal,
    isActive: sprint.isActive,
    performance: sprint.bdcData,
    resources: sprint.resources,
    doneColumn: sprint.doneColumn,
    lead: null,
    pointsLeft: null,
  };
};
