let planeRotation = 0;
let spaceKeyDownTime = 0;
let backgroundSpeed = 2;
const MAX_ROTATION = 2 * Math.PI; // representação em radianos de uma volta completa (360 graus)
const MIN_ROTATION = 0; // representação em radianos de 0 grau de inclinação
const MAX_TIME = 2000; // tempo máximo em milissegundos para completar uma volta completa (360 graus)

const startGame = () => {
  const heightScreen = window.innerHeight;
  const widthScreen = window.innerWidth;

  const app = new PIXI.Application({
    width: widthScreen,
    height: heightScreen,
  });

  document.body.appendChild(app.view);

  const background = PIXI.Sprite.from("./assets/sky-background.avif");
  background.anchor.set(0.5);
  background.position.set(widthScreen / 2, heightScreen / 2);
  app.stage.addChild(background);

  const plane = PIXI.Sprite.from("./assets/plane.png");
  plane.scale.set(0.5);
  plane.pivot.set(200, -200);
  plane.position.set(widthScreen / 2, heightScreen / 2);
  app.stage.addChild(plane);

  const camera = new PIXI.Container();
  camera.addChild(background);
  camera.addChild(plane);
  camera.pivot.set(widthScreen / 2, heightScreen / 2);
  camera.position.set(widthScreen / 2, heightScreen / 2);
  app.stage.addChild(camera);

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

      // atualiza a posição do background com base na velocidade do avião
      const angle = planeRotation + Math.PI / 2; // ajuste para que a direção 0 grau seja para cima
      background.position.x -= Math.sin(angle) * backgroundSpeed;
      background.position.y += Math.cos(angle) * backgroundSpeed;
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
