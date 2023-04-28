document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  const plane = PIXI.Sprite.from("./assets/plane.png");
  console.log(plane);
  plane.position.set(0, 0);
  app.stage.addChild(plane);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      plane.vy = -5;
    }
  });

  app.ticker.add(() => {
    plane.y += plane.vy;
    plane.vy += 0.1;
  });
});
