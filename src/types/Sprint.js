import type { ScrumbleBdcDataType } from './Scrumble';
import type { TeamType } from './';

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

export type PerformanceType = ScrumbleBdcDataType;

type ResourcesType = {
  matrix: [],
  speed: number,
  team: string[] | TeamType, // string array in store, TeamType when selected
  totalManDays: number,
  totalPoints: number,
};
