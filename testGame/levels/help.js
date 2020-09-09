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
let helpText = new Character(new Kinetics(undefined, cw / 2, 340), undefined, new SimpleText("Help", "Economica", "#ff6a4f", "bold"), 40, 200)
let line1 = new Character(new Kinetics(undefined, cw / 2, 400), undefined,
    new SimpleText("Use Mouse to turn Octopus", "Economica", "#ff6a4f", ""), 40, 600)
let line2 = new Character(new Kinetics(undefined, cw / 2, 440), undefined,
    new SimpleText("Press Space to propel forward", "Economica", "#ff6a4f", ""), 40, 600)
let line3 = new Character(new Kinetics(undefined, cw / 2, 480), undefined,
    new SimpleText("Press Z to propel harder", "Economica", "#ff6a4f", ""), 40, 600)
let back = new Character(new Kinetics(undefined, cw / 2, 540), undefined,
    new SimpleText("> Back <", "Economica", "#ff6a4f", "bold"), 40, 300)

camTitleScreen.registerChar(titleImg);
camTitleScreen.registerChar(helpText)
camTitleScreen.registerChar(line1)
camTitleScreen.registerChar(line2)
camTitleScreen.registerChar(line3)
camTitleScreen.registerChar(back)
let help = new Scene(camTitleScreen)

let H = new Event;
H.subscribe(undefined, [{
    code: "Enter",
    cb: () => sceneManager.gotoScene("title")
}])
help.keyboard = H;

export default help;