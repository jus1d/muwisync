interface Session {
  id: string;
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

const uuid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const randomValue = (Math.random() * 16) | 0;
    const value = c === "x" ? randomValue : (randomValue & 0x3) | 0x8;
    return value.toString(16);
  });
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
  // localStorage.clear();

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

  const ID = uuid();
  const COLOR: string = choose(COLORS) ?? "magenta";

  window.onresize = () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    let [x, y] = translateCanvasToScreenCoordinates(
      ctx.canvas,
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
    );

    let sessions: Array<Session> = getSessions() || new Array<Session>();
    updateSession(sessions, { id: ID, color: COLOR, x, y });

    sessions = getSessions() || new Array<Session>();
    console.log(sessions);
  };

  window.addEventListener("beforeunload", () => {
    let sessions: Array<Session> | null = getSessions();
    if (!sessions) return;

    sessions = sessions.filter((s) => s.id != ID);
    saveSessions(sessions);
  });

  const getSessions = (): Array<Session> | null => {
    const sessions = localStorage.getItem("sessions");
    if (sessions) {
      return JSON.parse(sessions);
    }
    return null;
  };

  const saveSessions = (sessions: Array<Session>) => {
    const json = JSON.stringify(sessions);
    localStorage.setItem("sessions", json);
  };

  const updateSession = (
    sessions: Array<Session>,
    session: Session,
  ): Array<Session> => {
    for (let i: number = 0; i < sessions.length; i++) {
      if (sessions[i].id === ID) {
        sessions[i] = session;
      }
    }

    return sessions;
  };

  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  let [x, y] = translateCanvasToScreenCoordinates(
    ctx.canvas,
    ctx.canvas.width / 2,
    ctx.canvas.height / 2,
  );

  let session: Session = {
    id: uuid(),
    color: COLOR,
    x,
    y,
  };

  let sessions: Array<Session> = getSessions() || new Array<Session>();

  sessions.push(session);

  saveSessions(sessions);

  console.log(getSessions());

  const render = () => {
    circle(ctx, ctx.canvas.width / 2, ctx.canvas.height / 2, 100, COLOR);

    requestAnimationFrame(render);
  };

  render();
})();
