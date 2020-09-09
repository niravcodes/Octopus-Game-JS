import Camera from "../../library/camera.js"
import Scene from "../../library/scene.js"
import {
    cw,
    ch
} from "../../library/canvas.js"
import octo from "../characters/octopus.js"
import floor from "../characters/floor.js"
import followFish from "../characters/followFish.js"
import {
    vortex,
    vortexFG
} from "../characters/vortex.js"

import Character from "../../library/character.js"
import {
    Kinetics
} from "../../library/kinetics.js"
import SimpleText from "../../library/SimpleText.js"
import {
    StaticText
} from "../../library/StaticRenderables.js"
import powerup from "../characters/powerup.js"
import niravko from "../characters/niravko.js"

let cam = new Camera(cw, ch, 50, 50, octo, undefined);
cam.followDirection = "x"
let level1 = new Scene(cam);

level1.startingCondition = function () {
    this.register(floor);
    this.register(vortex)
    this.register(octo);
    this.register(powerup)
    this.register(niravko)
    this.register(followFish)

    let line1 = new StaticText("I don't want to work on this anymore.", (cw / 2), 340, "Economica", "#ff6a4f", "", 40);
    let line2 = new StaticText("Send words of encouragement at nirav.com.np", 3 * cw / 2, 340, "Economica", "#ff6a4f", "", 40);
    let line3 = new StaticText("Keep running. Maybe you'll find something ...", 5 * cw / 2, 340, "Economica", "#ff6a4f", "", 40);
    this.register(line1)
    this.register(line2)
    this.register(line3)
    this.register(vortexFG)
}

export default level1;