import SimpleText from "../../library/SimpleText.js"
import Character from "../../library/character.js"
import Spritesheet from "../../library/spritesheet.js"
import Scene from "../../library/scene.js"
import Event from "../../library/events.js"

import {
    Kinetics
} from "../../library/kinetics.js";

import Camera from "../../library/camera.js"
import {
    cw,
    ch
} from "../../library/canvas.js"

let camTitleScreen = new Camera(cw, ch)

//maybe there's a better way to this
// THERE IS: make creator functions. have multiple constructors. Allow primitives other than Character 
let titleImg = new Character(new Kinetics(undefined, cw / 2 + 20, 200), undefined, new Spritesheet("assets/title.png"), 364, 164)
let playText = new Character(new Kinetics(undefined, cw / 2, 380), undefined, new SimpleText("Game Over", "Economica", "#ff6a4f", ""), 40, 200)
let nextText = new Character(new Kinetics(undefined, cw / 2, 440), undefined, new SimpleText("> Play Again <", "Economica", "#ff6a4f", "bold"), 40, 200)

camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(playText)
camTitleScreen.registerChar(nextText)
let gameOver = new Scene(camTitleScreen)

let G = new Event;
G.subscribe(undefined, [{
    code: "Enter",
    cb: () => sceneManager.gotoScene("title")
}])
gameOver.keyboard = G;

export default gameOver;