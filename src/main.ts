type Props = {
  CircelRadius: number;
  Circles: { x: number; y: number }[];
};

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const CSIZE = 500;
const RADIUS = CSIZE / 20 / 2; // 20 cells fit in canvas
const DIAMETER = RADIUS * 2;
const COC = RADIUS / 2; // change of coordinates
const FPI = 20;
const MAX_ITR = 1000; // max iterations

canvas.width = CSIZE;
canvas.height = CSIZE;

const render = (ctx: CanvasRenderingContext2D, props: Props) => {
  ctx.clearRect(0, 0, CSIZE, CSIZE);

  props.Circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, props.CircelRadius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  });
};

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const props: Props = {
  CircelRadius: RADIUS,
  Circles: [
    { x: RADIUS, y: CSIZE - RADIUS },
    { x: CSIZE - RADIUS, y: RADIUS },
  ],
};
render(ctx, props);

let i = 0;
const interval = setInterval(() => {
  i++;
  if (i > MAX_ITR) clearInterval(interval);

  const [c1, c2] = props.Circles;

  if (Math.hypot(c1.x - c2.x, c1.y - c2.y) <= DIAMETER) {
    clearInterval(interval);
  }

  c1.x += COC;
  c1.y -= COC;

  c2.x -= COC;
  c2.y += COC;

  render(ctx, props);
}, 1000 / FPI);
