import { Injectable } from '@nestjs/common';

export enum Action {
  Left,
  Right,
  Down,
  Up,
}

@Injectable()
export class GameService {
  private readonly rewards: number[] = [];
  private readonly gridSize = 10;
  private readonly boxesCount = this.gridSize * this.gridSize;
  private readonly hittingWallPenalty = -2;

  private readonly actions: Record<Action, (s: number) => number> = {
    [Action.Left]: (s) => (s % this.gridSize === 1 ? s : s - 1),
    [Action.Right]: (s) => (s % this.gridSize > 0 ? s + 1 : s),
    [Action.Down]: (s) =>
      s < this.boxesCount - this.gridSize ? s + this.gridSize : s,
    [Action.Up]: (s) => (s > this.gridSize ? s - this.gridSize : s),
  };

  constructor() {
    this.rewards = this.generateRewards();
  }

  getRewards(oldS: number, s: number): number {
    if (oldS === s) return this.hittingWallPenalty; // penalty for hitting wall
    return this.rewards[s - 1];
  }

  performAction(a: Action, s: number) {
    return this.actions[a](s);
  }

  private generateRewards() {
    const _r: number[] = [];
    for (let i = 1; i < this.boxesCount; i++) {
      _r[i] = -1;
    }
    _r[this.boxesCount] = 100; // goal state
    return _r;
  }
}
