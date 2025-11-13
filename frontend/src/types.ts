/**
 * [x, y]
 */
export type Coordinate = [number, number];

export type TrainingData = {
  states: Coordinate[][];
  maxRewards: number;
};

export type BestStatesData = {
  states: Coordinate[];
  rewards: number;
};
