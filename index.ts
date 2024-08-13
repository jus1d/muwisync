const drawCircle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, color: string) => {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

const updateCanvasSize = (ctx: CanvasRenderingContext2D) => {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

(() => {
  let canvas = document.getElementById("windo") as HTMLCanvasElement | null;
  if (canvas === null) throw new Error("Could not find `windo` element");

  let ctx = canvas.getContext("2d");
  if (ctx === null) throw new Error("2d context does not supported");

  const render = () => {
    updateCanvasSize(ctx);
    drawCircle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, "red");
    requestAnimationFrame(render);
  };

  render();
})();
