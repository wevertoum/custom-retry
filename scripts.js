let planeRotation = 0;
let spaceKeyDownTime = 0;
const MAX_ROTATION = 2 * Math.PI; // representação em radianos de uma volta completa (360 graus)
const MIN_ROTATION = 0; // representação em radianos de 0 grau de inclinação
const MAX_TIME = 2000; // tempo máximo em milissegundos para completar uma volta completa (360 graus)

const startGame = () => {
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
  plane.scale.set(0.5);
  plane.position.set(app.screen.width / 2, app.screen.height - 50);
  app.stage.addChild(plane);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      spaceKeyDownTime = performance.now();
      planeRotationStart = planeRotation;
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      spaceKeyDownTime = 0;
      planeRotation = 0;
    }
  });

  const movePlane = () => {
    if (spaceKeyDownTime > 0) {
      const elapsedTime = performance.now() - spaceKeyDownTime;
      const rotationRatio = Math.min(elapsedTime / MAX_TIME, 1); // limite em 1 para evitar valores maiores que 1
      const rotationDegrees = rotationRatio * 360; // graus de inclinação do avião
      const rotationRadians = (rotationDegrees * Math.PI) / 180; // conversão para radianos
      planeRotation = planeRotationStart + rotationRadians; // atualização da rotação do avião
      planeRotation %= MAX_ROTATION; // limita a rotação em uma volta completa
    }
    plane.rotation = planeRotation;
  };

  app.ticker.add(() => {
    movePlane();
  });
};

document.addEventListener("DOMContentLoaded", () => {
  startGame();
});
