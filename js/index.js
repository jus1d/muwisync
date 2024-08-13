"use strict";
const drawCircle = (ctx, cx, cy, r, color) => {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
};
const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
const screenToCanvasCoordinates = (canvas, screenX, screenY) => {
    const rect = canvas.getBoundingClientRect();
    const canvasX = screenX - rect.left - window.screenX;
    const canvasY = screenY - rect.top - window.screenY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return [canvasX * scaleX, canvasY * scaleY];
};
const canvasToScreenCoordinates = (canvas, canvasX, canvasY) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.width;
    const scaleY = rect.height / canvas.height;
    const relativeX = canvasX * scaleX + rect.left;
    const relativeY = canvasY * scaleY + rect.top;
    const screenX = relativeX + window.screenX;
    const screenY = relativeY + window.screenY;
    return [screenX, screenY];
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
            color: randomColor(),
            x: window.screen.width / 2,
            y: window.screen.height / 2,
        },
        {
            color: randomColor(),
            x: window.screen.width / 3,
            y: window.screen.height / 3,
        },
        {
            color: randomColor(),
            x: window.screen.width / 3 * 2,
            y: window.screen.height / 3 * 2,
        }
    ];
    const render = () => {
        updateCanvasSize(ctx);
        let windo = windos[0];
        let [x, y] = canvasToScreenCoordinates(ctx.canvas, ctx.canvas.width / 2, ctx.canvas.height / 2);
        windo.x = x;
        windo.y = y;
        windos.forEach((windo) => {
            let [canvasX, canvasY] = screenToCanvasCoordinates(ctx.canvas, windo.x, windo.y);
            drawCircle(ctx, canvasX, canvasY, 100, windo.color);
        });
        requestAnimationFrame(render);
    };
    render();
})();
