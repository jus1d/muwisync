var circle = function (ctx, cx, cy, radius, style) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.closePath();
};
var choose = function (arr) {
    if (arr.length === 0)
        return undefined;
    var idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
};
var translateCanvasToScreenCoordinates = function (canvas, x, y) {
    var rect = canvas.getBoundingClientRect();
    return [x + rect.left, y + rect.top];
};
(function () {
    var _a;
    var canvas = document.getElementById("window");
    if (canvas === null) {
        throw new Error("Could not find window");
    }
    var ctx = canvas.getContext("2d");
    if (ctx === null) {
        throw new Error("Unsupported '2d' context");
    }
    var COLORS = [
        "#01BAEF",
        "#FFF275",
        "#DBBADD",
        "#643A71",
        "#C4D6B0",
        "#AA4465",
    ];
    window.onresize = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        var _a = translateCanvasToScreenCoordinates(ctx.canvas, ctx.canvas.width / 2, ctx.canvas.height / 2), x = _a[0], y = _a[1];
        console.log(x, y);
    };
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var color = (_a = choose(COLORS)) !== null && _a !== void 0 ? _a : "magenta";
    var render = function () {
        circle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, color);
        requestAnimationFrame(render);
    };
    render();
})();
