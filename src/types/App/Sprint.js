import type { ScrumbleResourcesType, ScrumbleBdcDataType } from '../Scrumble';

export type SprintType = {|
  id: number,
  projectId: number,
  number: number,
  goal: string,
  isActive: boolean,
  performance: PerformanceType,
  resources: ResourcesType,
  doneColumn: string,
  lead: ?{
    points: number,
    manDays: number,
  },
  pointsLeft: ?number,
|};

type PerformanceType = ScrumbleBdcDataType;
type ResourcesType = ScrumbleResourcesType;
