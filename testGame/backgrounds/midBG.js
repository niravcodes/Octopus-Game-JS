import Background from "../../library/background.js";

let midBG = new Background([
  "assets/underwater-fantasy-files/PNG/layers/foreground-2.png",
  "/assets/underwater-fantasy-files/PNG/layers/foreground-1.png",
]);
// midBG.parallaxFactor = 0.7;
midBG.parallaxFactor = 1;
midBG.debugmode = true;
export default midBG;
