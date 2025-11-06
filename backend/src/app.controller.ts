import { Controller, Get } from '@nestjs/common';

const gridSize = 10;
const boxesCount = gridSize * gridSize;

// target
const c2 = boxesCount; // bottom right

// actions are, move left, right, down or up (0, 1, 2, 3)
enum Action {
  Left,
  Right,
  Down,
  Up,
}
// input the current state, next state is the output
const actions: Record<Action, (s: number) => number> = {
  [Action.Left]: (s) => (s % gridSize === 1 ? s : s - 1),
  [Action.Right]: (s) => (s % gridSize > 0 ? s + 1 : s),
  [Action.Down]: (s) => (s < boxesCount - gridSize ? s + gridSize : s),
  [Action.Up]: (s) => (s > gridSize ? s - gridSize : s),
};
const actionsCount = 4;
// perform acion on the given state
const performAction = (a: Action, s: number) => actions[a](s);

// Q values of states and actions
const q: Record<number, number[]> = {};
for (let i = 1; i <= boxesCount; i++) {
  q[i] = [];
  for (let j = 0; j < actionsCount; j++) q[i][j] = Math.random();
}

// lets see how c1 goes to c2

// rewards: every box (state) has -1 except c2 box (last state) which has 20
const rewards: number[] = [];
for (let i = 1; i <= boxesCount; i++) rewards[i] = -1;
rewards[c2] = 20;

// pick random action
const _actions = [Action.Left, Action.Right, Action.Down, Action.Up];

@Controller('train')
export class AppController {
  private calculateQ(s: number, newS: number, a: Action) {
    const currentQ = q[s][a];
    const reward = rewards[s];
    const bestNextQ = Math.max(...q[newS]);
    const alpha = 0.1;
    const discount = 0.95;

    const newQ = currentQ + alpha * (reward + discount * bestNextQ - currentQ);
    return newQ;
  }

  @Get()
  getHello() {
    // player
    let c1 = 1; // top left

    const states: number[] = [];

    for (let i = 0; i < 1000; i++) {
      const randomAction =
        _actions[Math.floor(Math.random() * 10) % actionsCount];
      q[c1][randomAction] = this.calculateQ(c1, c2, randomAction);
      c1 = performAction(randomAction, c1);
      states.push(c1);
    }

    return states;
  }
}
