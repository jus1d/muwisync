var circle = function (ctx, cx, cy, radius, style) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = style;
    ctx.fill();
    ctx.closePath();
};
var uuid = function () {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var randomValue = (Math.random() * 16) | 0;
        var value = c === "x" ? randomValue : (randomValue & 0x3) | 0x8;
        return value.toString(16);
    });
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
    // localStorage.clear();
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
    var ID = uuid();
    var COLOR = (_a = choose(COLORS)) !== null && _a !== void 0 ? _a : "magenta";
    window.onresize = function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        var _a = translateCanvasToScreenCoordinates(ctx.canvas, ctx.canvas.width / 2, ctx.canvas.height / 2), x = _a[0], y = _a[1];
        var sessions = getSessions() || new Array();
        updateSession(sessions, { id: ID, color: COLOR, x: x, y: y });
        sessions = getSessions() || new Array();
        console.log(sessions);
    };
    window.addEventListener("beforeunload", function () {
        var sessions = getSessions();
        if (!sessions)
            return;
        sessions = sessions.filter(function (s) { return s.id != ID; });
        saveSessions(sessions);
    });
    var getSessions = function () {
        var sessions = localStorage.getItem("sessions");
        if (sessions) {
            return JSON.parse(sessions);
        }
        return null;
    };
    var saveSessions = function (sessions) {
        var json = JSON.stringify(sessions);
        localStorage.setItem("sessions", json);
    };
    var updateSession = function (sessions, session) {
        for (var i = 0; i < sessions.length; i++) {
            if (sessions[i].id === ID) {
                sessions[i] = session;
            }
        }
        return sessions;
    };
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var _b = translateCanvasToScreenCoordinates(ctx.canvas, ctx.canvas.width / 2, ctx.canvas.height / 2), x = _b[0], y = _b[1];
    var session = {
        id: uuid(),
        color: COLOR,
        x: x,
        y: y,
    };
    var sessions = getSessions() || new Array();
    sessions.push(session);
    saveSessions(sessions);
    console.log(getSessions());
    var render = function () {
        circle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, COLOR);
        requestAnimationFrame(render);
    };
    render();
})();
