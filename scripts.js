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
  plane.scale.set(0.5);
  console.log(plane.width, plane.height);
  plane.pivot.set(200, -200);
  plane.position.set(app.screen.width / 2, app.screen.height / 2);
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
      const rotationRatio = Math.min(elapsedTime / MAX_TIME, 1);
      const invertedRotationRatio = 1 - rotationRatio; // inverte a direção de giro
      const rotationDegrees = invertedRotationRatio * 360; // graus de inclinação do avião
      const rotationRadians = (rotationDegrees * Math.PI) / 180; // conversão para radianos
      planeRotation = planeRotationStart + rotationRadians;
      planeRotation %= MAX_ROTATION;
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
