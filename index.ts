const COLORS: Array<string> = [
  "#01BAEF",
  "#FFF275",
  "#DBBADD",
  "#643A71",
  "#C4D6B0",
  "#AA4465",
];

const choose = <T>(arr: Array<T>): T | undefined => {
  if (arr.length === 0) return undefined;

  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const id = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const randomValue = (Math.random() * 16) | 0;
    const value = c === "x" ? randomValue : (randomValue & 0x3) | 0x8;
    return value.toString(16);
  });
};

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  style: string,
) => {
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = style;
  ctx.fill();
  ctx.closePath();
};

(() => {
  let canvas = document.getElementById("window") as HTMLCanvasElement | null;
  if (canvas === null) throw new Error("Canvas with id `window` not found");

  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  if (ctx === null) throw new Error("2d context not supported");

  const COLOR: string = choose(COLORS) || "magenta";
  const ID: string = id();

  window.onresize = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
  };

  const render = () => {
    drawCircle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, COLOR);

    requestAnimationFrame(render);
  };

  render();
})();
