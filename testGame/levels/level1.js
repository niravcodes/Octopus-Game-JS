import Camera from "../../library/camera.js"
import Scene from "../../library/scene.js"
import {
    cw,
    ch
} from "../../library/canvas.js"
import octo from "../characters/octopus.js"
import floor, { anotherFloor } from "../characters/floor.js"
import followFish from "../characters/followFish.js"
import {
    vortex,
    vortexFG
} from "../characters/vortex.js"
import midBG from "../backgrounds/midBG.js"
import bg from "../backgrounds/backBG.js"
import far from "../backgrounds/lastBG.js"

import Character from "../../library/character.js"
import {
    Kinetics
} from "../../library/kinetics.js"
import SimpleText from "../../library/SimpleText.js"
import {
    StaticText
} from "../../library/StaticRenderables.js"

let cam = new Camera(cw, ch, 50, 50, octo, undefined);
cam.followDirection = "x"
let level1 = new Scene(cam);

level1.startingCondition = function () {
    this.register(floor);
    this.register(anotherFloor);
    this.register(vortex)
    this.register(octo);

    // let line1 = new Character(new Kinetics(undefined, cw / 2, 400), undefined,
    //     new SimpleText("Use mouse to turn the Octopus", "Economica", "#ff6a4f", ""), 40, 600)
    let line1 = new StaticText("Use mouse to turn me and space to propel", (cw / 2), 340, "Economica", "#ff6a4f", "", 40);
    let line2 = new StaticText("Getting the hang of it? Great!", 3 * cw / 2, 340, "Economica", "#ff6a4f", "", 40);
    let line3 = new StaticText("If on land use A and D to walk.", 3 * cw, 340, "Economica", "#ff6a4f", "", 40);
    this.register(line1)
    this.register(line2)
    this.register(line3)

    // this.register(followFish);

    this.register(vortexFG)

    // level1.registerBG(far)
}
level1.registerBG(bg)
level1.registerFG(midBG)

export default level1;