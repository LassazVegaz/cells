import { getBestStates, train } from "./api";
import type { GameState } from "./game";
import Game from "./game";
import type { Coordinate, TrainParams } from "./types";

const fps = 10;
let timer: number | null = null;

const maxRewardsSpan = document.getElementById(
  "stats-rewards"
) as HTMLSpanElement;
const currentRoundSpan = document.getElementById(
  "current-round"
) as HTMLSpanElement;
const allowDecayCheckbox = document.getElementById(
  "decayE"
) as HTMLInputElement;
const roundsInput = document.getElementById("rounds") as HTMLInputElement;
const trainingBlocker = document.getElementById(
  "training-blocker"
) as HTMLDivElement;
const withoutTrainingCheckbox = document.getElementById(
  "without-training"
) as HTMLInputElement;

const buildInitialGameState = (): GameState => {
  const gridSize = 10;
  return {
    c1: [0, 0],
    c2: [gridSize - 1, gridSize - 1],
    gridSize,
    cellSize: 40,
    running: false,
  };
};

const s = buildInitialGameState();

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = s.gridSize * s.cellSize;
canvas.height = s.gridSize * s.cellSize;

const game = new Game(canvas.getContext("2d")!);
const draw = () => game.draw(s);
draw();

const disableTrainingBlocker = (show = true) => {
  trainingBlocker.style.display = show ? "flex" : "none";
};

const getTrainParams = (): TrainParams => ({
  decayE: allowDecayCheckbox.checked,
  rounds: parseInt(roundsInput.value) || 2000,
});

const start = async () => {
  s.running = true;
  let states: Coordinate[][] = [];
  let maxRewards = 0;

  disableTrainingBlocker();
  if (withoutTrainingCheckbox.checked) {
    const data = await getBestStates();
    states = [data.states];
    maxRewards = data.rewards;
  } else {
    const data = await train(getTrainParams());
    states = data.states;
    maxRewards = data.maxRewards;
  }
  disableTrainingBlocker(false);

  maxRewardsSpan.innerText = maxRewards.toString();

  play(states);
};

const stop = () => {
  if (timer !== null) clearInterval(timer);
  s.running = false;
  draw();
  currentRoundSpan.innerText = "unknown";
};

const play = (states: Coordinate[][]) => {
  const skip = states.length === 1 ? 2 : Math.floor(states.length / 20);
  const ms = 1000 / fps;
  let i = 0;
  let j = 0;

  currentRoundSpan.innerText = (i + 1).toString();

  timer = setInterval(() => {
    if (i >= states.length && timer !== null) {
      stop();
      return;
    }

    s.c1 = states[i][j++];
    draw();

    if (j === states[i].length) {
      j = 0;
      if (i === 0) i = -1; // first & last iterations must always run
      i += skip;
      currentRoundSpan.innerText = (i + 1).toString();
    }
  }, ms);
};

document.getElementById("start-btn")!.onclick = start;
document.getElementById("stop-btn")!.onclick = stop;
document.getElementById("train-btn")!.onclick = async () => {
  disableTrainingBlocker();
  await train(getTrainParams());
  disableTrainingBlocker(false);
};
