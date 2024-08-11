interface Session {
  color: string;
  x: number;
  y: number;
}

const circle = (
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

const choose = <T>(arr: Array<T>): T | undefined => {
  if (arr.length === 0) return undefined;

  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
};

const translateCanvasToScreenCoordinates = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
): [number, number] => {
  const rect = canvas.getBoundingClientRect();

  return [x + rect.left, y + rect.top];
};

(() => {
  let canvas = document.getElementById("window") as HTMLCanvasElement | null;
  if (canvas === null) {
    throw new Error("Could not find window");
  }

  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D | null;
  if (ctx === null) {
    throw new Error("Unsupported '2d' context");
  }

  const COLORS: Array<string> = [
    "#01BAEF",
    "#FFF275",
    "#DBBADD",
    "#643A71",
    "#C4D6B0",
    "#AA4465",
  ];

  window.onresize = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let [x, y] = translateCanvasToScreenCoordinates(
      ctx.canvas,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
    );

    console.log(x, y);
  };

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  let color: string = choose(COLORS) ?? "magenta";

  const render = () => {
    circle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, color);

    requestAnimationFrame(render);
  };

  render();
})();
