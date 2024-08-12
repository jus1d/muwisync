var COLORS = [
    "#01BAEF",
    "#FFF275",
    "#DBBADD",
    "#643A71",
    "#C4D6B0",
    "#AA4465",
];
var choose = function (arr) {
    if (arr.length === 0)
        return undefined;
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
};
var id = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var randomValue = (Math.random() * 16) | 0;
        var value = c === "x" ? randomValue : (randomValue & 0x3) | 0x8;
        return value.toString(16);
    });
};
var drawCircle = function (ctx, cx, cy, radius, style) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.closePath();
};
(function () {
    var canvas = document.getElementById("window");
    if (canvas === null)
        throw new Error("Canvas with id `window` not found");
    var ctx = canvas.getContext("2d");
    if (ctx === null)
        throw new Error("2d context not supported");
    var COLOR = choose(COLORS) || "magenta";
    var ID = id();
    window.onresize = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    };
    var render = function () {
        drawCircle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, COLOR);
        requestAnimationFrame(render);
    };
    render();
})();
