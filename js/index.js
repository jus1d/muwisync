"use strict";
const drawCircle = (ctx, cx, cy, r, color) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
const screenToCanvasCoordinates = (canvas, screenX, screenY) => {
    const rect = canvas.getBoundingClientRect();
    const canvasX = screenX - rect.left - window.screenX;
    const canvasY = screenY - rect.top - window.screenY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [canvasX * scaleX, canvasY * scaleY];
};
const updateCanvasSize = (ctx) => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
};
(() => {
    let canvas = document.getElementById("windo");
    if (canvas === null)
        throw new Error("Could not find `windo` element");
    let ctx = canvas.getContext("2d");
    if (ctx === null)
        throw new Error("2d context does not supported");
    let windos = [
        {
            x: window.screen.width / 2,
            y: window.screen.height / 2,
        },
        {
            x: window.screen.width / 3,
            y: window.screen.height / 3,
        },
        {
            x: window.screen.width / 3 * 2,
            y: window.screen.height / 3 * 2,
        }
    ];
    const render = () => {
        updateCanvasSize(ctx);
        windos.forEach((windo) => {
            let [canvasX, canvasY] = screenToCanvasCoordinates(ctx.canvas, windo.x, windo.y);
            drawCircle(ctx, canvasX, canvasY, 100, "white");
        });
        requestAnimationFrame(render);
    };
    render();
})();
