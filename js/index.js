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
const log = (ctx) => {
    console.log(`Inner size: ${window.innerWidth}px by ${window.innerHeight}px`);
    console.log(`Outer size: ${window.outerWidth}px by ${window.outerHeight}px`);
    console.log(`Canvas size: ${ctx.canvas.width}px by ${ctx.canvas.height}px`);
    console.log(`Screen size: ${window.screen.width}px by ${window.screen.height}px`);
};
(() => {
    let canvas = document.getElementById("windo");
    if (canvas === null)
        throw new Error("Could not find `windo` element");
    let ctx = canvas.getContext("2d");
    if (ctx === null)
        throw new Error("2d context does not supported");
    let windo = {
        x: window.screen.width / 2,
        y: window.screen.height / 2,
    };
    const render = () => {
        updateCanvasSize(ctx);
        let [canvasX, canvasY] = screenToCanvasCoordinates(ctx.canvas, windo.x, windo.y);
        drawCircle(ctx, canvasX, canvasY, 100, "red");
        requestAnimationFrame(render);
    };
    render();
})();
