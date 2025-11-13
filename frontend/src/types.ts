/**
 * [x, y]
 */
export type Coordinate = [number, number];

export type TrainParams = {
  decayE: boolean;
  rounds: number;
};

export type TrainingData = {
  states: Coordinate[][];
  maxRewards: number;
};

export type BestStatesData = {
  states: Coordinate[];
  rewards: number;
};
