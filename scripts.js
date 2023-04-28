document.addEventListener("DOMContentLoaded", () => {
  const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.view);

  const plane = PIXI.Sprite.from("./assets/plane.png");
  plane.anchor.set(0.5, 1); // define o ponto central inferior como ponto de ancoragem
  plane.position.set(app.screen.width / 2, app.screen.height - plane.height / 2); // define as coordenadas do sprite
  app.stage.addChild(plane);
});
