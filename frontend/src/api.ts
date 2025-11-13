import type { TrainingData, BestStatesData, TrainParams } from "./types";

export const train = async (p: TrainParams): Promise<TrainingData> => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/train?decayE=${
    p.decayE
  }&rounds=${p.rounds}`;

  const res = await fetch(url);
  const json = await res.json();
  return json;
};

export const getBestStates = async (): Promise<BestStatesData> => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/best-states`);
  const json = (await res.json()) as BestStatesData;
  return json;
};
