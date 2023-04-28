document.addEventListener("DOMContentLoaded", () => {
  const heightScreen = window.innerHeight;
  const widthScreen = window.innerWidth;

  const app = new PIXI.Application({
    width: widthScreen,
    height: heightScreen,
    backgroundColor: 0x1099bb,
  });

  document.body.appendChild(app.view);

  const plane = PIXI.Sprite.from("./assets/plane.png");
  plane.anchor.set(0.5, 0.5);
  plane.scale.set(0.5); // Adiciona a escala ao sprite
  plane.position.set(
    app.screen.width / 2,
    app.screen.height - plane.height / 2
  );
  plane.vy = 0;
  app.stage.addChild(plane);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      plane.vy = -5;
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      plane.vy = 5;
    }
  });

  app.ticker.add(() => {
    // Limita o movimento do avião para a altura da tela
    if (plane.y < plane.height / 2) {
      plane.y = plane.height / 2;
      plane.vy = 0;
    } else if (plane.y > app.screen.height - plane.height / 2) {
      plane.y = app.screen.height - plane.height / 2;
      plane.vy = 0;
    }

    plane.y += plane.vy;
    plane.vy += 0.1;
  });
});
