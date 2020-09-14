const DEBUGMODE = (window.DEBUGMODE = false);
import SceneManager from "../library/sceneManager.js";
import { clearCanvas } from "../library/canvas.js";

import level1 from "./levels/level1.js";
import level2 from "./levels/level2.js";
import title from "./levels/title.js";
import help from "./levels/help.js";
import gameOver from "./levels/gameOver.js";

let sceneManager = (window.sceneManager = new SceneManager());
sceneManager.register("title", title);
sceneManager.register("level1", level1);
sceneManager.register("level2", level2);
sceneManager.register("help", help);
sceneManager.register("gameOver", gameOver);

let bgMusic = (window.bgMusic = new Audio("assets/mozartClarinet.mp3"));

function gameLoop() {
  if (sceneManager.curScene.name === "title") clearCanvas("#142d4d");
  else clearCanvas("#b6e7f0");
  sceneManager.nextStep();
  requestAnimationFrame(gameLoop);
}
window.onload = gameLoop;
