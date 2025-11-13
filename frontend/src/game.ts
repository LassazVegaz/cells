import type { Coordinate } from "./types";

export type GameState = {
  c1: Coordinate;
  c2: Coordinate;
  gridSize: number;
  cellSize: number;
  running: boolean;
};

export default class Game {
  constructor(readonly ctx: CanvasRenderingContext2D) {}

  draw(s: GameState) {
    const { width, height } = this.ctx.canvas;

    // clear
    this.ctx.clearRect(0, 0, width, height);

    // draw grid
    this.ctx.beginPath();
    for (let i = 0; i <= s.gridSize; i++) {
      this.ctx.moveTo(i * s.cellSize, 0);
      this.ctx.lineTo(i * s.cellSize, s.gridSize * s.cellSize);
      this.ctx.moveTo(0, i * s.cellSize);
      this.ctx.lineTo(s.gridSize * s.cellSize, i * s.cellSize);
    }
    this.ctx.strokeStyle = "#ccc";
    this.ctx.stroke();
    this.ctx.closePath();

    // draw c2
    this.ctx.fillStyle = "green";
    this.ctx.fillRect(
      s.c2[0] * s.cellSize,
      s.c2[1] * s.cellSize,
      s.cellSize,
      s.cellSize
    );

    // draw c1
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(
      s.c1[0] * s.cellSize,
      s.c1[1] * s.cellSize,
      s.cellSize,
      s.cellSize
    );

    // draw status
    if (!s.running) {
      this.ctx.fillStyle = "rgba(0,0,0,0.5)";
      this.ctx.fillRect(0, 0, width, height);
      this.ctx.fillStyle = "#fff";
      this.ctx.font = "30px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText("STOPPED", width / 2, height / 2);
    }
  }
}
